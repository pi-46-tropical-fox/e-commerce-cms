import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    products: [],
    isLogin: false
  },
  mutations: {
    setLoginStatus (state, data) {
      state.isLogin = true
      router.push({ name: 'Home' })
    },
    setLogoutStatus (state, data) {
      state.categories = []
      state.products = []
      state.isLogin = false
      router.push({ name: 'Home' })
    },
    setCategories (state, data) {
      state.categories = data
    },
    setProducts (state, data) {
      state.products = data
    },
    deleteProduct (state, id) {
      state.products = state.products.filter(product => product.id !== id)
    },
    addProduct (state, data) {
      router.push({ path: '/products' })
    },
    updateProduct (state, data) {
      router.push({ path: '/products' })
    }
  },
  actions: {
    loginAccount ({ commit }, payload) {
      axios({
        url: '/login',
        method: 'POST',
        data: payload
      })
        .then(({ data }) => {
          Swal.fire(
            'Login success!',
            '',
            'success'
          )
          localStorage.setItem('access_token', data.access_token)
          commit('setLoginStatus')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.errors.join(', ')}`
          })
        })
    },
    logoutAccount ({ commit }) {
      Swal.fire(
        'Logout success!',
        '',
        'success'
      )
      localStorage.clear()
      commit('setLogoutStatus')
    },
    fetchCategory ({ commit }) {
      axios({
        method: 'GET',
        url: '/categories',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('setCategories', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.errors.join(', ')}`
          })
        })
    },
    fetchProduct ({ commit }) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('setProducts', data)
          console.log(data, '<<< products fetched')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.errors.join(', ')}`
          })
        })
    },
    deletingProduct ({ commit }, id) {
      axios({
        method: 'DELETE',
        url: `/products/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          Swal.fire(
            'Deleted!',
            `${data.message}`,
            'success'
          )
          commit('deleteProduct', id)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.errors.join(', ')}`
          })
        })
    },
    addingProduct ({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: payload
      })
        .then(({ data }) => {
          Swal.fire(
            'Added!',
            `${data.message}`,
            'success'
          )
          commit('addProduct', data.product)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.errors.join(', ')}`
          })
        })
    },
    updatingProduct ({ commit }, payload) {
      axios({
        method: 'PUT',
        url: `/products/${payload.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: payload.data
      })
        .then(({ data }) => {
          Swal.fire(
            'Saved!',
            `${data.message}`,
            'success'
          )
          commit('updateProduct', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.errors.join(', ')}`
          })
        })
    }
  },
  modules: {
  }
})
