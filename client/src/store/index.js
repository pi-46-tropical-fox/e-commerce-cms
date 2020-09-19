import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    selectedProduct: {}
  },
  mutations: {
    // fetch products
    setProducts (state, payload) {
      state.products = payload
    },
    // fetch product by id
    setSelectedProduct (state, payload) {
      state.selectedProduct = payload
    },
    // merubah v model pada selectedProduct
    setName (state, payload) {
      state.selectedProduct.name = payload
    },
    setImage_url (state, payload) {
      state.selectedProduct.image_url = payload
    },
    setPrice (state, payload) {
      state.selectedProduct.price = payload
    },
    setStock (state, payload) {
      state.selectedProduct.stock = payload
    }
  },
  actions: {
    // action untuk login
    login (context, payload) {
      const { email, password } = payload

      axios({
        method: 'post',
        url: '/login',
        data: {
          email, password
        }
      })
        .then(({ data }) => {
          // console.log(data)
          Swal.fire(
            'Good job!',
            `${data.email} has been logged`,
            'success'
          )
          localStorage.setItem('access_token', data.access_token)
          router.push({ name: 'Home' })
        })
        .catch(err => {
          // console.log(err.response.data);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.message}`
          })
        })
    },
    // action untuk fetch data
    fetchProducts ({ commit }) {
      // context.commit => distruct {commit}
      axios({
        method: 'get',
        url: '/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          // console.log(data, '<<< ini data dari store')
          // this.products = data
          // sebelum dimasukan kedalam state panggil dulu mutation (commit)
          commit('setProducts', data)
        })
        .catch(err => {
          console.log(err.response, '<<< ini error fetchdata store')
        })
    },
    // fetch Product By Id
    fetchProductById ({ commit }, id) {
      axios({
        method: 'get',
        url: '/products/' + id,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          // console.log(data);
          // this.name = data.name
          // this.image_url = data.image_url
          // this.price = data.price
          // this.stock = data.stock
          commit('setSelectedProduct', data)
        })
        .catch(err => {
          console.log(err.response, '<<< ini errornya')
        })
    },
    // action edit Product
    editProduct (_, payload) {
      const { id, name, image_url, price, stock } = payload
      axios({
        method: 'put',
        url: '/products/' + id,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name,
          image_url,
          price,
          stock
        }
      })
        .then(({ data }) => {
          // console.log(data)
          Swal.fire(
            'Good job!',
            `${data.message}`,
            'success')
          router.push({ name: 'Home' })
        })
        .catch(err => {
          // console.log(err.response.data.errors)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.errors}`
          })
        })
    },
    // submit Product
    submitProduct (_, payload) {
      const { name, image_url, price, stock } = payload
      axios({
        method: 'post',
        url: '/products',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name,
          image_url,
          price,
          stock
        }
      })
        .then(({ data }) => {
          // console.log(data)
          Swal.fire(
            'Good job!',
            `${data.name} has been added`,
            'success')
          router.push({ name: 'Home' })
        })
        .catch(err => {
          // console.log(err.response.data.errors)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.errors}`
          })
        })
    },
    // delete Product
    deleteProduct (_, payload) {
      const { id } = payload
      axios({
        method: 'delete',
        url: '/products/' + id,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          // console.log(data)
          Swal.fire(
            'Good job!',
            `${data.message}`,
            'success')
          router.push({ name: 'Home' }).catch(err => {})
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  // getters: {
  //   filteredProduct (state) {
  //     return state.products.filter(product => product.price <= 25000)
  //   }
  // },
  modules: {
  }
})
