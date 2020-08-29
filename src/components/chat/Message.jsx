import React from 'react';
import { List } from 'semantic-ui-react'

function message(props) {
  return <List.Item>{props.text}</List.Item>
}

export default message