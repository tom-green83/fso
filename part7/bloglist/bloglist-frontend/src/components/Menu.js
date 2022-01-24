import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Menu = ({ handleLogout } ) => {
  const user = useSelector(state => state.user)
  const padding = {
    paddingRight: 5
  }

  const loggedInMessage = () => {
    if (user===null) {
      return null
    } else {
      return (
        <>{user.name} logged in<button onClick={handleLogout}>logout</button></>
      )
    }
  }

  return (
    <div>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {loggedInMessage()}
    </div>
  )
}

export default Menu