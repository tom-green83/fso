import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/loginReducer'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'

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

  if (user===null) {
    return null
  }

  return (
    <div className='Container'>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link as={Link} to='/blogs'>blogs</Nav.Link>
              <Nav.Link as={Link} to='/users'>users</Nav.Link>
              <Navbar.Text>{user.name} logged in</Navbar.Text>
            </Nav>
            <Button style={{ margin: 5 }} onClick={handleLogout}>logout</Button>
          </Navbar.Collapse>

        </Container>

      </Navbar>

    </div>
  )
}

export default Menu