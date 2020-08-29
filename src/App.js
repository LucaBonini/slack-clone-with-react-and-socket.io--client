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

  // let nsSocket
  let [nsSocket, setNsSocket] = useState(null)
  const [namespaces, setNamespaces] = useState([])
  const [rooms, setRooms] = useState([])
  const [messages, setMessages] = useState([])
  let [nsActive, setNsActive] = useState(null)
  let [roomActive, setRoomActive] = useState(null)

  useEffect(() => {
    socket.on('nsList', (nsList) => {
      setNamespaces(nsList)
    })
  }, [])

  useEffect(() => {    
    if (nsSocket) {
      nsSocket.close()
    }
    // TODO get messages for this ns
    // messages = ...
    setNsSocket(io(`http://localhost:3000${nsActive}`))
  },[nsActive])

  useEffect(() => {
    if (nsSocket) {
      console.log(nsSocket, 'LLLLL')
      nsSocket.on('nsRoomLoad', nsRooms => {
        setRooms(nsRooms)
      })
      nsSocket.on('messageToClients', (msg) => {
        setMessages([...messages, msg])
      })
    }
  }, [nsSocket])

  useEffect(() => {
    if (nsSocket) {
      console.log('LOLLL')
      nsSocket.emit('joinRoom', roomActive, (newNumberOfMembers) => {
        // update number of members
      })
  
      nsSocket.on('getHistory', (history) => {
        setMessages(history)
      })
  
      nsSocket.on('updateMembers', (numMembers) => {
        // update number of members of the room
      })
    }
  }, [roomActive, nsSocket])


  return (
    <div className="App">
      <Grid>
        <Grid.Row>
          <Namespaces namespaces={namespaces} selectNs={setNsActive}></Namespaces>
          <Rooms rooms={rooms} selectRoom={setRoomActive}></Rooms>
          <Chat messages={[]}></Chat>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;
