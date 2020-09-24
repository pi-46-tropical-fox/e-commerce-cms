import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    isLogin: false,
    newProduct: {},
    oneProduct: {
      name: '',
      image_url: '',
      price: '',
      stock: ''
    }
  },
  mutations: {
    SET_ITEMS (state, payload) {
      state.items = payload
    },
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    LOGOUT (state, payload) {
      state.isLogin = payload
      localStorage.clear()
    },
    SET_NEW_PRODUCT (state, payload) {
      state.newProduct = payload
    },
    SET_ONE_PRODUCT (state, payload) {
      const { name, image_url, price, stock } = payload
      state.oneProduct.name = name
      state.oneProduct.image_url = image_url
      state.oneProduct.price = price
      state.oneProduct.stock = stock
    }
  },
  actions: {
    fetchItems ({ commit }) {
      axios({
        method: 'GET',
        url: 'https://agile-meadow-39887.herokuapp.com/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_ITEMS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    login ({ commit }, payload) {
      axios({
        method: 'POST',
        url: 'https://agile-meadow-39887.herokuapp.com/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          commit('SET_LOGIN', true)
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct ({ commit }, payload) {
      axios({
        method: 'POST',
        url: 'https://agile-meadow-39887.herokuapp.com/products',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock
        }
      })
        .then(({ data }) => {
          commit('SET_NEW_PRODUCT', data)
          this.dispatch('fetchItems')
          return data
        })
        .catch(err => {
          console.log(err, 'ini error add item')
          return err
        })
    },
    deleteProduct (context, payload) {
      axios({
        method: 'DELETE',
        url: `https://agile-meadow-39887.herokuapp.com/products/${payload.id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.dispatch('fetchItems')
          return data
        })
        .catch(err => {
          return err
        })
    },
    fetchItemById ({ commit }, payload) {
      axios({
        method: 'GET',
        url: `https://agile-meadow-39887.herokuapp.com/products/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('SET_ONE_PRODUCT', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editProduct ({ commit }, payload) {
      axios({
        method: 'PUT',
        url: `https://agile-meadow-39887.herokuapp.com/products/${payload.id}`,
        data: payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.dispatch('fetchItems')
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout ({ commit }) {
      localStorage.clear()
      commit('SET_LOGIN', false)
    }
  }
})
