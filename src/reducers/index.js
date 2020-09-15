const AUTH_USER = 'auth_user'

export default (state = {
  auth: false
}, action) => {
  console.log('INSIDE REDUCER')
  console.log(action, 'ACTION')
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        auth: true
      }
  }
  return state
}