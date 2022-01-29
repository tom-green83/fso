import React from 'react'
import { ALL_BOOKS, GET_USER_INFO } from '../queries'
import { useQuery } from '@apollo/client'

const Recommendations = (props) => {
  const userInfo = useQuery(GET_USER_INFO)
  const result = useQuery(ALL_BOOKS)

  if (result.loading || userInfo.loading) {
    return <div>loading...</div>
  }

  const genre = userInfo.data.me.favoriteGenre
  const books = result.data.allBooks.filter(book => {
    if (genre) {
      return book.genres.includes(genre)
    } else {
      return book
    }
  })

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        books in your favorite genre <strong>{genre}</strong>
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