import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    role: localStorage.getItem('role'),
    name: localStorage.getItem('user'),
    allProduct: [],
    oneProduct: [],
    landing: false
  },
  mutations: {
    changeLogin (state, status) {
      state.isLogin = status
    },
    setRole (state, role) {
      state.role = role
    },
    setName (state, name) {
      state.name = name
    },
    setAllProduct (state, products) {
      state.allProduct = products
    },
    setOneProduct (state, oneProduct) {
      state.oneProduct = oneProduct
    },
    setLanding (state, landing) {
      state.landing = landing
    }

  },
  actions: {
    login (context, form) {
      console.log(form, 'HIT')
      const data = {
        email: form.email,
        password: form.password
      }
      axios
        .post('/login', data)
        .then(({ data }) => {
          console.log(data.access_token)
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('role', data.role)
          localStorage.setItem('user', data.name)
          console.log(context)
          context.commit('changeLogin', true)
          context.commit('setRole', data.role)
          context.commit('setName', data.name)
          console.log(this.state.isLogin, this.state.role, this.state.name, '<<<<<<<')

          if (data.role === 'admin') {
            router.push('/')
          }
        })
    },
    getProduct (context) {
      axios
        .get('/products', {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          console.log(data)
          context.commit('setAllProduct', data)
          context.commit('setLanding', true)
        })
    },
    addProduct (context, input) {
      const data = {
        name: input.name,
        image_url: input.image_url,
        price: input.price,
        stock: input.stock
      }
      axios
        .post('/products', data, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          console.log(data)
          if (data) {
            router.push('/products')
          }
        })
    },
    getOne (context, id) {
      console.log(id, 'GET')
      axios
        .get(`/products/${id}`, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          console.log(data)
          context.commit('setOneProduct', data)
        })
    },
    updateProduct (context, update) {
      const id = update.id
      const data = {
        name: update.name,
        image_url: update.image_url,
        price: update.price,
        stock: update.stock
      }
      axios
        .put(`/products/${id}`, data, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          if (data) {
            router.push('/products')
          }
        })
    },
    deleteProduct (context, id) {
      console.log('HIT')
      axios
        .delete(`/products/${id}`, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          console.log('deleted')
          router.push('/products')
        })
    },
    getBanner (context) {
      axios
        .get('/banners', {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          console.log(data)
          context.commit('setAllProduct', data)
        })
    },
    addBanner (context, input) {
      const data = {
        title: input.title,
        status: input.status,
        image_url: input.image_url
      }
      axios
        .post('/banners', data, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          console.log(data)
          if (data) {
            router.push('/banners')
          }
        })
    },
    getOneBanner (context, id) {
      console.log(id, 'GET BANNER')
      axios
        .get(`/banners/${id}`, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          console.log(data)
          context.commit('setOneProduct', data)
        })
    },
    updateBanner (context, update) {
      const id = update.id
      const data = {
        title: update.title,
        status: update.status,
        image_url: update.image_url
      }
      axios
        .put(`/banners/${id}`, data, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          if (data) {
            router.push('/banners')
          }
        })
    },
    deleteBanner (context, id) {
      console.log('HIT')
      axios
        .delete(`/banners/${id}`, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          console.log('deleted')
          router.push('/banners')
        })
    }
  },
  modules: {
  }
})
