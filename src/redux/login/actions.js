import LoginApi from '../../api/loginApi'
import * as types from './actionTypes'
import auth from '../../helpers/auth'

export function loginSuccess(authToken, history) {
  // check role of token
  const profile = auth.checkToken(authToken)

  console.log('profile', profile)

  switch (profile.role) {
    case 'Admin':
      history.push('/admin')
      break
    case 'Instructor':
      history.push('/instructor/dashboard')
      break
    case 'Student':
      history.push('/')
      break
    default:
      throw Error(`Unexpected role value ${profile}`)
  }

  return { type: types.LOGIN_SUCCESS }
}

export function Login(history, username, password) {
  return dispatch =>
    LoginApi.login(username, password)
      .then((responseLogin) => {
        auth.setToken(responseLogin.access_token)
        dispatch(loginSuccess(responseLogin.access_token, history))
      })
      .catch((error) => {
        throw error
      })
}
