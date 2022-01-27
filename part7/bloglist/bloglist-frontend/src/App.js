import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Blog from './components/Blog'
import Alert from 'react-bootstrap/Alert'



import Blogs from './components/Blogs'
import Login from './components/Login'
import Menu from './components/Menu'
import Users from './components/Users'
import User from './components/User'
import { useSelector, useDispatch } from 'react-redux'
import blogService from './services/blogs'
import { setUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const notificationDuration = 5
  const notification = useSelector(state => state.notificationMessage)
  const dispatch = useDispatch()

  const loggedInUserJSON = window.localStorage.getItem('loggedInBlogUser')
  useEffect(() => {
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [])

  // Initialise list of blogs
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  // Initialize list of users
  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  return(
    <div className='container'>
      <Menu />
      <h1>blog app</h1>
      {notification.text
        ? <Alert variant={notification.notificationType}>
          {notification.text}
        </Alert>
        : null}
      <Switch>
        <Route path = "/blogs/:id">
          <Blog notificationDuration={notificationDuration} />
        </Route>
        <Route path = "/blogs">
          <Blogs notificationDuration={notificationDuration} />
        </Route>
        <Route path = "/login">
          <Login notificationDuration={notificationDuration} />
        </Route>
        <Route path = "/users/:id">
          <User />
        </Route>
        <Route path = "/users">
          <Users />
        </Route>
        <Route path = "/">
          { loggedInUserJSON=== null
            ? <Redirect to="/login" />
            : <Redirect to="/blogs" />
          }
        </Route>
      </Switch>
    </div>
  )
}

export default App