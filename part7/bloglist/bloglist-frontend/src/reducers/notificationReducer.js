const initialState = { text: null }
let timeoutID

const notificationReducer = (state = initialState, action) => {
  switch (action.type){
  case 'ADD_NOTIFICATION':
    state = action.text
    return state
  case 'REMOVE_NOTIFICATION':
    state = { text: null }
    return state
  default: return state
  }
}

export const setNotification = (text, seconds) => {
  return dispatch => {
    clearTimeout(timeoutID)
    dispatch(addNotification(text))
    timeoutID = setTimeout(() => {
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