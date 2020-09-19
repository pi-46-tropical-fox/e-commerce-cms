import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        access_token : localStorage.getItem('access_token'),
        products : []
    },
    mutations: {
        
    },
    actions: {
        login({state}, data){
            console.log(data)
            axios.post('/user/login', data).then(res => {
                localStorage.setItem('access_token', res.data.access_token)
                state.access_token = res.data.access_token

                router.push('/')
            }).catch(e => {
                Vue.swal.fire(
                    {icon : 'Error', title : 'Email/Password salah'})
            })
        },
        logout({state}){
            state.access_token = undefined
            localStorage.clear()
        },
        fetchProducts({state}){
            axios.get('/products', { headers : { access_token : state.access_token }}).then(e => {
                state.products = e.data
            })
        },
        updateById({state}, data){
            return new Promise((res, rej) => {
                axios.put(`/products/${data.id}`, data, { headers : { access_token : state.access_token }}).then(response => {
                    res(response)
                }).catch(err => {
                    rej(err)
                })
            })
        },
        delete({state}, id){
            return new Promise((res, rej) => {
                axios.delete(`/products/${id}`, { headers : { access_token : state.access_token }}).then(response => {
                    res(response)
                }).catch(e => {
                    rej(e)
                })
            })
        },
        fetchProductById({state}, id){
            return new Promise((res, rej) => {
                axios.get(`/products/${id}`, { headers : { access_token : state.access_token }}).then(response => {
                    res(response)
                }).catch(err => {
                    rej(err)
                })
            })
        },
        createProduct({state}, data){
            axios.post('/products', data, { headers : { access_token : state.access_token } }).then(res => {
                router.push(`/`)
            })
        }
    },
    modules: {
    }
})
