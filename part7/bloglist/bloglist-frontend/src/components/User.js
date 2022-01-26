import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const id = useParams().id
  const user = useSelector(state => state.users.find(user => user.id === id))
  console.log(id, user)

  if (!user) {
    return (
      <>
        <h1>loading data</h1>
      </>
    )
  } else {
    const listItems = (
      user.blogs.map(blog =>
        <li key={blog.id}>
          {blog.title}
        </li>
      )
    )

    return(
      <>
        <h1>{user.name}</h1>
        <h2>added blogs</h2>
        <ul>
          {listItems}
        </ul>
      </>
    )
  }
}

export default User