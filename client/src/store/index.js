import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data:[],
    productData:{}
  },
  mutations: {
    setData(state,data){
      this.state.data = data
    },
    setProduct(state,data){
      this.state.productData = data
    }
  },
  actions: {
    fetchData({ commit }){
      axios({
        method:'GET',
        url:'http://localhost:3001/products',
        headers:{
          access_token:localStorage.getItem('access_token')
        }
      })
      .then(({data})=>{
        commit('setData',data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    login(context,userData){
      axios({
        method:'POST',
        url:'http://localhost:3001/login',
        data:userData
      })
      .then(({data})=>{
        console.log(data.access_token)
        localStorage.setItem('access_token',data.access_token)
        router.push('/')
      })
      .catch(err=>{
        console.log(err)
      })
    },
    add(context,newProduct){
      axios({
        method:'POST',
        url:'http://localhost:3001/products',
        data:newProduct,
        headers:{
          access_token:localStorage.getItem('access_token')
        }
      })
      .then(data=>{
        router.push('/')
        this.fetchData()
      })
      .catch(err=>{
        console.log(err)
      })
    },
    getOne({commit},id){
      console.log(id,'<<<<<< ini id dari vuex')
      axios({
        method:'GET',
        url:`http://localhost:3001/products/${id}`,
        headers:{
          access_token:localStorage.getItem('access_token')
        }
      })
      .then(({data})=>{
        console.log(data)
        commit('setProduct',data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    deleteProduct({commit},id){
      axios({
        method:'DELETE',
        url:`http://localhost:3001/products/${id}`,
        headers:{
          access_token:localStorage.getItem('access_token')
        }
      })
      .then(data=>{
        router.push('/')
      })
      .catch(err=>{
        console.log(err)
      })
    },
    edit({commit},payload){
      console.log(payload)
      axios({
        method:'PUT',
        url:`http://localhost:3001/products/${payload.id}`,
        data:payload.data,
        headers:{
          access_token:localStorage.getItem('access_token')
        }
      })
      .then(({data})=>{
        console.log(`success`)
        console.log(data,"ini success")
        router.push('/')
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
})
