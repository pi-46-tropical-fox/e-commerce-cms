import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    newProduct: {},
    product: {},
    aProduct: {
      name: '',
      image_url: '',
      price: '',
      stock: ''
    }
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setLogin (state, payload) {
      state.isLogin = payload
    },
    setNewProduct (state, payload) {
      state.newProduct = payload
    },
    setDeleteProduct (state, payload) {
      state.product = payload
    },
    setProduct (state, payload) {
      const { name, image_url, price, stock } = payload
      state.aProduct.name = name
      state.aProduct.image_url = image_url
      state.aProduct.price = price
      state.aProduct.stock = stock
    }
  },
  actions: {
    login ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/login',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            localStorage.setItem('access_token', data.access_token)
            commit('setLogin', true)
            resolve()
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    fetchProducts ({ commit }) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('setProducts', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct ({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/products',
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
          console.log(data, 'masuk axios then')
          commit('setNewProduct', data)
          this.dispatch('fetchProducts')
          return data
        })
        .catch(err => {
          console.log(err)
          return err.response.data
        })
    },
    deleteProduct ({ commit }, id) {
      axios({
        method: 'DELETE',
        url: `/products/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data, 'ini delete di store')
          commit('setDeleteProduct', data)
          this.dispatch('fetchProducts')
          return data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getProduct ({ commit }, payload) {
      axios({
        method: 'GET',
        url: `/products/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('setProduct', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateProduct ({ dispatch }, payload) {
      axios({
        method: 'PUT',
        url: `/products/${payload.id}`,
        data: payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          dispatch('fetchProducts')
          return data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
