import React from 'react';
import { List } from 'semantic-ui-react'

function message({ text }) {
  return <List.Item >{text}</List.Item>
}

export default message