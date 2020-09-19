import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    isLogin: false,
    newProduct: {}
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
    },
    SET_NEW_PRODUCT (state, payload) {
      state.newProduct = payload
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
      if (localStorage.getItem('access_token')) {
        context.commit('SET_LOGIN', true)
      }
    },
    addProduct ({ commit }, payload) {
      axios({
        method: 'POST',
        url: 'http://localhost:3333/product',
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
        url: `http://localhost:3333/product/${payload.id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({data}) => {
        console.log(data, 'ini dari delete actions');
        this.dispatch('fetchItems')
        return data
      })
      .catch(err => {
        console.log(err, 'ini err dari action delete');
        return err
      })
    }
  }
})
