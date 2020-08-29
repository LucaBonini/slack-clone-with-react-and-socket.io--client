import React from 'react';
import { List } from 'semantic-ui-react'

function rooms(props) {
  return (
    <List>
      {
        props.rooms.map(room => {
          return (
            <List.Item key={room.roomId} onClick={() => props.selectRoom(room.roomTitle)}>
              {room.roomTitle}
            </List.Item>
          )
        })
      }
    </List>
  )
}

export default rooms