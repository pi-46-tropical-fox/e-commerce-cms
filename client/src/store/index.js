import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    oneProduct: {
      name: '',
      description: '',
      gender: '',
      category: '',
      diameter: '',
      movement: '',
      image: '',
      stock: '',
      price: ''
    }
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setOneProduct (state, payload) {
      const { name, description, gender, category, diameter, movement, image, stock, price } = payload
      state.oneProduct.name = name
      state.oneProduct.description = description
      state.oneProduct.gender = gender
      state.oneProduct.category = category
      state.oneProduct.diameter = diameter
      state.oneProduct.movement = movement
      state.oneProduct.image = image
      state.oneProduct.stock = stock
      state.oneProduct.price = price
      console.log(payload, 'ini payload setOneProduct')
    }
  },
  actions: {
    login (context, payload) {
      axios({
        method: 'POST',
        url: '/users/login',
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('access_token', data.access_token)
        })
        .catch(err => {
          console.log(err, 'ini error login di client')
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
          console.log(data, 'data kiriman dari actions di invoke di created')
          commit('setProducts', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    fetchOneProduct (context, id) {
      axios({
        method: 'GET',
        url: `/products/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data, 'data kiriman dari actions fetchOneProduct di invoke di created edit')
          context.commit('setOneProduct', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct (context, payload) {
      axios({
        method: 'POST',
        url: '/products',
        data: payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data, 'ini response dari add products')
          // context.commit('setAddProduct', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editProduct (context, payload) {
      axios({
        method: 'PUT',
        url: `/products/${payload.id}`,
        data: payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data, 'ini response dari add products')
          context.dispatch('fetchProducts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProducts (context, id) {
      axios({
        method: 'DELETE',
        url: `/products/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data, 'ini response delete dari vuex')
          context.dispatch('fetchProducts')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
