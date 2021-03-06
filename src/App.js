import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client'
import 'semantic-ui-css/semantic.min.css'
import { Grid, Header } from 'semantic-ui-react'
import Namespaces from './components/Namespaces'
import Rooms from './components/Rooms'
import Chat from './components/Chat'
import { appUrl, chatPath, serverUrl } from '../config'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getAuth } from './helpers'
import { LOGOUT_USER } from './reducers'

function App() {
  const socket = useSelector(state => state.socket)
  let dispatch = useDispatch()
  let history = useHistory()
  let [nsSocket, setNsSocket] = useState(null)
  const [namespaces, setNamespaces] = useState([])
  let [rooms, setRooms] = useState([])
  const [messages, setMessages] = useState([])
  let [nsActive, setNsActive] = useState(null)
  let [roomActive, setRoomActive] = useState(null)
  let [messageToSend, setMessageToSend] = useState('')
  let [activeMembers, setActiveMembers] = useState(0)
  let [user, setUser] = useState(null)
  let myRef = useRef(null)

  const scrollMessages = () => {
    const { current } = myRef
    current.scroll(current.offsetHeight, current.offsetWidth)
  }

  useEffect(() => {
    if (!socket) {
      dispatch({
        type: LOGOUT_USER
      })
      return
    }
    socket.on('userData', (user) => {
      setUser(user)
      setNamespaces(user.nsList)
    })
    socket.on('error', (err) => {
      dispatch({
        type: LOGOUT_USER
      })
    })
    socket.on('errorAuth', (err) => {
      dispatch({
        type: LOGOUT_USER
      })
    })
  }, [namespaces, socket, user])

  useEffect(() => {    
    if (nsSocket) {
      nsSocket.close()
    }
    setNsSocket(io(`${serverUrl}${nsActive}`, getAuth()))
  },[nsActive])

  useEffect(() => {
    if (nsSocket) {
      nsSocket.on('nsRoomLoad', nsRooms => {
        setRooms(nsRooms)
      })
      nsSocket.on('messageToClients', (msg) => {
        setMessages([...messages, msg])
        scrollMessages()
      })
      nsSocket.on('error', (err) => {
        localStorage.removeItem('chatToken')
        // window.location.href = appUrl+chatPath
        history.push(chatPath || '/')
      })
    }
  }, [nsSocket, messages])

  useEffect(() => {
    if (rooms.length) {
      setRoomActive(rooms[0].roomTitle)
    }
  }, [rooms])

  useEffect(() => {
    if (nsSocket) {
      nsSocket.emit('joinRoom', roomActive, (newNumberOfMembers) => {
        // update number of members
        // TODO dunno if it's usefull or not
        console.log('ROOOOOm  JOINEEEd CB')
      })
      // TODO not sure about this below
      nsSocket.removeListener('getHistory')
        .removeListener('updateMembers')
        .removeListener('error')
      if (roomActive) {
        nsSocket.on('getHistory', (history) => {
          setMessages(history)
          scrollMessages()
        })
      }
  
      nsSocket.on('updateMembers', (numMembers) => {
        setActiveMembers(numMembers)
      })
    }
  }, [roomActive])

  useEffect(() => {
    if (messageToSend) {
      nsSocket.emit('newMessageToServer', {
        username: user.username,
        text: messageToSend,
        avatar: user.avatar
      })
      setMessageToSend('')
    }
  }, [messageToSend])

  return (
      <Grid className="main-container" padded={true} stackable={true}>
        <Grid.Row style={{height: '100%', overflow: 'hidden'}}>
          <Namespaces namespaces={namespaces} selectNs={setNsActive} nsActive={nsActive}></Namespaces>
          <Rooms rooms={rooms} selectRoom={setRoomActive} roomActive={roomActive}></Rooms>
          { roomActive ? 
              <Chat 
                messages={messages} 
                setMessageToSend={setMessageToSend}
                roomName={roomActive}
                activeMembers={activeMembers}
                myRef={myRef}
              >
              </Chat>
            : 
              <Grid.Column width={12} verticalAlign='middle'>
                <Header textAlign='center' as='h1'>Select a workspace to start</Header>
              </Grid.Column>
          }
        </Grid.Row>
      </Grid>
  );
}

export default App;
