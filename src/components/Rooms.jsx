import React from 'react';
import { List, Grid, Icon } from 'semantic-ui-react'

function rooms(props) {
  return (
    <Grid.Column width={2}>
      <List floated='left'>
        {
          props.rooms.map(room => {
            return (
              <List.Item key={room.roomId} onClick={() => props.selectRoom(room.roomTitle)}>
                <Icon name='chat'></Icon>
                {room.roomTitle}
              </List.Item>
            )
          })
        }
      </List>
    </Grid.Column>
  )
}

export default rooms