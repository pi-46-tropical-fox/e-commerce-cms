import Vue from 'vue'
import Vuex from 'vuex'
import ProductsAPI from '../config/ProductsAPI'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: [],
    banners: [],
    banner: [],
    filters: [{ gender: 'Men' }, { gender: 'Women' }],
    categories: [],
    notification: [],
    color: '',
    isLogin: false
  },
  mutations: {
    SET_IS_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_PRODUCT (state, payload) {
      state.product = payload
    },
    SET_BANNERS (state, payload) {
      state.banners = payload
    },
    SET_BANNER (state, payload) {
      state.banner = payload
    },
    SET_CATEGORIES (state, payload) {
      state.categories = payload
    },
    SET_NOTIFICATION (state, payload) {
      state.notification = payload
    },
    SET_COLOR (state, payload) {
      state.color = payload
    }
  },
  actions: {
    login (context, payload) {
      return new Promise((resolve, reject) => {
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
            resolve(data)
          })
          .catch(({ response }) => {
            console.log(response.data.errors, '<<< dr err login')
            context.commit('SET_NOTIFICATION', response.data.errors)
            context.commit('SET_COLOR', 'warning')
            resolve(response)
          })
      })
    },
    register (context, payload) {
      return new Promise((resolve, reject) => {
        ProductsAPI({
          url: '/register',
          method: 'POST',
          data: payload
        })
          .then(({ data }) => {
            console.log(data)
            context.commit('SET_NOTIFICATION', [data.message])
            context.commit('SET_COLOR', 'success')
            resolve(data)
          })
          .catch(({ response }) => {
            console.log(response.data.errors)
            context.commit('SET_NOTIFICATION', response.data.errors)
            context.commit('SET_COLOR', 'warning')
            reject(response.data.errors)
          })
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
      return new Promise((resolve, reject) => {
        ProductsAPI({
          url: '/products',
          method: 'POST',
          headers: { access_token: localStorage.getItem('access_token') },
          data: payload
        })
          .then(({ data }) => {
            console.log(data, '<<<< ini dr addProduct')
            context.dispatch('fetchProducts')
            context.commit('SET_NOTIFICATION', ['Successfully Create New Product'])
            context.commit('SET_COLOR', 'success')
            resolve(data)
          })
          .catch(({ response }) => {
            context.commit('SET_NOTIFICATION', response.data.errors)
            context.commit('SET_COLOR', 'warning')
            reject(response.data.errors)
          })
      })
    },
    editProduct (context, payload) {
      return new Promise((resolve, reject) => {
        ProductsAPI({
          url: `/products/editProduct/${payload}`,
          method: 'GET',
          headers: { access_token: localStorage.getItem('access_token') }
        })
          .then(({ data }) => {
            console.log(payload, 'ini dr edit product')
            console.log(data.product, '<<<ini dr edit')
            context.commit('SET_PRODUCT', data.product)
            context.commit('SET_NOTIFICATION', [data.message])
            context.commit('SET_COLOR', 'success')
            resolve(data)
          })
          .catch(({ response }) => {
            context.commit('SET_NOTIFICATION', response.data.errors)
            context.commit('SET_COLOR', 'warning')
            reject(response.data.errors)
          })
      })
    },
    updateProduct (context, payload) {
      return new Promise((resolve, reject) => {
        ProductsAPI({
          url: `/products/${payload.id}`,
          method: 'PUT',
          headers: { access_token: localStorage.getItem('access_token') },
          data: payload
        })
          .then(({ data }) => {
            context.commit('SET_NOTIFICATION', [data.message])
            context.commit('SET_COLOR', 'success')
            resolve(data)
          })
          .catch(({ response }) => {
            context.commit('SET_NOTIFICATION', response.data.errors)
            context.commit('SET_COLOR', 'warning')
            reject(response.data.errors)
          })
      })
    },
    deleteProduct (context, payload) {
      const agreement = confirm('Are you sure to delete this item?')
      if (agreement) {
        return new Promise((resolve, reject) => {
          ProductsAPI({
            url: `/products/${payload.id}`,
            method: 'DELETE',
            headers: { access_token: localStorage.getItem('access_token') },
            data: payload
          })
            .then(({ data }) => {
              console.log(data)
              context.dispatch('fetchProducts')
              context.commit('SET_NOTIFICATION', [data.message])
              context.commit('SET_COLOR', 'success')
              resolve(data)
            })
            .catch(err => {
              reject(err)
            })
        })
      }
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
    },
    addCategory (context, payload) {
      return new Promise((resolve, reject) => {
        ProductsAPI({
          url: '/categories',
          method: 'POST',
          headers: { access_token: localStorage.getItem('access_token') },
          data: payload
        })
          .then(({ data }) => {
            context.dispatch('fetchProducts')
            context.commit('SET_NOTIFICATION', ['Successfully Create New Category'])
            context.commit('SET_COLOR', 'success')
            resolve(data)
          })
          .catch(({ response }) => {
            context.commit('SET_NOTIFICATION', response.data.errors)
            context.commit('SET_COLOR', 'warning')
            reject(response.data.errors)
          })
      })
    },
    fetchBanners (context) {
      ProductsAPI({
        url: '/banners',
        method: 'GET',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          console.log(data, '<<< ini dr action')
          context.commit('SET_BANNERS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addBanner (context, payload) {
      return new Promise((resolve, reject) => {
        ProductsAPI({
          url: '/banners',
          method: 'POST',
          headers: { access_token: localStorage.getItem('access_token') },
          data: payload
        })
          .then(({ data }) => {
            context.dispatch('fetchBanners')
            context.commit('SET_NOTIFICATION', ['Successfully Create New Banner'])
            context.commit('SET_COLOR', 'success')
            resolve(data)
          })
          .catch(({ response }) => {
            context.commit('SET_NOTIFICATION', response.data.errors)
            context.commit('SET_COLOR', 'warning')
            reject(response.data.errors)
          })
      })
    },
    editBanner (context, payload) {
      return new Promise((resolve, reject) => {
        ProductsAPI({
          url: `/banners/${payload}`,
          method: 'GET',
          headers: { access_token: localStorage.getItem('access_token') }
        })
          .then(({ data }) => {
            console.log(data, '<<<ini dr edit')
            context.commit('SET_BANNER', data)
            resolve(data)
          })
          .catch(({ response }) => {
            context.commit('SET_NOTIFICATION', response.data.errors)
            context.commit('SET_COLOR', 'warning')
            reject(response.data.errors)
          })
      })
    },
    updateBanner (context, payload) {
      return new Promise((resolve, reject) => {
        ProductsAPI({
          url: `/banners/${payload.id}`,
          method: 'PUT',
          headers: { access_token: localStorage.getItem('access_token') },
          data: payload
        })
          .then(({ data }) => {
            context.commit('SET_NOTIFICATION', [data.message])
            context.commit('SET_COLOR', 'success')
            resolve(data)
          })
          .catch(({ response }) => {
            context.commit('SET_NOTIFICATION', response.data.errors)
            context.commit('SET_COLOR', 'warning')
            reject(response.data.errors)
          })
      })
    },
    deleteBanner (context, payload) {
      const agreement = confirm('Are you sure to delete this item?')
      if (agreement) {
        return new Promise((resolve, reject) => {
          ProductsAPI({
            url: `/banners/${payload.id}`,
            method: 'DELETE',
            headers: { access_token: localStorage.getItem('access_token') },
            data: payload
          })
            .then(({ data }) => {
              console.log(data)
              context.dispatch('fetchBanners')
              context.commit('SET_NOTIFICATION', [data.message])
              context.commit('SET_COLOR', 'success')
              resolve(data)
            })
            .catch(err => {
              reject(err)
            })
        })
      }
    }
  },
  modules: {
  }
})
