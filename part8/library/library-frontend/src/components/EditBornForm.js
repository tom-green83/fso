import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BORN, ALL_AUTHORS } from '../queries'

const EditBornForm = () => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')
  const [ editBorn ] = useMutation(EDIT_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const updateAuthor = (event) => {
    event.preventDefault()
    editBorn({ variables: { name: author, setBornTo: born } })
    setAuthor('')
    setBorn('')
  }

  return(
    <>
      <h1>Set Birthyear</h1>
      <form onSubmit={updateAuthor}>
        <div>
          name
          <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          born
          <input type='number' value={born} onChange={({ target }) => setBorn(parseInt(target.value))}/>
        </div>
        <button type='submit'>upate author</button>
      </form>
    </>
  )
}

export default EditBornForm