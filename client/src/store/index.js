import Vue from 'vue';
import Vuex from 'vuex';

import axios from '../config/axios';
import swal from '../config/swal'

Vue.use(Vuex);

// Note, to call properties inside these modules, use:
// this.$store.state.<module_name>.<property>

export default new Vuex.Store({
  state: {
    title: "RGB Commerce",
    description: "Your one stop to all things RGB.",
    page: {
      title: '',
    },

    // auth
    isAuthenticated: !!localStorage.getItem('access_token'),
    name: '',
    email: '',
    picture: '',
    token: localStorage.getItem('access_token') || '',

    // banner
    bannerData: null,
    bannerDetails: null,

    // category
    categoryData: null,
    categoryDetails: null,

    // product
    productData: null,
    productDetails: null
  },

  mutations: {

    // Auth
    SET_AUTH_STATE(state, bool) {
      state.isAuthenticated = bool
      console.log(`state.isAuthenticated -> ${state.isAuthenticated}`);
    },

    setUserState(state, payload) {
      state.name = payload.name
      state.email = payload.email
      state.picture = payload.picture
      state.token = payload.access_token
    },

    // Banner
    SET_BANNER_DATA(state, payload) {
      state.bannerData = payload.data
    },
    getBannerDetails(state, id) {
      state.bannerDetails = state.bannerData.find(data => data.id == id)
    },

    // Category
    SET_CATEGORY_DATA(state, payload) {
      state.categoryData = payload.data
    },
    getCategoryDetails(state, id) {
      state.categoryDetails = state.categoryData.find(data => data.id == id)
    },

    // Product
    SET_PRODUCT_DATA(state, payload) {
      state.productData = payload.data.map(product => {
        return {
          id: product.id,
          name: product.name,
          category: product.Category.name,
          price: product.price,
          stock: product.stock
        }
      })
    },
    getProductDetails(state, id) {
      state.productDetails = state.productData.find(data => data.id == id)
    },

    // upon logout
    EMPTY_DATA(state) {
      state.bannerData = null
      state.bannerDetails = null

      state.categoryData = null
      state.categoryDetails = null

      state.productData = null
      state.productDetails = null

      state.name = ''
      state.email = ''
      state.picture = ''
    }
  },

  actions: {
    // Auth
    login({ commit }) {
      commit('SET_AUTH_STATE', true)
    },

    logout({ commit }) {
      commit('EMPTY_DATA')
      commit('SET_AUTH_STATE', false)
    },

    getProducts({ commit }) {
      axios.get('/products', {
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          data.data.map(record => {
            delete record.createdAt
            delete record.updatedAt
            return record
          })

          commit('SET_PRODUCT_DATA', data)
        });
    },

    getCategories({ commit }) {
      axios.get('/categories', {
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          data.data.map(record => {
            delete record.createdAt
            delete record.updatedAt
            return record
          })

          commit('SET_CATEGORY_DATA', data)
        });
    },

    getBanners({ commit }) {
      axios.get('/banners', {
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          data.data.map(record => {
            delete record.createdAt
            delete record.updatedAt
            return record
          })

          commit('SET_BANNER_DATA', data)
        });
    },

    createProduct({ commit, dispatch }, payload) {
      axios({
        url: '/products',
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(res => {
          console.log(res);

          dispatch('getProducts')
        })
        .catch(err => {
          console.log(err);
        })
    },
    createCategory({ commit, dispatch }, payload) {
      axios({
        url: '/categories',
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(({ data }) => {
          swal.showToastSuccess(data.message)
          dispatch('getCategories')
        })
        .catch(err => {
          console.log(err);
        })
    },
    createBanner({ commit }, payload) {
      axios({
        url: '/banners',
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then()
        .catch(err => {
          console.log(err);
        })
    },

    updateProduct({ commit }, payload) {
      axios()
        .then()
        .catch(err => {
          console.log(err);
        })
    },
    updateCategory({ commit }, payload) {
      axios()
        .then()
        .catch(err => {
          console.log(err);
        })
    },
    updateBanner({ commit }, payload) {
      axios()
        .then()
        .catch(err => {
          console.log(err);
        })
    },

    deleteProduct({ commit }, payload) {
      axios()
        .then()
        .catch(err => {
          console.log(err);
        })
    },
    deleteCategory({ commit }, payload) {
      axios()
        .then()
        .catch(err => {
          console.log(err);
        })
    },
    deleteBanner({ commit }, payload) {
      axios()
        .then()
        .catch(err => {
          console.log(err);
        })
    },
  },

});
