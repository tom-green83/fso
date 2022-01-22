import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter.text)
  const anecdotes = useSelector(state => {
    const anecdotes = [...state.anecdotes]
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    const filteredAnecdotes = sortedAnecdotes.filter(sortedAnecdote => sortedAnecdote.content.toUpperCase().includes(filter.toUpperCase()))
    return filteredAnecdotes
  })
  // anecdotes = anecdotes.content.sort((a, b) => b.votes - a.votes)

  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteForAnecdote(id))
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(setNotification(`you voted for '${anecdote.content}'`, 5))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>

  )
}

export default AnecdoteList