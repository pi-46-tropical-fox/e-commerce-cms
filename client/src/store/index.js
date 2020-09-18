import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'

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
      state.products.push(data)
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
          localStorage.setItem('access_token', data.access_token)
          commit('setLoginStatus')
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    logoutAccount ({ commit }) {
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
          console.log(data, '<<< categories fetched')
        })
        .catch(err => {
          console.log(err.response.data)
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
          console.log(err.response.data)
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
          console.log(data)
          commit('deleteProduct', id)
        })
        .catch(err => {
          console.log(err.response.data)
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
          console.log(data)
          commit('addProduct', data.product)
        })
        .catch(err => {
          console.log(err.response.data)
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
          console.log(data)
          commit('updateProduct', data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  },
  modules: {
  }
})
