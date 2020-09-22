import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    }
  },
  actions: {
    fetchProducts (context) {
      axios({
        method: 'GET',
        url: 'http://localhost:3001/products'
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
