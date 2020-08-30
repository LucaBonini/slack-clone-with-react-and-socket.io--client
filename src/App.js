import React, { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client'
import 'semantic-ui-css/semantic.min.css'
import { Grid } from 'semantic-ui-react'
import Namespaces from './components/Namespaces'
import Rooms from './components/Rooms'
import Chat from './components/Chat'
const socket = io('http://localhost:3000')

function App() {

  let [nsSocket, setNsSocket] = useState(null)
  const [namespaces, setNamespaces] = useState([])
  let [rooms, setRooms] = useState([])
  const [messages, setMessages] = useState([])
  let [nsActive, setNsActive] = useState(null)
  let [roomActive, setRoomActive] = useState(null)
  let [messageToSend, setMessageToSend] = useState('')
  let [activeMembers, setActiveMembers] = useState(0)

  useEffect(() => {
    socket.on('nsList', (nsList) => {
      setNamespaces(nsList)
    })
  }, [namespaces])

  useEffect(() => {    
    if (nsSocket) {
      nsSocket.close()
    }
    setNsSocket(io(`http://localhost:3000${nsActive}`))
  },[nsActive])

  useEffect(() => {
    if (nsSocket) {
      nsSocket.on('nsRoomLoad', nsRooms => {
        setRooms(nsRooms)
      })
      nsSocket.on('messageToClients', (msg) => {
        setMessages([...messages, msg])
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
      nsSocket.removeListener('getHistory').removeListener('updateMembers')
      if (roomActive) {
        nsSocket.on('getHistory', (history) => {
          setMessages(history)
        })
      }
  
      nsSocket.on('updateMembers', (numMembers) => {
        setActiveMembers(numMembers)
      })
    }
  }, [roomActive])

  useEffect(() => {
    if (messageToSend) {
      nsSocket.emit('newMessageToServer',{text: messageToSend})
      setMessageToSend('')
    }
  }, [messageToSend])

  return (
    <div className="App">
      <Grid>
        <Grid.Row>
          <Namespaces namespaces={namespaces} selectNs={setNsActive}></Namespaces>
          <Rooms rooms={rooms} selectRoom={setRoomActive}></Rooms>
          { roomActive ? 
              <Chat 
                messages={messages} 
                setMessageToSend={setMessageToSend}
                roomName={roomActive}
                activeMembers={activeMembers}
              >
              </Chat>
            : null
          }
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;
