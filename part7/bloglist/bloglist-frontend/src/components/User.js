import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'

const User = () => {
  const id = useParams().id
  const user = useSelector(state => state.users.find(user => user.id === id))

  if (!user) {
    return null
  } else {
    const listItems = (
      user.blogs.map(blog =>
        <ListGroup.Item key={blog.id}>
          {blog.title}
        </ListGroup.Item>
      )
    )

    return(
      <>
        <h1>{user.name}</h1>
        <h2>added blogs</h2>
        <ListGroup>
          {listItems}
        </ListGroup>
      </>
    )
  }
}

export default User