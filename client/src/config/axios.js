import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://mariopetoko.herokuapp.com'
})

export default instance
