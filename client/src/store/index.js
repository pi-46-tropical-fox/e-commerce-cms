import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    siteName: 'Tokoku',
    products: [],
    selectedData: {}
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setSelected (state, payload) {
      state.selectedData = payload
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('setProducts', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    loginSubmit ({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    submitProduct ({ commit }, dataProduct) {
      axios({
        method: 'POST',
        url: '/products',
        headers: {
          access_token: localStorage.access_token
        },
        data: dataProduct
      })
        .then(data => {
          console.log(data.price)
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchData ({ commit }, payload) {
      axios({
        method: 'GET',
        url: `/products/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('setSelected', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editData ({ commit }, payload) {
      axios({
        method: 'PUT',
        url: `/products/${payload.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(data => {
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteSubmit ({ commit }, payload) {
      axios({
        method: 'DELETE',
        url: `/products/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(data => {
          this.dispatch('fetchProducts')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
