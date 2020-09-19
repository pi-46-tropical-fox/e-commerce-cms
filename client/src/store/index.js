import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    price: '',
    isLogin: false,
    role: '',
    addSuccess: false,
    editSuccess: false
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      // console.log(payload, 'ini payload setProducts')
      state.products = payload
    },
    GET_PRODUCT_BY_ID (state, payload) {
      state.product = payload
    },
    SET_PRICE_LOCALESTRING (state, payload) {
      state.price = payload
    },
    ADD_PRODUCT (state, payload) {
      state.products.push(payload)
    },
    DELETE_PRODUCT (state, payload) {
      state.products = state.products.filter(el => (el.id !== payload))
    },
    SET_IS_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_EDIT_PRODUCT (state, payload) {
      state.product = payload
    },
    SET_ROLE (state, payload) {
      state.role = payload
    },
    SET_ADD_SUCCESS (state, payload) {
      state.addSuccess = payload
    },
    SET_EDIT_SUCCESS (state, payload) {
      state.editSuccess = payload
    }
  },
  actions: {
    fetchProduct ({ commit }) {
      // console.log('masuk fetchproduct di store')
      axios({
        method: 'GET',
        url: 'http://localhost:3000/product',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          // console.log(data, 'data dari database')
          commit('SET_PRODUCTS', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getProductById ({ commit }, id) {
      axios({
        method: 'GET',
        url: `http://localhost:3000/product/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('GET_PRODUCT_BY_ID', data)
          commit('SET_PRICE_LOCALESTRING', data.price.toLocaleString())
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addProduct ({ commit }, payload) {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/product',
        data: payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_ADD_SUCCESS', true)
          commit('ADD_PRODUCT', data)
          router.push({ path: '/product' })
          Swal.fire({
            icon: 'success',
            title: 'Success Add Product'
          })
        })
        .catch(({ response }) => {
          console.log(response.data.message)
          Swal.fire(response.data.message)
        })
    },
    deleteProduct ({ commit }, id) {
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/product/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(() => {
          console.log('sukses delete')
          commit('DELETE_PRODUCT', +id)
          router.push({ path: '/product' })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    editProduct ({ commit }, payload) {
      axios({
        method: 'PUT',
        url: `http://localhost:3000/product/${payload.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_EDIT_PRODUCT', payload)
          commit('SET_EDIT_SUCCESS', true)
        })
        .catch(({ response }) => {
          // console.log(response.data.message)
          Swal.fire(response.data.message)
        })
    },
    login ({ commit }, payload) {
      console.log(payload)
      axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('role', data.role)
          commit('SET_IS_LOGIN', true)
          commit('SET_ROLE', data.role)
          console.log(data)
        })
        .catch(({ response }) => {
          // console.log(response.data.message)
          Swal.fire(response.data.message)
        })
    },
    logout ({ commit }) {
      localStorage.clear()
      commit('SET_IS_LOGIN', false)
    }
  },
  modules: {
  }
})
