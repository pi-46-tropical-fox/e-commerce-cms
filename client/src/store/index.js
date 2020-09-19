import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios.js'
import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    company: 'hacktiv8',
    products: [],
    banners: [],
    email: '',
    selectedData: {},
    role: localStorage.role,
    user: localStorage.email,
    name: '',
    loadingStatus: false
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setUserEmail (state, email) {
      state.email = email
    },
    setSelectedData (state, payload) {
      state.selectedData = payload
    },
    setCurrentPage (state, payload) {
      state.currentPage = payload
    },
    setBanners (state, payload) {
      state.banners = payload
    },
    setName (state, payload) {
      state.name = payload
    },
    setLoadingStatus (state, payload) {
      state.loadingStatus = payload
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      commit('setLoadingStatus', true)
      axios({
        url: '/products',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('setProducts', data)
        })
        .finally(() => {
          commit('setLoadingStatus', false)
        })
    },
    deleteProduct ({ commit }, id) {
      axios({
        url: `/products/${id}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
        })
    },
    login ({ commit }, payload) {
      axios({
        url: '/login',
        method: 'POST',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('email', data.email)
          localStorage.setItem('role', data.role)
          commit('setUserEmail', data.email)
          router.push('/')
        })
    },
    createProduct ({ commit }, payload) {
      axios({
        url: '/products',
        method: 'POST',
        data: payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          router.push('/')
        })
    },
    getProduct ({ commit }, payload) {
      axios({
        url: `/products/${payload}`,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('setSelectedData', data)
        })
    },
    editProduct ({ commit }, payload) {
      axios({
        url: `/products/${payload.id}`,
        method: 'PUT',
        data: payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          router.push('/')
        })
    },
    logout ({ commit }) {
      commit('setCurrentPage', 'loginPage')
      localStorage.clear()
    },
    fetchBanners ({ commit }) {
      axios({
        url: '/banners',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('setBanners', data)
        })
        .finally(() => {
          commit('setLoadingStatus', false)
        })
    },
    deleteBanner ({ commit }, id) {
      axios({
        url: `/banners/${id}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
        })
    },
    getBanner ({ commit }, payload) {
      axios({
        url: `/banners/${payload}`,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('setSelectedData', data)
        })
    },
    editBanner ({ commit }, payload) {
      axios({
        url: `/banners/${payload.id}`,
        method: 'PUT',
        data: payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          router.push('/banners')
        })
    },
    createBanner ({ commit }, payload) {
      axios({
        url: '/banners',
        method: 'POST',
        data: payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          router.push('/')
        })
    }
  },

  // getters: {
  //   filterByCategory (state) {
  //     console.log(state.products);
  //     return state.products
  //   }
  // },
  modules: {
  }
})
