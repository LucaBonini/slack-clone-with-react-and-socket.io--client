import React, { useState} from 'react';
import { Button, Form, Grid } from 'semantic-ui-react'
import Messages from './chat/Messages'

function Chat({ messages, setMessageToSend }) {

  let [inputValue, setInputValue] = useState('')
  
  const formSubmission = (event) => {
    event.preventDefault()
    setMessageToSend(inputValue)
    setInputValue('')
  }

  return (
      <Grid.Column width={10}>
        <Messages messages={messages}></Messages>
        <Form error onSubmit={(e)=> formSubmission(e)}>
          <Form.Input value={inputValue} label='message' placeholder='your message here...' onChange={(e) => setInputValue(e.target.value)}/>
          <Button>Send</Button>
        </Form>
      </Grid.Column>
  )
}

export default Chat