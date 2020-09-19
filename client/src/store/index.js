import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productData: {},
    detailProduct: {}
  },
  getters: {},
  mutations: {
    setProduct(state, data) {
      state.productData = data;
    },
    addProduct(state, data) {
      state.productData.data.push(data)
    },
    detailedProduct(state, data) {
      state.detailProduct = data
    }
  },
  actions: {
    loginPost(context, credential) {
      return new Promise((resolve, rejects) => {
        axios({
          method: "post",
          url: "https://ardy-cms.herokuapp.com/auth/login",
          data: credential
        })
          .then(res => {
            const token = res.data.access_token;

            localStorage.setItem("access_token", token);
            resolve(res);
          })
          .catch(err => {
            localStorage.removeItem("access_token");
            rejects(err);
          });
      });
    },
    getProduct(context) {
      axios({
        method: "get",
        url: "https://ardy-cms.herokuapp.com/product",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(res => {
          context.commit("setProduct", res.data);
        })
        .catch(err => {
          Vue.swal({
            icon: "error",
            title: "Oops...",
            text: err.response.data.errors,
          });
        });
    },
    deleteProduct(context, id) {
      return new Promise((resolve, rejects) => {
        axios({
          method: "delete",
          url: `https://ardy-cms.herokuapp.com/product/${id}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            rejects(err)
          });
      })
    },
    addProduct(context, payload) {
      return new Promise((resolve, rejects) => {
        axios({
          method: "post",
          url: `https://ardy-cms.herokuapp.com/product`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: payload
        })
          .then(res => {
            context.commit('addProduct', res.data.data)
            resolve(res)
          })
          .catch(err => {
            rejects(err)
          });
      })
    },
    getDetailProduct(context, id) {
      return new Promise((resolve, rejects) => {
        axios({
          method: "get",
          url: `https://ardy-cms.herokuapp.com/product/${id}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
        })
          .then(res => {
            context.commit('detailedProduct', res.data)
            resolve(res)
          })
          .catch(err => {
            rejects(err)
          });
      })
    },
    updateProduct(context, data) {
      return new Promise((resolve, rejects) => {
        axios({
          method: "put",
          url: `https://ardy-cms.herokuapp.com/product/${data.id}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: data
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            rejects(err)
          });
      })
    }
  },
  modules: {}
});
