import React from 'react';
import { List, Grid } from 'semantic-ui-react'

function rooms(props) {
  return (
    <Grid.Column width={4}>
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
    </Grid.Column>
  )
}

export default rooms