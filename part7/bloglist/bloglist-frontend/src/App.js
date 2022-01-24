import React, { useState, useEffect, useRef } from 'react'
import { Switch, Route } from 'react-router-dom'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import Users from './components/Users'
import { useSelector, useDispatch } from 'react-redux'

// Action creators
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { setUsers } from './reducers/usersReducer'
import axios from 'axios'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()
  const notificationDuration = 5

  // Redux variables
  const dispatch = useDispatch()
  const notificationMessage = useSelector(state => state.notificationMessage.text)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  // Initialise blogs
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  // Update list of users
  const usersUrl = 'http://localhost:3003/api/users'
  useEffect(async () => {
    const users = (await axios.get(usersUrl)).data
    dispatch(setUsers(users))
  }, [blogs])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setUser(user))
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
      dispatch(setUser(user))
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
    dispatch(setUser(null))
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
      <Notification message={notificationMessage} notificationType='success' />
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
      <Menu handleLogout={handleLogout}/>
      <h1>blog app</h1>
      <Switch>
        <Route path = "/users">
          <Users users={users} />
        </Route>
        <Route path = "/">
          {user === null
            ? loginPage()
            : blogPage()
          }
        </Route>
      </Switch>
    </div>
  )
}

export default App