import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    }
  },
  actions: {
    fetchProducts (context) {
      axios({
        method: 'GET',
        url: 'http://localhost:3001/products'
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('setProducts', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchEditData ({ commit }, payload) {
      console.log(payload)
      axios.get(`http://localhost:3001/products/${payload}`)
        .then(({ data }) => {
          commit('setProducts', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
