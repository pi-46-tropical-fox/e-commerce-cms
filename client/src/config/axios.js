import Swal from 'sweetalert2'
import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://localhost:3000'
  baseURL: 'https://bookiepedia-sam.herokuapp.com/'
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log(error.response, 'IN SWAL')
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: error.response.data.errors.join(', '),
    footer: '<a href>Why do I have this issue?</a>'
  })
  return Promise.reject(error)
})

export default instance
