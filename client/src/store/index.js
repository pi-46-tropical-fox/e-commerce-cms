import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    company: 'hacktiv8',
    products: [],
    email: '',
    selectedData: {}
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setUserEmail (state, email) {
      state.email = email
    },
    setSelectedData (state, payload) {
      state.selectedData = payload
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      axios({
        url: 'http://localhost:3000/products/',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('setProducts', data)
        })
        .catch(err => console.log(err))
    },
    deleteProduct ({ commit }, id) {
      axios({
        url: `http://localhost:3000/products/${id}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {

        })
        .catch(err => {
          console.log(err)
        })
    },
    login ({ commit }, payload) {
      axios({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('email', data.email)
          localStorage.setItem('role', data.role)
          commit('setUserEmail', data.email)
        })
        .catch(err => console.log(err))
    },
    createProduct ({ commit }, payload) {
      axios({
        url: 'http://localhost:3000/products',
        method: 'POST',
        data: payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
        })
        .catch(err => console.log(err))
    },
    getProduct ({ commit }, payload) {
      axios({
        url: `http://localhost:3000/products/${payload}`,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('setSelectedData', data)
        })
        .catch(err => console.log(err))
    },
    editProduct ({ commit }, payload) {
      axios({
        url: `http://localhost:3000/products/${payload.id}`,
        method: 'PUT',
        data: payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          router.push('/')
        })
        .catch(err => console.log(err))
    }
  },
  modules: {
  }
})
