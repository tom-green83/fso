import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setsuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage('invalid credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    console.log('logging out')
    window.localStorage.removeItem('loggedInBlogUser')
    setUser(null)
  }

  const handleSubmitNewBlog = event => {
    event.preventDefault()
    console.log('posting new blog as', username)
    const newObject = {
      title: title,
      author: author,
      url: url
    }
    blogService
      .create(newObject)
        .then(returnedObject => {
        setBlogs(blogs.concat(returnedObject))
        setTitle('')
        setAuthor('')
        setUrl('')
        setsuccessMessage(`a new blog ${returnedObject.title} by ${returnedObject.author} added`)
        setTimeout(() => {
        setsuccessMessage(null)
      }, 5000)
    })
  }

  const loginForm = () => (
    <div>
      <h2>login to application</h2>
      <Notification message={errorMessage} notificationType='error' />
      <form onSubmit={handleLogin}>
        <div>
          username <input type='text' value={username} name='Username' onChange={({target}) => setUsername(target.value)}/>
        </div>
        <div>
          username <input type='password' value={password} name='Password' onChange={({target}) => setPassword(target.value)}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
  
  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={successMessage} notificationType='success' />
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      {createBlogForm()}      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
  
  const createBlogForm = () => (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmitNewBlog}>
        <div>
          title:<input type='text' value={title} name='Title' onChange={({target}) => setTitle(target.value)}/>
        </div>
        <div>
          author:<input type='text' value={author} name='Author' onChange={({target}) => setAuthor(target.value)}/>
        </div>
        <div>
          url:<input type='text' value={url} name='Url' onChange={({target}) => setUrl(target.value)}/>
        </div>
        <button type='submit'>create</button>
      </form>
    </>    
  )

  return(
    <div>
        {user === null
          ? loginForm()
          : blogForm()
        }     
    </div>
  )
}

export default App