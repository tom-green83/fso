import React, { useEffect, useState } from 'react'
import { FILTER_BOOKS } from '../queries'
import { useLazyQuery } from '@apollo/client'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [getBooks, result] = useLazyQuery(FILTER_BOOKS)

  const filterBooks = async (genre) => {
    await getBooks({ variables: { genre: genre } })
  }

  // Update books state if result changes
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  // Call filterBooks with null argument to load unfiltered list of books when page is first loaded
  useEffect(() => {
    filterBooks(null)
  }, [])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        <button onClick={() => filterBooks('refactoring')}>refactoring</button>
        <button onClick={() => filterBooks('agile')}>agile</button>
        <button onClick={() => filterBooks('patterns')}>patterns</button>
        <button onClick={() => filterBooks('design')}>design</button>
        <button onClick={() => filterBooks('crime')}>crime</button>
        <button onClick={() => filterBooks('classic')}>classic</button>
        <button onClick={() => filterBooks(null)}>all genres</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books