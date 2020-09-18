import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        fruits : ['Banana','Cherry','Pineapple','Apple']
    },
    mutations: {
        
    },
    actions: {
        login(){
            axios.get('/user/login', )
        },
        fetchFruits(){
            axios.get('/')
        }
    },
    modules: {
    }
})
