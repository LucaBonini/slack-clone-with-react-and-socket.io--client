import React, { useState } from 'react'
import { Button, Container, Form, Message } from 'semantic-ui-react'
import axios from 'axios'
import { serverAuthPath, serverUrl } from '../../config.js'
import { useDispatch } from "react-redux";
import io from 'socket.io-client'
import { getAuth } from '../helpers'
import { AUTH_USER } from '../reducers'

function Login() {
  let [username, setUsername] = useState(null)
  let [password, setPassword] = useState(null)
  let [error, setError] = useState(null)
  const dispatch = useDispatch()
  
  const handleSubmit = async () => {
    try {
      let res = await axios.post(`${serverUrl}${serverAuthPath}`, {
          username,
          password
        })
      localStorage.setItem('chatToken', res.data)
      dispatch({
        type: AUTH_USER,
        payload: {
          socket: io(serverUrl, getAuth())
        }
      })
    } catch (err) {
      setError(err)
    }
  }

  const renderError = () => {
    if (error) {
      return (
        <Message color="red">
          <Message.Header>Authorization failed</Message.Header>
          <p>Credentials are not valid, check your username and password</p>
        </Message>
      )
    }
  }

  return (
    <Container>
      {renderError()}
      <Form onSubmit={() => handleSubmit()}>
        <Form.Field value={username} onChange={(e) => setUsername(e.target.value)}>
          <label>Username</label>
          <input placeholder='Username' />
        </Form.Field>
        <Form.Field value={password} onChange={(e) => setPassword(e.target.value)}>
          <label>Password</label>
          <input placeholder='Password' type="password"/>
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    </Container>
  )
}

export default Login