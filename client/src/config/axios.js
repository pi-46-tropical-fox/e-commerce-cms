import axios from 'axios'

const host = 'https://rgb-commerce.herokuapp.com/'
// const host = 'http://localhost:3457/'

const instance = axios.create({
    baseURL: host
})

export default instance