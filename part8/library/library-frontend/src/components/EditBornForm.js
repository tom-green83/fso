import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BORN } from '../queries'

const EditBornForm = ({ ALL_AUTHORS, authors }) => {
  const [author, setAuthor] = useState(authors[0].name)
  const [born, setBorn] = useState('')
  const [ editBorn ] = useMutation(EDIT_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const updateAuthor = (event) => {
    event.preventDefault()
    editBorn({ variables: { name: author, setBornTo: born } })
    setBorn('')
  }

  return(
    <>
      <h1>Set Birthyear</h1>
      <form onSubmit={updateAuthor}>
        <div>
          <select value={author} onChange={({ target }) => setAuthor(target.value)}>
            {authors.map(author => <option key={author.id} value={author.name}>{author.name}</option>)}
          </select>
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