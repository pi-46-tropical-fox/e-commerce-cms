const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://localhost:3000'
  // baseURL: 'https://kanbansyukur.herokuapp.com',
})

export default instance
