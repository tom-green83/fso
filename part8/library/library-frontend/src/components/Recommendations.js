import React, { useState, useEffect } from 'react'
import { FILTER_BOOKS, GET_USER_INFO } from '../queries'
import { useQuery, useLazyQuery } from '@apollo/client'

const Recommendations = (props) => {
  const userInfo = useQuery(GET_USER_INFO)
  const [books, setBooks] = useState([])
  const [getBooks, result] = useLazyQuery(FILTER_BOOKS)

  const filterBooks = async (genre) => {
    await getBooks({ variables: { genre: genre } })
  }

  // Call GQL query once user info is loaded
  useEffect(() => {
    if (!userInfo.loading) {
      filterBooks(userInfo.data.me.favoriteGenre)
    }
  }, [userInfo.data])

  // Set books state to results returned by GQL query once they arrive
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (userInfo.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        books in your favorite genre <strong>{userInfo.data.me.favoriteGenre}</strong>
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

export default Recommendations