import React from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react'
import { selectRoom } from '../actions'

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


export default connect(null, { selectRoom })(rooms)