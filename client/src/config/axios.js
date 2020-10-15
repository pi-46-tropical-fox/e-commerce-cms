const axios = require('axios')

const instance = axios.create({
  // baseURL: 'https://ecommerce-syukur.herokuapp.com'
  // baseURL: 'https://kanbansyukur.herokuapp.com',
  baseURL: 'http://localhost:3000'
})

export default instance
