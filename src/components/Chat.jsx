import React, { useState } from 'react';
import { Form, Grid, Divider, Icon, Container, Ref, List } from 'semantic-ui-react'
import Messages from './chat/Messages'

function Chat({ messages, setMessageToSend, roomName, activeMembers, myRef }) {

  let [inputValue, setInputValue] = useState('')
  
  const formSubmission = (event) => {
    event.preventDefault()
    setMessageToSend(inputValue)
    setInputValue('')
  }

  return (
      <Grid.Column width={13} className="chat-container">
        <Container style={{height: '5%'}}>
          <List>
            <List.Item>
              <List.Icon name='user'>
                {activeMembers}
              </List.Icon>
              <List.Content>
                {roomName}
              </List.Content>
            </List.Item>
          </List>
        </Container>
        <Ref innerRef={myRef}>
          <Grid.Row className="messages-container">
            <Grid.Column width={16}>
              <Divider></Divider>
              <Messages messages={messages}></Messages>
            </Grid.Column>
          </Grid.Row>
        </Ref>
        <Grid.Row className="input-message">
          <Grid.Column width={16} >
            <Form error onSubmit={(e)=> formSubmission(e)}>
              <Form.Input 
                value={inputValue} 
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