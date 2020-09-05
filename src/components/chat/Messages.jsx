import React from 'react';
import { Comment } from 'semantic-ui-react'
import Message from './Message'

function messages({ messages }) {
  return (
      <Comment.Group floated={'left'}>
        {
          messages.map(msg => {
            return <Message key={msg.date} msg={msg}></Message>
          })
        }
      </Comment.Group>
  )
}

export default messages