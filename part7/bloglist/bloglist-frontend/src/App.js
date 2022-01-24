import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { useSelector, useDispatch } from 'react-redux'

// Action creators
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, setBlogs } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const notificationDuration = 5

  // Redux variables
  const dispatch = useDispatch()
  const notificationMessage = useSelector(state => state.notificationMessage.text)
  const blogs = useSelector(state => state.blogs)

  // Initialise blogs
  useEffect(() => {
    dispatch(initializeBlogs())
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
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      dispatch(setNotification('invalid credentials', notificationDuration))
    }
  }

  const likeBlog = (blogId, updatedBlog) => {
    blogService
      .update(blogId, updatedBlog)
      .then(returnedObject => {
        dispatch(setBlogs(blogs.map(blog => {
          if (blog.id === blogId) {
            const likedBlog = JSON.parse(JSON.stringify(blog))
            likedBlog.likes = returnedObject.likes
            return likedBlog
          } else {
            return blog
          }
        })
          .sort((a, b) => b.likes - a.likes)
        ))
      })
  }

  const handleLogout = () => {
    console.log('logging out')
    window.localStorage.removeItem('loggedInBlogUser')
    setUser(null)
  }

  const addBlog = (newObject) => {
    blogFormRef.current.toggleVisibility()
    console.log('posting new blog as', user.username)
    blogService
      .create(newObject)
      .then(returnedObject => {
        dispatch(setBlogs(blogs.concat(returnedObject)))
        dispatch(setNotification(`a new blog ${returnedObject.title} by ${returnedObject.author} added`, notificationDuration))
      })
  }

  const removeBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      dispatch(setBlogs(blogs.filter(blog => blog.id !== blogId)))
    }
    catch (exception){
      dispatch(setNotification('blog not found', notificationDuration))
    }
  }

  const loginPage = () => (
    <div>
      <h2>login to application</h2>
      <Notification message={notificationMessage} notificationType='error' />
      <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
    </div>
  )

  const blogPage = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} notificationType='success' />
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} user={user} removeBlog={removeBlog}/>
      )}
    </div>
  )

  return(
    <div>
      {user === null
        ? loginPage()
        : blogPage()
      }
    </div>
  )
}

export default App