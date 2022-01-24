import React from 'react'

const Users = ({ users }) => {
  const tableRows = (users) => {
    return(
      <>
        {users.map(user => {
          return(
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )
        })}
      </>
    )

  }

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
          {tableRows(users)}
        </tbody>
      </table>
    </>
  )
}

export default Users