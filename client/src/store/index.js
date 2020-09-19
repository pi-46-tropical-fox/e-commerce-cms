import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    isLogin: false
  },
  mutations: {
    setItems (state, payload) {
      state.items = payload
    },
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    LOGOUT (state, payload) {
      state.isLogin = payload
      localStorage.clear()
    }
  },
  actions: {
    fetchItems ({ commit }) {
      axios({
        method: 'GET',
        url: 'http://localhost:3333/product',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('setItems', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    login ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: 'http://localhost:3333/users/login',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            localStorage.setItem('access_token', data.access_token)
            commit('SET_LOGIN', true)
            resolve()
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    checkLogin (context) {
      if(localStorage.getItem('access_token')) {
        context.commit('SET_LOGIN', true)
      }
    },
    logout ({ commit }) {
      commit('LOGOUT', false)
    },
    updateItem (context, payload) {
      axios({
        method: 'PUT',
        url: `http://localhost:3333/product/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
    }
  }
})
