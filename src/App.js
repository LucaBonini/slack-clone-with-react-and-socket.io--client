import React, { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client'
import 'semantic-ui-css/semantic.min.css'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux';
import Namespaces from './components/Namespaces'
import Rooms from './components/Rooms'
import Chat from './components/Chat'
const socket = io('http://localhost:3000')

function App(props) {

  // let nsSocket
  let [nsSocket, setNsSocket] = useState(null)
  const [namespaces, setNamespaces] = useState([])
  const [rooms, setRooms] = useState([])
  const [messages, setMessages] = useState([])

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
    nsSocket = io(`http://localhost:3000${props.namespaceActive}`)
    nsSocket.on('nsRoomLoad', nsRooms => {
      setRooms(nsRooms)
    })
    nsSocket.on('messageToClients', (msg) => {
      setMessages([...messages, msg])
    })
  },[props.namespaceActive])

  useEffect(() => {
    nsSocket.emit('joinRoom', props.roomActive, (newNumberOfMembers) => {
      // update number of members
    })

    nsSocket.on('getHistory', (history) => {
      setMessages(history)
    })

    nsSocket.on('updateMembers', (numMembers) => {
      // update number of members of the room
    })
    console.log(props.roomActive, 'ROOM ACTIVE')
  }, [props.roomActive])


  return (
    <div className="App">
      <Grid>
        <Grid.Row>
          <Namespaces namespaces={namespaces}></Namespaces>
          <Rooms rooms={rooms}></Rooms>
          <Chat messages={[]}></Chat>
        </Grid.Row>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { 
    namespaceActive: (state || {}).namespaceActive || null,
    roomActive: (state || {}).roomActive || null
  }
}

export default connect(mapStateToProps, null)(App);
