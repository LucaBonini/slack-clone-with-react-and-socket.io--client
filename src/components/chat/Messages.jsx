import React from 'react';
import { List } from 'semantic-ui-react'
import Message from './Message'

function messages(props) {
  return (
    <div>
      <List>
        {
          props.messages.map(msg => {
            return <Message text={msg.text}></Message>
          })
        }
      </List>
    </div>
  )
}

export default messages