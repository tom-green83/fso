import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'


const Authors = (props) => {
  const [ login, result ] = useMutation(LOGIN)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      console.log(token)
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const handleLogin = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
    props.setPage('authors')
  }

  if (!props.show) {
    return null
  }
  return(
    <>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type='text' value={username} onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input type='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )
}

export default Authors
