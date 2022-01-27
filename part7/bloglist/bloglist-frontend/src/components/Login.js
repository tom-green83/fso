import React, { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/loginReducer'
import { Form, Button } from 'react-bootstrap'


const Login = ( { notificationDuration }) => {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      history.push('/blogs')
    }
    catch (exception) {
      dispatch(setNotification('invalid credentials', 'danger', notificationDuration))
    }
  }

  return(
    <>
      <h2>login to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Label>username</Form.Label>
        <Form.Control id='username' type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)}/>
        <Form.Label>password</Form.Label>
        <Form.Control id='password' type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)}/>
        <Button id='login-button' type='submit'>login</Button>
      </Form>
    </>
  )}

export default Login