import axios from 'axios'

const userReducer = (state = [], action) => {
  switch (action.type){
  case 'SET_USERS':
    state = action.users
    return state
  default: return state
  }
}

export const setUsers = (users) => {
  return  {
    type: 'SET_USERS',
    users: users
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const usersUrl = 'http://localhost:3003/api/users'
    const users = (await axios.get(usersUrl)).data
    dispatch (setUsers(users))
  }
}

export default userReducer
