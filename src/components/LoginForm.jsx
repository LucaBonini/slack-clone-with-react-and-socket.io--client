import React, { useState } from 'react'
import { Button, Container, Form } from 'semantic-ui-react'
import axios from 'axios'
import { appUrl, chatPath } from '../../config.js'

function Login() {
  let [username, setUsername] = useState(null)
  let [password, setPassword] = useState(null)
  const handleSubmit = async () => {

    axios.post('http://localhost:3000/auth/chat', {
        username,
        password
      })
    .then(res => {
      localStorage.setItem('chatToken', res.data)
      window.location.href = appUrl+chatPath
    })
    .catch(err => {
      // TODO HANDLE WRONG CREDENTIALS
      console.log(err)
    })
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