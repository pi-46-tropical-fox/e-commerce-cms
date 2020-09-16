import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    productById: {}
  },
  mutations: {
    GET_PRODUCTS(state,payload) {
      state.products = payload
    },
    GET_BY_ID_PRODUCTS(state,payload) {
      state.productById = payload
    }
  },
  actions: {
    getProducts(context) {
      axios({
        method: "GET",
        url: "http://localhost:3000/products",
        headers: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1ZGkyQG1haWwuY29tIiwiaWQiOjIsImlhdCI6MTYwMDI1MDg2N30.i9wEVZZ83UqoMh0ube06rsCSqjTEvIFkPB1hJDEVZ94'
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
      axios({
        method: "POST",
        url: "http://localhost:3000/products",
        headers: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1ZGkyQG1haWwuY29tIiwiaWQiOjIsImlhdCI6MTYwMDI1MDg2N30.i9wEVZZ83UqoMh0ube06rsCSqjTEvIFkPB1hJDEVZ94'
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
      })
      .catch(err => {
        console.log(err);
      })
    },
    editProducts(context,payload) {
      console.log(payload);
      axios({
        method: "PUT",
        url: `http://localhost:3000/products/${payload.id}`,
        headers: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1ZGkyQG1haWwuY29tIiwiaWQiOjIsImlhdCI6MTYwMDI1MDg2N30.i9wEVZZ83UqoMh0ube06rsCSqjTEvIFkPB1hJDEVZ94'
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
      axios({
        method: "GET",
        url: `http://localhost:3000/products/${payload}`,
        headers: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1ZGkyQG1haWwuY29tIiwiaWQiOjIsImlhdCI6MTYwMDI1MDg2N30.i9wEVZZ83UqoMh0ube06rsCSqjTEvIFkPB1hJDEVZ94'
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
      axios({
        method: "DELETE",
        url: `http://localhost:3000/products/${payload}`,
        headers: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1ZGkyQG1haWwuY29tIiwiaWQiOjIsImlhdCI6MTYwMDI1MDg2N30.i9wEVZZ83UqoMh0ube06rsCSqjTEvIFkPB1hJDEVZ94'
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
