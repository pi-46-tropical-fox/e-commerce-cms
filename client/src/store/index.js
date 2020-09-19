import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

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
    addProduct (state, payload) {
      state.products.push(payload)
    },
    setSelected (state, payload) {
      state.selectedData = payload
    },
    updateProduct (state, payload) {
      state.selectedData = payload
    },
    deleteProduct (state, payload) {
      state.selectedData = payload
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      axios({
        method: 'GET',
        url: '/products',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          commit('setProducts', data)
        })
        .catch(err => { console.log(err) })
    },
    async addProduct ({ commit }, data) {
      const product = await axios({
        method: 'POST',
        url: '/products',
        headers: { access_token: localStorage.getItem('access_token') },
        data: data
      })
      try {
        commit('addProduct', product.data)
      } catch (err) {
        console.log(err)
      }
    },
    fetchData ({ commit }, id) {
      axios({
        method: 'GET',
        url: `/products/${id}`,
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          commit('setSelected', data)
        })
        .catch(err => { console.log(err) })
    },
    async updateProduct ({ commit }, payload) {
      await axios({
        method: 'PUT',
        url: `/products/${payload.id}`,
        headers: { access_token: localStorage.getItem('access_token') },
        data: payload
      })
      try {
        commit('updateProduct', payload)
      } catch (err) {
        console.log(err)
      }
    },
    async deleteProduct ({ commit }, id) {
      const data = await axios({
        method: 'DELETE',
        url: `/products/${id}`,
        headers: { access_token: localStorage.getItem('access_token') }
      })
      try {
        console.log(data.data)
        commit('deleteProduct', data.data)
      } catch (err) {
        console.log(err)
      }
    },
    async login (context, userData) {
      const data = await axios({
        method: 'POST',
        url: '/login',
        data: userData
      })
      try {
        localStorage.setItem('access_token', data.data.access_token)
      } catch (err) {
        console.log(err)
      }
    }
  },
  modules: {
  }
})
