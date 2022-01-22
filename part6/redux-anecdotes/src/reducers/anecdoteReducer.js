import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type){
  case 'VOTE':
    state = state.map(anecdote => {return (
      anecdote.id === action.data.id
        ? { ...anecdote, votes: anecdote.votes + 1 }
        : anecdote)})
    return state
  case 'ADD_ANECDOTE':
    return state.concat(action.data)
  case 'INIT_ANECDOTES':
    return action.data
  default: return state
  }
}

export const voteForAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const createdAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(
      {
        type: 'ADD_ANECDOTE',
        data: createdAnecdote
      })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer