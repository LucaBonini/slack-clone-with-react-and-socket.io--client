import React, { useState } from 'react'
import { Button, Container, Form } from 'semantic-ui-react'
import axios from 'axios'

function Login() {
  let [username, setUsername] = useState(null)
  let [password, setPassword] = useState(null)
  const handleSubmit = async () => {
    try {
      let token = (await axios.post('http://localhost:3000/auth/chat', {
        username,
        password
      })).data
      localStorage.setItem('chatToken', token)
     window.location.href = 'http://localhost:3001/'
    } catch (error) {
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
          <input placeholder='Password' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    </Container>
  )
}

export default Login