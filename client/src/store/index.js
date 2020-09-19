import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    productById: {},
    isLogin: false,
    email: ''
  },
  mutations: {
    GET_PRODUCTS(state,payload) {
      state.products = payload
    },
    GET_BY_ID_PRODUCTS(state,payload) {
      state.productById = payload
    },
    IS_LOGIN(state,payload) {
      state.isLogin = true
      state.email = payload.email
    },
    IS_LOGOUT(state) {
      state.isLogin = false
      state.email = ''
    }
  },
  actions: {
    login(context, payload) {
      return axios({
        method: "POST",
        url: "http://localhost:3000/login",
        data: {
          email: payload.email,
          password: payload.password,
        }
      })
      .then(({data}) => {
          console.log('axios login');
          console.log(data);
          localStorage.setItem('access_token', data.access_token)
          context.commit('IS_LOGIN', data)
          // return data
      })
      .catch(err => {
        console.log(err);
        return err.response.data
      })
    },
    logout(context) {
      localStorage.removeItem('access_token')
      context.commit('IS_LOGOUT')
    },
    getProducts(context) {
      return axios({
        method: "GET",
        url: "http://localhost:3000/products",
        headers: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1ZGkyQG1haWwuY29tIiwiaWQiOjIsImlhdCI6MTYwMDQyNzA5Mn0.qFyj-gsiyiVrFhaARjQAZW5QJ2Rhp8l2yo5RmiHKqyk'
        }
      })
      .then(({data}) => {
          console.log('axios get');
          console.log(data);
          context.commit('GET_PRODUCTS', data)
      })
      .catch(err => {
        console.log(err);
      })
    },
    addProducts(context,payload) {
      // console.log(payload);
      return axios({
        method: "POST",
        url: "http://localhost:3000/products",
        headers: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1ZGkyQG1haWwuY29tIiwiaWQiOjIsImlhdCI6MTYwMDQyNzA5Mn0.qFyj-gsiyiVrFhaARjQAZW5QJ2Rhp8l2yo5RmiHKqyk'
        },
        data: {
          name: payload.name,
          price: payload.price,
          stock: payload.stock,
          image_url: payload.image_url
        }
      })
      .then(({data}) => {
          console.log('axios post add');
          console.log(data);
          // context.commit('ADD_PRODUCTS', data)
          // return data
      })
      .catch(err => {
        console.log(err);
        return err.response.data
      })
    },
    editProducts(context,payload) {
      console.log(payload);
      return axios({
        method: "PUT",
        url: `http://localhost:3000/products/${payload.id}`,
        headers: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1ZGkyQG1haWwuY29tIiwiaWQiOjIsImlhdCI6MTYwMDQyNzA5Mn0.qFyj-gsiyiVrFhaARjQAZW5QJ2Rhp8l2yo5RmiHKqyk'
        },
        data: {
          name: payload.name,
          price: payload.price,
          stock: payload.stock,
          image_url: payload.image_url
        }
      })
      .then(({data}) => {
          console.log('axios edit product');
          console.log(data);
          // context.commit('ADD_PRODUCTS', data)
      })
      .catch(err => {
        console.log(err);
      })
    },
    getByIdProducts(context,payload) {
      console.log(payload);
      return axios({
        method: "GET",
        url: `http://localhost:3000/products/${payload}`,
        headers: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1ZGkyQG1haWwuY29tIiwiaWQiOjIsImlhdCI6MTYwMDQyNzA5Mn0.qFyj-gsiyiVrFhaARjQAZW5QJ2Rhp8l2yo5RmiHKqyk'
        },
        data: {
          name: payload.name,
          price: payload.price,
          stock: payload.stock,
          image_url: payload.image_url
        }
      })
      .then(({data}) => {
          console.log('axios get by id');
          console.log(data);
          context.commit('GET_BY_ID_PRODUCTS', data)
      })
      .catch(err => {
        console.log(err);
      })
    },
    deleteProduct(context,payload) {
      console.log(payload);
      return axios({
        method: "DELETE",
        url: `http://localhost:3000/products/${payload}`,
        headers: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1ZGkyQG1haWwuY29tIiwiaWQiOjIsImlhdCI6MTYwMDQyNzA5Mn0.qFyj-gsiyiVrFhaARjQAZW5QJ2Rhp8l2yo5RmiHKqyk'
        }
      })
      .then(({data}) => {
          console.log('axios delete');
          console.log(data);
          // context.commit('GET_BY_ID_PRODUCTS', data)
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  modules: {
  }
})
