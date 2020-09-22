import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import axios from "../config/axios"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    itemsData: [],
    categoriesData: [],
    onDisplayData: null
  },
  mutations: {
    setItemData (state, payload) {
      console.log(payload)
      state.itemsData = payload
    },

    setCategoriesData (state, payload) {
      state.categoriesData = payload
    },

    setOnDisplayData (state, payload) {
      state.onDisplayData = payload
    }
  },
  actions: {
    fetchItems (context, payload) {
      console.log('masuk', payload);
      let id = payload.id
      const category = context.state.categoriesData.filter(category => {
        return category.id === Number(id)
      })
      context.commit('setItemData', category[0].Products)
    },

    fetchCategories (context) {
      axios({
        method: 'GET',
        url: './categories',
        headers: {
          access_token: localStorage.access_token
        
        }
      })
        .then(({ data }) => {
          context.commit('setCategoriesData', data)
        })
        .catch(({ err }) => {
          console.log(err)
        })
    },

    login (context, payload) {
      axios({
        method: 'POST',
        url: './users/login',
        data: payload
      })
        .then(({ data }) => {
          // console.log(data)
          localStorage.access_token = data.access_token
        })
        .catch(err => {
          console.log(err)
        })
    },

    editData (context, payload){
      axios({
        method: 'PUT',
        url: `./products/${payload.id}`,
        headers: {
          //  nanti ganti ke state
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(({data}) => {
          console.log("berhasil")
          context.dispatch('fetchCategories')
        })
        .catch(err => {
          console.log(err)
        })
    },

    deleteItem (context, payload){
      axios({
        method: 'DELETE',
        url: `./products/${payload.id}`,
        headers: {
          //  nanti ganti ke state
          access_token: localStorage.access_token
          
        },
      })
        .then(({data}) => {
          console.log("berhasil")
          context.dispatch('fetchCategories')
        })
        .catch(err => {
          console.log(err)
        })
    },

    addItem (context, payload){
      axios({
        method: 'POST',
        url: `./products/`,
        headers: {
          //  nanti ganti ke state
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(({data}) => {
          console.log("berhasil")
          context.dispatch('fetchCategories')
        })
        .catch(err => {
          console.log(err)
        })
    },

    addCategory(context, payload){
      let {name} = payload
      axios({
        method: 'post',
        url: "./categories/",
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(({data}) => {
          context.dispatch('fetchCategories')
        })
        .catch(err => {
          console.log(err)
        })
    },

    deleteCategory(context, payload){
      let {id} = payload
      axios({
        method: 'delete',
        url: `./categories/${id}`,
        headers: {
          access_token: localStorage.access_token
        },
      })
        .then(({data}) => {
          context.dispatch('fetchCategories')
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  modules: {
  }
})
