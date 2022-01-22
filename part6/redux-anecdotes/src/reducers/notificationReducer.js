const initialState = { text: '' }

const notificationReducer = (state = initialState, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type){
  case 'ADD_NOTIFICATION':
    state = action.text
    return state
  case 'REMOVE_NOTIFICATION':
    state = { text: '' }
    return state
  default: return state
  }
}

export const setNotification = (text, seconds) => {
  return dispatch => {
    dispatch(addNotification(text))
    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}

const addNotification = (text) => {
  return {
    type: 'ADD_NOTIFICATION',
    text: { text }
  }
}

const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer