const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

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
  case 'INIT_NOTES':
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
  return {
    type: 'ADD_ANECDOTE',
    data: asObject(anecdote)
  }
}

export const initializeAnecdotes = (notes) => {
  return {
    type: 'INIT_NOTES',
    data: notes,
  }
}

export default anecdoteReducer