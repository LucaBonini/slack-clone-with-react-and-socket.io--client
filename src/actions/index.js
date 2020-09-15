export const login = async ({ username, password }) => {
  return async (dispatch) => {
    console.log('inside login dispatched')
    try {
      let res = await axios.post(`${serverUrl}${serverAuthPath}`, {
          username,
          password
        })
      localStorage.setItem('chatToken', res.data)
      // window.location.href = appUrl+chatPath
      dispatch({
        type: 'auth_user'
      })
    } catch (error) {
      //   // TODO HANDLE WRONG CREDENTIALS
      console.log(error)
    }
  }
}