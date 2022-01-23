import React from 'react'
import { connect } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id) => {
    // console.log('vote', id)
    props.voteForAnecdote(id)
    const anecdote = props.anecdotes.find(anecdote => anecdote.id === id)
    props.setNotification(`you voted for '${anecdote.content}'`, 5)
  }

  return (
    <>
      {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  const filter = state.filter.text
  const anecdotes = [...state.anecdotes]
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  const filteredAnecdotes = sortedAnecdotes.filter(sortedAnecdote => sortedAnecdote.content.toUpperCase().includes(filter.toUpperCase()))
  return { anecdotes: filteredAnecdotes }
}

const mapDispatchToProps = dispatch => {
  return {
    voteForAnecdote: id => {
      dispatch(voteForAnecdote(id))
    },
    setNotification: (notificationMessage, duration) => {
      dispatch(setNotification(notificationMessage, duration))
    }
  }
}

const connectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default connectedAnecdoteList