import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    newProduct: {},
    product: {}
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
    }
    // editProduct ({commit}, data) {
    //   axios({
    //     method: 'PUT',
    //   })
    // }
  },
  modules: {
  }
})
