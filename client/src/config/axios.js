import axios from 'axios'

const host = 'https://rgb-commerce.herokuapp.com/'
const port = null

const instance = axios.create({
    baseURL: `${host}${port ? `:${port}` : ''}`
})

export default instance