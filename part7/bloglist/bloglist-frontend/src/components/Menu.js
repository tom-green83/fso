import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/loginReducer'

const Menu = ( ) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    console.log('logging out')
    window.localStorage.removeItem('loggedInBlogUser')
    dispatch(setUser(null))
    history.push('/login')
  }

  const padding = {
    paddingRight: 5
  }

  if (user===null) {
    return null
  }

  return (
    <div>
      <Link style={padding} to="/blogs">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {user.name} logged in<button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Menu