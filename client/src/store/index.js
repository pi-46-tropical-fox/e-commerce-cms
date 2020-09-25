import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginStatus: false,
    products: [],
    selectedProduct: null
  },
  mutations: {
    CHANGE_LOGIN_STATUS (state, payload) {
      state.loginStatus = payload
    },
    UPDATE_PRODUCTS (state, payload) {
      state.products = payload
    },
    UPDATE_SELECTED_PRODUCT (state, payload) {
      state.selectedProduct = payload
    }
  },
  actions: {
    login (context, payload) {
      return axios({
        method: 'post',
        url: 'http://localhost:3000/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    fetchProducts (context, payload) {
      return axios({
        method: 'get',
        url: 'http://localhost:3000/products',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          context.commit('UPDATE_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct (context, payload) {
      return axios({
        method: 'post',
        url: 'http://localhost:3000/products',
        data: payload,
        headers: { access_token: localStorage.getItem('access_token') }
      })
    },
    editProduct (context, payload) {
      return axios({
        method: 'put',
        url: `http://localhost:3000/products/${payload.id}`,
        headers: { access_token: localStorage.getItem('access_token') },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock,
          category: payload.category
        }
      })
    },
    deleteProduct (context, payload) {
      return axios({
        method: 'delete',
        url: `http://localhost:3000/products/${payload.id}`,
        headers: { access_token: localStorage.getItem('access_token') }
      })
    }
  },
  modules: {
  }
})
