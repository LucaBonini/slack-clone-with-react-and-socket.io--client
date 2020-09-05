import React from 'react';
import { List, Comment } from 'semantic-ui-react'
import moment from 'moment'

function message({ msg: {username, text, date}, key }) {
  const parsedDate = moment.unix(date).fromNow()
  return (
    <Comment>
      <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg' />
      <Comment.Content>
        <Comment.Author>{ username }</Comment.Author>
        <Comment.Metadata>{ parsedDate }</Comment.Metadata>
        <Comment.Text>{ text }</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

export default message