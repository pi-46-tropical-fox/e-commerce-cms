import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios.js'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    title: 'Benzo',
    products: []
  },
  mutations: {
    setNewTitle (state, value) {
      state.title = value
    },
    setProduct (state, payload) {
      state.products = payload
    }
  },
  actions: {
    fetchProduct (context) {
      axios({
        method: 'GET',
        url: '/product',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('setProduct', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
