import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`
export const ALL_BOOKS_NO_GENRES = gql`
query {
  allBooks {
    title    
    author
    published
    id
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook ($author: String!, $genres: [String!]!, $published: Int!, $title: String!) {
  addBook (
    author: $author,
    genres: $genres,
    published: $published,
    title: $title
  ){
    title
    published
    author
    id
    genres
  }
}
`
export const EDIT_BORN = gql`
mutation editBorn ($name: String!, $setBornTo: Int!) {
  editAuthor (
    name: $name,
    setBornTo: $setBornTo
  ){
    name
    id
    born
    bookCount
  }
}
`