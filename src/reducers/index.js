export const AUTH_USER = 'auth_user'
export const LOGOUT_USER = 'logout_user'

export default (state = {
  auth: false
}, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        auth: true,
        ...action.payload
      }
    case LOGOUT_USER:
      localStorage.removeItem('chatToken')
      return {
        auth: false
      }
  }
  return state
}