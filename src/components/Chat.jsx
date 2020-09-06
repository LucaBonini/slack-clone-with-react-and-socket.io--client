import React, { useState } from 'react';
import { Form, Grid, Divider, Icon, Container } from 'semantic-ui-react'
import Messages from './chat/Messages'

function Chat({ messages, setMessageToSend, roomName, activeMembers }) {

  let [inputValue, setInputValue] = useState('')
  
  const formSubmission = (event) => {
    event.preventDefault()
    setMessageToSend(inputValue)
    setInputValue('')
  }

  return (
      <Grid.Column width={12} style={{maxHeight: '100vh'}}>
        <Grid.Row className="messages-container">
          <Grid.Column width={16}>
            <Container>
              {roomName}
              <Icon name='user'>{activeMembers}</Icon>
            </Container>
            <Divider></Divider>
            <Messages messages={messages}></Messages>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="input-message">
          <Grid.Column width={16} >
            <Form error onSubmit={(e)=> formSubmission(e)}>
              <Form.Input 
                value={inputValue} 
                label='message' 
                placeholder='your message here...' 
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Form.Button  type='submit'>Send</Form.Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid.Column>
  )
}

export default Chat