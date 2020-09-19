import axios from 'axios'
import Swal from 'sweetalert2'

const instance = axios.create({
  baseURL: 'https://e-commerce-cms-juan.herokuapp.com'
})
// const instance = axios.create({
//   baseURL: 'http://localhost:3001'
// })

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    Swal.fire({
      icon: "error",
      title: "Try again",
      text: error.response.data.errors.join(", "),
    });
    return Promise.reject(error);
  }
);

export default instance
