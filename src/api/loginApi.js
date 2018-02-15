const loginUrl = process.env.REACT_APP_AUTH_URL

class LoginApi {
  static login(username, password) {
    const request = new Request(loginUrl, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      body: `username=${username}&password=${password}&grant_type=password`,
    })

    return fetch(request)
      .then(response => response.json())
      .catch(error => error)
  }
}

export default LoginApi
