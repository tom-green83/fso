const initialState = { text: null }
let timeoutID

const notificationReducer = (state = initialState, action) => {
  switch (action.type){
  case 'ADD_NOTIFICATION':
    state = {
      text: action.text,
      notificationType: action.notificationType
    }
    return state
  case 'REMOVE_NOTIFICATION':
    state = { text: null }
    return state
  default: return state
  }
}

export const setNotification = ( text, notificationType , seconds) => {
  return dispatch => {
    clearTimeout(timeoutID)
    dispatch(addNotification(text, notificationType))
    timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}

const addNotification = (text, notificationType) => {
  return {
    type: 'ADD_NOTIFICATION',
    text: text,
    notificationType: notificationType
  }
}

const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer