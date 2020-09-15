import React, { useState } from 'react'
import { Button, Container, Form } from 'semantic-ui-react'
import axios from 'axios'
import { appUrl, chatPath, serverAuthPath, serverUrl } from '../../config.js'
import { useDispatch, useSelector, connect } from "react-redux";
import { login } from '../actions'

function Login() {
  let [username, setUsername] = useState(null)
  let [password, setPassword] = useState(null)
  const dispatch = useDispatch()
  const handleSubmit = async () => {
    try {
      let res = await axios.post(`${serverUrl}${serverAuthPath}`, {
          username,
          password
        })
      localStorage.setItem('chatToken', res.data)
      dispatch({
        type: 'auth_user'
      })
      // window.location.href = 'http://localhost:1234/'
    } catch (error) {
      //   // TODO HANDLE WRONG CREDENTIALS
      console.log(error)
    }
  }
  return (
    <Container>
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