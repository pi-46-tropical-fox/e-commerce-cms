import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: '',
    editMovieData: '',
    editBannerData: '',
    banners: ''
  },
  mutations: {
    setMovies(state, payload){
      state.movies = payload
    },
    setBanners(state, payload){
      state.banners = payload
    },
    setEditMovieData(state, payload){
      state.editMovieData = payload
    },
    setEditBannerData(state, payload){
      state.editBannerData = payload
    }
  },
  actions: {
    login({commit}, payload){
      axios
        .post(`/login`, payload)
        .then(({data}) => {
          localStorage.setItem("access_token", data.access_token)
          router.push({ name: 'Moviescard' })
        })
        .catch(err => {
          console.log(err)
        })
    },

    fecthMovies({commit}) {
      axios
        .get('/products', {
          headers:
            {
              access_token: localStorage.getItem("access_token")
            }
        })
        .then(({data}) => {
          commit("setMovies", data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    addMovie({commit}, payload){
      axios
        .post('/products', payload, {
          headers:{
              access_token: localStorage.getItem("access_token")
            }
        })
        .then(({ data }) => {
          router.push({ name: "Moviescard" })
        })
        .catch(err => {
          console.log(err)
        })
    },

    findOne({commit}, id){
      axios
        .get(`/products/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({ data }) => {
          commit("setEditMovieData", data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    edit({commit}, payload){
      axios({
        method: "PUT",
        url: `/products/${payload.id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data : payload
      })
      .then(() => {
          router.push({ name: "Moviescard" })
      })
      .catch(err => {
          console.log(err)
      })
    },

    deleteItem({commit}, id){
      axios
        .delete(`/products/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({ data }) => {
          this.dispatch('fecthMovies')
        })
        .catch(err => {
          console.log(err)
        })
    },

    // Banners
    fecthBanners({commit}) {
      axios
        .get('/banners', {
          headers:
            {
              access_token: localStorage.getItem("access_token")
            }
        })
        .then(({data}) => {
          commit("setBanners", data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    addBanner({commit}, payload){
      axios
        .post('/banners', payload, {
          headers:{
              access_token: localStorage.getItem("access_token")
            }
        })
        .then(({ data }) => {
          router.push({ name: "Bannerscard" })
        })
        .catch(err => {
          console.log(err)
        })
    },

    findOneBanner({commit}, id){
      axios
        .get(`/banners/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({ data }) => {
          commit("setEditBannerData", data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    editBanner({commit}, payload){
      axios({
        method: "PUT",
        url: `/banners/${payload.id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data : payload
      })
      .then(() => {
          router.push({ name: "Bannerscard" })
      })
      .catch(err => {
          console.log(err)
      })
    },

    deleteBanner({commit}, id){
      axios
        .delete(`/banners/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({ data }) => {
          this.dispatch('fecthBanners')
        })
        .catch(err => {
          console.log(err)
        })
    },

    logout(){
      localStorage.clear()
      router.push({ name: "Login"})
    }
  }
})
