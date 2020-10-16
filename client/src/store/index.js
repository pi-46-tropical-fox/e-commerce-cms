import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'
import { Toast } from '../config/toaster'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    role: localStorage.getItem('role'),
    name: localStorage.getItem('user'),
    allProduct: [],
    oneProduct: [],
    updatedProduct: '',
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
    },
    setUpdatedProduct (state, updatedProduct) {
      state.updatedProduct = updatedProduct
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

          if (data.role === 'admin' || data.role === 'security') {
            router.push('/')

            Toast.fire({
              icon: 'success',
              title: `You have sign in successfully. Welcome to Bookiepedia, ${this.state.name}!`
            })
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
            context.commit('setUpdatedProduct', data.name)
            router.push('/products')
            // console.log(this.state.updatedProduct)
            Toast.fire({
              icon: 'success',
              title: `You have added "${this.state.updatedProduct}" book!`
            })
          }
        })
    },
    getOne (context, id) {
      if (this.state.role === 'admin') {
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
      } else {
        router.push('/products')
      }
    },
    updateProduct (context, update) {
      const id = update.id
      const data = {
        name: update.name,
        image_url: update.image_url,
        price: update.price,
        stock: update.stock
      }
      if (!data.image_url) {
        data.image_url = this.state.oneProduct.image_url
      }
      if (!data.name) {
        data.name = this.state.oneProduct.name
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
            context.commit('setUpdatedProduct', data.name)
            Toast.fire({
              icon: 'success',
              title: `You have updated "${this.state.updatedProduct}" book!`
            })
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
          Toast.fire({
            icon: 'success',
            title: 'You have deleted book successfully!'
          })
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
            context.commit('setUpdatedProduct', data.title)
            Toast.fire({
              icon: 'success',
              title: `You have added "${this.state.updatedProduct}" banner!`
            })
          }
        })
    },
    getOneBanner (context, id) {
      if (this.state.role === 'admin') {
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
      } else {
        router.push('/banners')
      }
    },
    updateBanner (context, update) {
      const id = update.id
      const data = {
        title: update.title,
        status: update.status,
        image_url: update.image_url
      }
      if (!data.image_url) {
        data.image_url = this.state.oneProduct.image_url
      }
      if (!data.title) {
        data.title = this.state.oneProduct.title
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
            context.commit('setUpdatedProduct', data.title)
            Toast.fire({
              icon: 'success',
              title: `You have updated "${this.state.updatedProduct}" banner!`
            })
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
          Toast.fire({
            icon: 'success',
            title: 'You have deleted banner successfully!'
          })
        })
    }
  },
  modules: {
  }
})
