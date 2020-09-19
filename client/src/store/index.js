import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    products: {},
    categories: []
  },
  mutations: {
    changeLogged (state) {
      if (localStorage.getItem('access_token')) {
        state.isLoggedIn = true
      } else {
        state.isLoggedIn = false
      }
    },
    setProducts (state, data) {
      console.log('ye')
      state.products = data
      state.categories = Object.keys(data)
    }
  },
  actions: {
    login (context, data) {
      axios({
        method: 'POST',
        url: '/login',
        data: {
          email: data.email,
          password: data.password
        }
      }).then(res => {
        localStorage.setItem('access_token', res.data.access_token)
        context.commit('changeLogged')
        context.dispatch('getProducts')
      }).catch(err => {
        console.log(err)
        router.push('/login')
      })
    },
    logout (context) {
      localStorage.clear()
      router.push('/')
      context.commit('changeLogged')
    },
    getProducts (context) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(res => {
        context.commit('setProducts', res.data.products)
        router.push('/products')
      }).catch(err => {
        console.log(err)
      })
    },
    addProduct (context, data) {
      axios({
        method: 'POST',
        url: '/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          name: data.name,
          image_url: data.image_url,
          price: Number(data.price),
          stock: Number(data.stock),
          category: this.state.categories.findIndex(category => category === data.category) + 1
        }
      }).then(res => {
        context.dispatch('getProducts')
      }).catch(err => {
        console.log(err)
      })
    },
    deleteProduct (context, id) {
      axios({
        method: 'DELETE',
        url: `/products/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(res => {
        context.dispatch('getProducts')
      }).catch(err => {
        console.log(err)
      })
    },
    editProduct (context, data) {
      console.log(data.payload);
      // axios({
      //   method: 'PATCH',
      //   url: `/products/${data.id}`,
      //   headers: {
      //     access_token: localStorage.getItem('access_token')
      //   },
      //   data: payload
      // }).then(res => {

      // })
    }
  }
})
