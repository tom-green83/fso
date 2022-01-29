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
    published
    id
    author {
      name
    }
  }
}
`
export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    id
    genres
    author {
      name
    }
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
    author {
      name
    }
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
export const LOGIN = gql`
mutation login($username: String!, $password : String!) {
  login (
    username: $username,
    password: $password
  ) {
    value
  }
}
`