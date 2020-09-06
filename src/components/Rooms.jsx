import React from 'react';
import { List, Grid, Icon } from 'semantic-ui-react'

function rooms({ rooms, selectRoom, roomActive}) {
  return (
    <Grid.Column width={2} className="rooms-container">
      <List floated='left'>
        {
          rooms.map(room => {
            let activeClass = room.roomTitle === roomActive ? 'font-bold' : ''
            return (
              <List.Item className={activeClass} key={room.roomId} onClick={() => selectRoom(room.roomTitle)}>
                <List.Icon name='chat'/>
                <List.Content>
                  {room.roomTitle}
                </List.Content>
              </List.Item>
            )
          })
        }
      </List>
    </Grid.Column>
  )
}

export default rooms