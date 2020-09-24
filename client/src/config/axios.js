import axios from 'axios'

const instance = axios.create({ baseURL: 'https://e-commerce-h8.herokuapp.com/' })

export default instance
