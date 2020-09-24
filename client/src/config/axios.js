import axios from 'axios'

const host = 'http://localhost:3457'
const port = null

const instance = axios.create({
    baseURL: `${host}${port ? `:${port}` : ''}`
})

export default instance