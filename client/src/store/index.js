import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios/axiosInstance'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    getId: {}

  },
  mutations: {
    setData (state, newData) {
      state.data = newData
    },
    getData (state, data) {
      state.getId = data
    },
    deleteData(state,id){
      state.data = state.data.filter(el =>{
        return el.id !== id
      }) 
    }
  },
  actions: {
    loginSubmit (content, payload) {
      console.log(payload, 'ini payload dari store')
      axios
        .post('/login', payload)
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          router.push({ name: 'Home' })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addProduct ({ commit }, payload) {
      axios
        .post('/products', payload,
          {
            headers: { access_token: localStorage.getItem('access_token') }
          })
        .then(({ data }) => {
          router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchData ({ commit }) {
      axios
        .get('/',
          {
            headers: { access_token: localStorage.getItem('access_token') }
          })
        .then(({ data }) => {
          commit('setData', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editProduct ({ commit }, payload) {
      console.log(payload.id)
      axios
        .put(`/products/${payload.id}`, payload.payload,
          {
            headers: { access_token: localStorage.getItem('access_token') }
          })
        .then(({ data }) => {
          router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    findId ({ commit }, id) {
      axios
        .get(`/products/${id}`,
          {
            headers: { access_token: localStorage.getItem('access_token') }
          })
        .then(({ data }) => {
          commit('getData', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct({commit}, id){
      axios
        .delete(`/products/${id}`,
        {
          headers: { access_token: localStorage.getItem('access_token') }
        })
        .then(({data}) =>{
          commit('deleteData', id)
        })
        .catch(err =>{
          console.log(err)})
    }
  },
  modules: {
  }
})
