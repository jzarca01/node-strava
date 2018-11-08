const axios = require('axios')

class Strava {
  constructor({
    client_id,
    client_secret
  }) {
    this.clientId = client_id
    this.clientSecret = client_secret
    this.request = axios.create({
      baseURL: 'https://m.strava.com/api/v3'
    })
  }

  setAccessToken(accessToken) {
    this.request.defaults.headers.common['Authorization'] = ''
    delete this.request.defaults.headers.common['Authorization']

    this.request.defaults.headers.common[
      'Authorization'
    ] = `access_token ${accessToken}`
  }

  async login(email, password) {
    try {
      const login = await this.request({
        method: 'POST',
        url: '/oauth/internal/token',
        data: {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          email: email,
          password: password
        },
        responseType: 'json'
      })
      this.setAccessToken(login.data.access_token)
      return login.data
    } catch (err) {
      console.log('error with login', err)
    }
  }

  async getProfile() {
    try {
      const profile = await this.request({
        method: 'GET',
        url: '/athlete',
        responseType: 'json'
      })
      return profile.data
    } catch (err) {
      console.log('error with getProfile', err)
    }
  }
}

module.exports = Strava