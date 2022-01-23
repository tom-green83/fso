import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    console.log('anecdote', anecdote)
    props.createAnecdote(anecdote)
    props.setNotification(`you added '${anecdote}'`, 5)
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

const mapDispatchToProps = dispatch => {
  return {
    createAnecdote: anecdote => {
      dispatch(createAnecdote(anecdote))
    },
    setNotification: (notificationMessage, duration) => {
      dispatch(setNotification(notificationMessage, duration))
    }
  }
}

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default connectedAnecdoteForm