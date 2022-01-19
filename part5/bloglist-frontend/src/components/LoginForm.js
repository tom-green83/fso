import React from 'react'

const LoginForm = ( { handleLogin, username, setUsername, password, setPassword }) => {
  return(
    <>
      <h2>create new</h2>
      <form onSubmit={handleLogin}>
        <div>
          username <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          username <input type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )}

export default LoginForm