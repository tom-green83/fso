import React from 'react'

const Anecdote = ({ anecdote }) => (
  <div>
    <h1>{anecdote.content} by {anecdote.author}</h1>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see {anecdote.url}</p>
  </div>
)

export default Anecdote