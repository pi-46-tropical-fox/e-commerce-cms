import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    banners: [],
    banner: {}
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
    },
    SET_BANNERS: (state, payload) => {
      state.banners = payload
    },
    ADD_BANNER: (state, payload) => {
      state.banners.push(payload)
    },
    SET_BANNER: (state, payload) => {
      state.banner = payload
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
                swal('Delete Success', 'A product has been deleted successfully!', 'success')
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
    },
    getBanners ({ commit }, payload) {
      axios({
        method: 'GET',
        url: '/banners',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('SET_BANNERS', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addBanner ({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/banners',
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(({ data }) => {
          commit('ADD_BANNER', data)
          swal('Add Success', 'A banner has been added successfully!', 'success')
          router.push({ name: 'Banner' })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getBannerById ({ commit }, payload) {
      axios({
        method: 'GET',
        url: `/banners/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('SET_BANNER', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteBanner ({ commit }, payload) {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this banner!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            axios({
              method: 'DELETE',
              url: `/banners/${payload}`,
              headers: {
                access_token: localStorage.access_token
              }
            })
              .then(({ data }) => {
                swal('Delete Success', 'A banner has been deleted successfully!', 'success')
                router.push({ name: 'Banner' })
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
    },
    editBanner ({ commit }, payload) {
      axios({
        method: 'PUT',
        url: `/banners/${payload.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: payload.editData
      })
        .then(({ data }) => {
          swal('Edit Success', 'A banner has been edited successfully!', 'success')
          router.push({ name: 'Banner' })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {
  },
  getters: {
    filteredBanners: state => {
      state.banners.forEach((banner) => {
        if (banner.status === true) {
          banner.status = 'Active'
        } else if (!banner.status) {
          banner.status = 'Inactive'
        }
      })
      return state.banners
    }
  }
})
