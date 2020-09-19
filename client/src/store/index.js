import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
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
    fetchItems (context) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/products',
        headers: {
          //  nanti ganti ke state
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgzLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAwNDQxMjk4fQ.iGUEY-GjlD0PzolHdij8KclWtfVeBJX41D4XIC17ImA'
        }
      })
        .then(({ data }) => {
          // console.log(data)
          context.commit('setItemData', data)
        })
        .catch(({ error }) => {
          console.log(error)
        })
    },

    fetchCategories (context) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/categories',
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgzLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAwNDQxMjk4fQ.iGUEY-GjlD0PzolHdij8KclWtfVeBJX41D4XIC17ImA'
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
        methods: 'POST',
        url: 'http://localhost:3000/users/login',
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    editData (context, payload){
      axios({
        method: 'PUT',
        url: `http://localhost:3000/products/${payload.id}`,
        headers: {
          //  nanti ganti ke state
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgzLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAwNDQxMjk4fQ.iGUEY-GjlD0PzolHdij8KclWtfVeBJX41D4XIC17ImA'
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
        url: `http://localhost:3000/products/${payload.id}`,
        headers: {
          //  nanti ganti ke state
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgzLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAwNDQxMjk4fQ.iGUEY-GjlD0PzolHdij8KclWtfVeBJX41D4XIC17ImA'
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
        url: `http://localhost:3000/products/`,
        headers: {
          //  nanti ganti ke state
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgzLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAwNDQxMjk4fQ.iGUEY-GjlD0PzolHdij8KclWtfVeBJX41D4XIC17ImA'
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
    }
  },
  modules: {
  }
})
