import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(axios);
Vue.use(Vuex);
// https://sleepy-woodland-73566.herokuapp.com/

export default new Vuex.Store({
  state: {
    token:'',
    products:[]
  },
  mutations: {
    fillToken(state,payload){
      state.token = payload;
      state.isLogin = true;
    },
    fillData(state,payload){
      state.products = payload
    },
    DeleteData(state,payload){
      state.products = state.products.filter(product => product.id !== payload.id)
    },
    AddData(state,payload){
      state.products.push(payload)
    },
    EditData(state,payload){
      // state.products.map(el=>{
      //   if(el.id == payload.id){
      //     el.name = payload.name;
      //     el.image_url = payload.image_url;
      //     el.price = payload.price;
      //     el.stock = payload.stock;
      //     el.category = payload.category;
      //     el.description = payload.description;
      //     return el
      //   }
      // })
      let index = state.products.findIndex(x => x.id == payload.id)
      state.products.splice(index,1,payload)
    }
  },
  actions: {
    getData({commit}){
      axios({
        method:'get',
        url:'https://sleepy-woodland-73566.herokuapp.com/admin/products',
      })
      .then(response=>{
        commit('fillData',response.data);
      })
      .catch(err=>{
        console.log(err.response);
      })
    },
    deleteData({commit},payload){
      axios({
        method: 'delete',
        url:`https://sleepy-woodland-73566.herokuapp.com/admin/products/${payload.id}`,
        headers:{
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(response=>{
        commit('DeleteData',payload)
      })
      .catch(err=>{
        console.log(err.response)
      })
    },
    addData({commit},payload){
      axios({
        method: 'post',
        url: `https://sleepy-woodland-73566.herokuapp.com/admin/products`,
        data:payload,
        headers:{
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(response=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Data with name ${response.data.name} successfully created`,
          showConfirmButton: false,
          timer: 1000
        });
        commit('AddData',response.data)
      })
      .catch(err=>{
        Swal.fire({
          position: "center",
          icon: "warning",
          title: `${err.response.data.message}`,
          showConfirmButton: true,
        });
      })
    },
    editData({commit}, payload){
      axios({
        method:'put',
        url: `https://sleepy-woodland-73566.herokuapp.com/admin/products/${payload.id}`,
        data: payload,
        headers:{
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(response=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Data with name ${response.data.name} successfully edited`,
          showConfirmButton: false,
          timer: 1000
        });
        commit('EditData',response.data)
      })
      .catch(err=>{
        Swal.fire({
          position: "center",
          icon: "warning",
          title: `Value can not be empty`,
          showConfirmButton: true,
        });
      })
    }
  },
  modules: {

  },
});
