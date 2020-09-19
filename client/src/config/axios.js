import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://gadget-space.herokuapp.com'
})

export default instance
