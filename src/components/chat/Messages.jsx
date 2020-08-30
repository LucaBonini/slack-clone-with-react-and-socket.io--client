import React from 'react';
import { List } from 'semantic-ui-react'
import Message from './Message'

function messages({ messages }) {
  return (
      <List floated={'left'}>
        {
          messages.map(msg => {
            return <Message key={msg.time} text={msg.text}></Message>
          })
        }
      </List>
  )
}

export default messages