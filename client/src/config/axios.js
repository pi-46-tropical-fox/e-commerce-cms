import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://benzoh8.herokuapp.com'
})

export default instance
