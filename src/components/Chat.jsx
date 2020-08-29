import React from 'react';
import { Container } from 'semantic-ui-react'
import Messages from './chat/Messages'

function chat(props) {
  return(
    <div>
      <Container>
        <Messages messages={props.messages}></Messages>
      </Container>
    </div>
  )
}

export default chat