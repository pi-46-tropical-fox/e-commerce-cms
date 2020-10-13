import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('access_token') || null,
    products: [],
    selectedData: {}
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    removeProduct (state, payload) {
      state.products = state.products.filter(product => product.id !== payload)
    },
    setSelectedData (state, payload) {
      state.selectedData = payload
    },
    retrieveToken (state, accessToken) {
      state.accessToken = accessToken
    }
  },
  actions: {
    register (context, payload) {
      axios({
        method: 'POST',
        url: 'http://localhost:3001/register',
        data: {
          email: payload.registerEmail,
          password: payload.registerPassword
        }
      })
        .then(({ data }) => {
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
      // axios.post('http://localhost:3001/register', {
      //   email: payload.registerEmail,
      //   password: payload.Password
      // })
      //   .then(({ data }) => {
      //     console.log(data)
      //     // router.push('/')
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    retrieveToken (context, credentials) {
      axios({
        method: 'POST',
        url: 'http://localhost:3001/login',
        data: {
          email: credentials.loginEmail,
          password: credentials.loginPassword
        }
      })
        .then(({ data }) => {
          console.log(data)
          const accessToken = data.access_token
          localStorage.setItem('access_token', accessToken)
          context.commit('retrieveToken', accessToken)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchProducts (context) {
      axios({
        method: 'GET',
        url: 'http://localhost:3001/products',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          // console.log(data)
          context.commit('setProducts', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchEditData ({ commit }, payload) {
      console.log(payload, 'fetch index store')
      axios.get(`http://localhost:3001/products/${payload}`)
        .then(({ data }) => {
          commit('setSelectedData', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editData ({ commit }, payload) {
      axios.put(`http://localhost:3001/products/${payload.id}`, payload)
        .then(({ data }) => {
          router.push('/dashboard')
        })
        .catch(err => {
          console.log(err)
        })
    },
    addData ({ commit }, payload) {
      axios.post('http://localhost:3001/products', payload)
        .then(({ data }) => {
          router.push('/dashboard')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
