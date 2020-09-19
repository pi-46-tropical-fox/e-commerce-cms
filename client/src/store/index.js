import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    // fetch products
    setProducts (state, payload) {
      state.products = payload
    }
  },
  actions: {
    // action untuk login
    login (context, payload) {
      const {email, password} = payload

      axios({
        method: 'post',
        url: '/login',
        data: {
          email,password
        }
      })
        .then(({data}) => {
          // console.log(data)
          localStorage.setItem('access_token', data.access_token)
          router.push({name: 'Home'})
        })
        .catch(err => {
          console.log(err);
        })
    },
    // action untuk fetch data
    fetchProducts ({commit}) {
      // context.commit => distruct {commit}
      axios({
        method: 'get',
        url: '/products',
        headers: {
          access_token:localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data, '<<< ini data dari store')
          // this.products = data
          // sebelum dimasukan kedalam state panggil dulu mutation (commit)
          commit('setProducts', data)
        })
        .catch(err => {
          console.log(err.response, '<<< ini error fetchdata store')
        })
    }
  },
  modules: {
  }
})
