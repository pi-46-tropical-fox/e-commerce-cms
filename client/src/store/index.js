import Vue from 'vue'
import Vuex from 'vuex'
import ProductsAPI from '../config/ProductsAPI'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    filters: [{ gender: 'Men' }, { gender: 'Women' }],
    categories: [],
    isLogin: false,
    notification: []

  },
  mutations: {
    SET_IS_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_PRODUCT (state, payload) {
      state.product = payload.product
    },
    SET_CATEGORIES (state, payload) {
      state.categories = payload
    },
    SET_NOTIFICATION (state, payload) {
      state.notification = payload
    }
  },
  actions: {
    login (context, payload) {
      ProductsAPI({
        url: '/login',
        method: 'POST',
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('id', data.id)
          localStorage.setItem('email', data.email)
        })
        .catch(err => {
          console.log(err)
        })
    },
    register (context, payload) {
      ProductsAPI({
        url: '/register',
        method: 'POST',
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchProducts (context) {
      ProductsAPI({
        url: '/products',
        method: 'GET',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          console.log(data, '<<< ini dr action')
          context.commit('SET_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct (context, payload) {
      ProductsAPI({
        url: '/products/add',
        method: 'PUT',
        headers: { access_token: localStorage.getItem('access_token') },
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          context.dispatch('fetchProducts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    editProduct (context, payload) {
      ProductsAPI({
        url: `/products/edit/${payload}`,
        method: 'GET',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('SET_PRODUCT', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateProduct (context, payload) {
      ProductsAPI({
        url: `/products/edit/${payload}`,
        method: 'PUT',
        headers: { access_token: localStorage.getItem('access_token') },
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          context.dispatch('fetchProducts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct (context, payload) {
      ProductsAPI({
        url: `/products/delete/${payload.id}`,
        method: 'DELETE',
        headers: { access_token: localStorage.getItem('access_token') },
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          context.dispatch('fetchProducts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCategories (context) {
      ProductsAPI({
        url: '/categories',
        method: 'GET',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          console.log(data, '<<< ini dr action')
          context.commit('SET_CATEGORIES', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
