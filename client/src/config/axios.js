import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://arkwatchstore.herokuapp.com'
})

export default instance
