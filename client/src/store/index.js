import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    productData: {},
    id:null
  },
  mutations: {
    setData (state, data) {
      state.data = data
    },
    setProduct (state, data) {
      state.productData = data
    },
    setId(state,data){
      state.id = data
    }
  },
  actions: {
    fetchData ({ commit }) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('setData', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    login (context, userData) {
      axios({
        method: 'POST',
        url: '/login',
        data: userData
      })
        .then(({ data }) => {
          console.log(data.access_token)
          localStorage.setItem('access_token', data.access_token)
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    add (context, newProduct) {
      axios({
        method: 'POST',
        url: '/products',
        data: newProduct,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(data => {
          router.push('/')
          this.fetchData()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getOne ({ commit }, id) {
      console.log(id, '<<<<<< ini id dari vuex')
      axios({
        method: 'GET',
        url: `/products/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('setProduct', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getId({commit},id){
      commit('setId',id)
    },
    deleteProduct ({ commit }, id) {
      axios({
        method: 'DELETE',
        url: `/products/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(data => {
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    edit ({ commit }, payload) {
      console.log(payload)
      axios({
        method: 'PUT',
        url: `/products/${payload.id}`,
        data: payload.data,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log('success')
          console.log(data, 'ini success')
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
