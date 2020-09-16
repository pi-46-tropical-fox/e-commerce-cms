import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {}
  },
  mutations: {
    SET_PRODUCTS: (state, payload) => {
      state.products = payload
    },
    ADD_PRODUCT: (state, payload) => {
      state.products.push(payload)
    },
    SET_PRODUCT: (state, payload) => {
      state.product = payload
    }
  },
  actions: {
    login ({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          router.push({ name: 'Product' })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getProducts ({ commit }, payload) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('SET_PRODUCTS', data)
        })
        .catch((err) => {
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
        data: payload
      })
        .then(({ data }) => {
          commit('ADD_PRODUCT', data)
          swal('Add Success', 'A product has been added successfully!', 'success')
          router.push({ name: 'Product' })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getProductById ({ commit }, payload) {
      axios({
        method: 'GET',
        url: `/products/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('SET_PRODUCT', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteProduct ({ commit }, payload) {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this product!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            axios({
              method: 'DELETE',
              url: `/products/${payload}`,
              headers: {
                access_token: localStorage.access_token
              }
            })
              .then(({ data }) => {
                swal('Delete Success', 'Your product has been deleted!', {
                  icon: 'success'
                })
                router.push({ name: 'Product' })
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
    },
    editProduct ({ commit }, payload) {
      axios({
        method: 'PUT',
        url: `/products/${payload.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: payload.editData
      })
        .then(({ data }) => {
          swal('Edit Success', 'A product has been edited successfully!', 'success')
          router.push({ name: 'Product' })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
