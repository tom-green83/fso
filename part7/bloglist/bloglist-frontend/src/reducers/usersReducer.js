const usersReducer = (state = [], action) => {
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

export default usersReducer
