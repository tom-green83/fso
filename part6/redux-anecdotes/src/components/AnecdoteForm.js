import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    console.log('anecdote', anecdote)
    anecdoteService.createNew(anecdote)
      .then(createdAnecdote => {
        dispatch(createAnecdote(createdAnecdote))
        dispatch(addNotification(`you added '${anecdote}'`))
        setTimeout(() => dispatch(removeNotification()), 5000)
      })
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </>

  )
}

export default AnecdoteForm