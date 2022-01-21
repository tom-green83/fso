const initialState = {}

const notificationReducer = (state = initialState, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type){
  case 'ADD_NOTIFICATION':
    state = action.text
    return state
  case 'REMOVE_NOTIFICATION':
    state = {}
    return state
  default: return state
  }
}

export const addNotification = (text) => {
  return {
    type: 'ADD_NOTIFICATION',
    text: { text }
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    text: ''
  }
}

export default notificationReducer