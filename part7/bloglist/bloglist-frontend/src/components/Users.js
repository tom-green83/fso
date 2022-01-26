import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)

  const tableRows = (
    users.map(user => {
      const userLink = `/users/${user.id}`
      return(
        <tr key={user.id}>
          <td>
            <Link to={userLink}>
              {user.name}
            </Link>
          </td>
          <td>{user.blogs.length}</td>
        </tr>
      )
    })
  )


  return (
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th><strong>blogs created</strong></th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </>
  )
}

export default Users