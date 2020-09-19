import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://e-commerce-cms-izra.herokuapp.com'
})

export default instance
