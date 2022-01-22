const initialState = { text: '' }

const filterReducer = (state = initialState, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type){
  case 'UPDATE_FILTER':
    state = action.text
    return state
  default: return state
  }
}

export const updateFilter = (text) => {
  return {
    type: 'UPDATE_FILTER',
    text: { text }
  }
}

export default filterReducer