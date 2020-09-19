import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios.js'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    title: 'Benzo',
    products: []
  },
  mutations: {
    setNewTitle (state, value) {
      state.title = value
    },
    setProduct (state, payload) {
      state.products = payload
    },
    addProduct (state, payload) {
      state.products.push(payload)
    },
    deleteProduct (state, payload) {
      state.products = state.products.filter(el => el.id != payload)
    },
    editProduct (state, payload) {
      const target = state.products.filter(el => el.id == payload.id)
      state.products.forEach(el => {
        if (el.id == payload.id) {
          el.name = payload.name,
          el.price = payload.price,
          el.stock = payload.stock,
          el.imageURL = payload.imageURL,
          el.category = payload.category
        }
      })
    }
  },
  actions: {
    fetchProduct (context) {
      axios({
        method: 'GET',
        url: '/product',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setProduct', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct (context, payload) {
      axios({
        method: 'POST',
        url: '/product',
        data: payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((data) => {
          payload.id = data.data.id
          context.commit('addProduct', payload)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct (context, id) {
      axios({
        method: 'delete',
        url: `/product/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((data) => {
          context.commit('deleteProduct', id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editProduct (context, payload) {
      const { id } = payload
      axios({
        method: 'patch',
        url: `/product/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: payload
      })
        .then((data) => {
          context.commit('editProduct', payload)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
