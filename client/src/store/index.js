import Vue from 'vue';
import Vuex from 'vuex';

import axios from '../config/axios';

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
    changeAuthState(state, bool) {
      state.isAuthenticated = bool
      console.log(`state.isAuthenticated -> ${state.isAuthenticated}`);
    },

    // Auth
    setUserState(state, payload) {
      state.name = payload.name
      state.email = payload.email
      state.picture = payload.picture
      state.token = payload.access_token
    },

    // Banner
    saveBannerData(state, payload) {
      state.bannerData = payload.data
    },
    getBannerDetails(state, id) {
      state.bannerDetails = state.bannerData.find(data => data.id == id)
    },

    // Category
    saveCategoryData(state, payload) {
      state.categoryData = payload.data
    },
    getCategoryDetails(state, id) {
      state.categoryDetails = state.categoryData.find(data => data.id == id)
    },

    // Product
    saveProductData(state, payload) {
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
    emptyData(state) {
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
    login(context) {
      context.commit('changeAuthState', true)
    },

    logout(context) {
      context.commit('emptyData')
      context.commit('changeAuthState', false)
    },

    storeProductData(context, payload) {
      context.commit('saveProductData', payload)
    },

    storeCategoryData(context, payload) {
      context.commit('saveCategoryData', payload)
    },

    storeBannerData(context, payload) {
      context.commit('saveBannerData', payload)
    }
  },

});
