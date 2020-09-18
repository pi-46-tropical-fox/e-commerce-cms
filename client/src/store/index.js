import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    array: [1,2,3,4,5]
  },
  mutations: {
  },
  actions: {
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
          console.log(data)
          localStorage.setItem('access_token', data.access_token)
          router.push({name: 'Home'})
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  modules: {
  }
})
