import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios.js'
import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    company: 'hacktiv8',
    products: [],
    email: '',
    selectedData: {},
    role: localStorage.role,
    user: localStorage.email
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
    },
    setCurrentPage (state, payload) {
      state.currentPage = payload
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      axios({
        url: '/products',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('setProducts', data)
        })
    },
    deleteProduct ({ commit }, id) {
      axios({
        url: `/products/${id}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
        })
    },
    login ({ commit }, payload) {
      axios({
        url: '/login',
        method: 'POST',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('email', data.email)
          localStorage.setItem('role', data.role)
          commit('setUserEmail', data.email)
          router.push('/')
        })
    },
    createProduct ({ commit }, payload) {
      axios({
        url: '/products',
        method: 'POST',
        data: payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          router.push('/')
        })
    },
    getProduct ({ commit }, payload) {
      axios({
        url: `/products/${payload}`,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('setSelectedData', data)
        })
    },
    editProduct ({ commit }, payload) {
      axios({
        url: `/products/${payload.id}`,
        method: 'PUT',
        data: payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          router.push('/')
        })
    },
    logout ({ commit }) {
      commit('setCurrentPage', 'loginPage')
      localStorage.clear()
    }
  },
  // getters: {
  //   filterByCategory (state) {
  //     console.log(state.products);
  //     return state.products
  //   }
  // },
  modules: {
  }
})
