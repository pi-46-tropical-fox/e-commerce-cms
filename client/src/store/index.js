import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    selectedProduct: {},
    banners: [],
    selectedBanner: {},
    currentPage: ''
  },

  mutations: {
    SET_LOGIN (state, data) {
      state.isLogin = data
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_SELECTED (state, payload) {
      state.selectedProduct = payload
    },
    SET_BANNERS (state, payload) {
      state.banners = payload
    },
    SET_SELECTEDBANNER (state, payload) {
      state.selectedBanner = payload
    },
    SET_CURRENTPAGE (state, payload) {
      state.currentPage = payload
    }
  },

  actions: {
    login (context, payload) {
      return axios({
        method: 'POST',
        url: 'http://localhost:3001/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          console.log(data.role, "<di vuex ni")
          localStorage.setItem('access_token', data.access_token)
          context.commit('SET_LOGIN', true)

          if(data.role == 'admin') {
            console.log('masuk di if')
            return '/dashboard'
          }else {
            return '/customerSite'
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    logout (context) {
      localStorage.clear()
      context.commit('SET_LOGIN', false)
    },

    fetchProducts (context) {
      axios({
        method: 'GET',
        url: 'http://localhost:3001/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    deleteProduct (context, id) {
      axios({
        method: 'DELETE',
        url: `http://localhost:3001/products/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data, '<< ini di store')
        })
        .catch(err => {
          console.log(err)
        })
    },

    addProduct (context, payload) {
      return axios({
        method: 'POST',
        url: 'http://localhost:3001/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock,
          category: payload.category
        }
      })
        .then(({ data }) => {
          return data
        })
        .catch(err => {
          // console.log(err.errors)
          return err.response.data.errors[0]
        })
    },

    selectProduct (context, id) {
      axios({
        method: 'GET',
        url: `http://localhost:3001/products/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('SET_SELECTED', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    editProduct (context, data) {
      axios({
        method: 'PUT',
        url: `http://localhost:3001/products/${data.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          name: data.payload.name,
          image_url: data.payload.image_url,
          price: data.payload.price,
          stock: data.payload.stock,
          category: data.payload.category
        }
      })
        .then(({ data }) => {
          // console.log(data, '<< ini di store')
        })
        .catch(err => {
          console.log(err)
        })
    },

    // BANNERS
    fetchBanners (context) {
      axios({
        method: 'GET',
        url: 'http://localhost:3001/banners',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data, "<<<<<fetch banners di stroee")
          context.commit('SET_BANNERS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    deleteBanner (context, id) {
      axios({
        method: 'DELETE',
        url: `http://localhost:3001/banners/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data, '<< ini di store')
        })
        .catch(err => {
          console.log(err)
        })
    },

    addBanner (context, payload) {
      return axios({
        method: 'POST',
        url: 'http://localhost:3001/banners',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title: payload.title,
          status: payload.status,
          category: payload.category
        }
      })
        .then(({ data }) => {
          return data
        })
        .catch(err => {
          // console.log(err.errors)
          return err.response.data.errors[0]
        })
    },

    selectBanner (context, id) {
      axios({
        method: 'GET',
        url: `http://localhost:3001/banners/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data, "di select banner nihh")
          context.commit('SET_SELECTEDBANNER', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    editBanner (context, payload) {
      axios({
        method: 'PUT',
        url: `http://localhost:3001/banners/${payload.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title: payload.data.title,
          status: payload.data.status,
          category: payload.data.category
        }
      })
        .then(({ data }) => {
          console.log(data, '<< ini di store')
        })
        .catch(err => {
          console.log(err)
        })
    },

    //CUSTOMER
    customerRegister (context, payload) {
      axios({
        method: 'POST',
        url: 'http://localhost:3001/register',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('access_token', data.access_token)
          context.commit('SET_LOGIN', true)
        })
        .catch(err => {
          console.log(err)
        })
    },

  }
})
