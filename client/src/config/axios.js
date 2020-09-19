import axios from 'axios'
import Swal from 'sweetalert'

const instance = axios.create({
    baseURL: 'https://desolate-bastion-39685.herokuapp.com/'
})

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.errors.join(', ')
        })
        return Promise.reject(error)
    }
)

export default instance