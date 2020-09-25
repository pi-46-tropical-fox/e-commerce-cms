import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        access_token : localStorage.getItem('access_token'),
        products : [],
        singleProduct : {}
    },
    mutations: {
        "UPDATE_ACCESS_TOKEN"(state, access_token){
            state.access_token = access_token
            localStorage.setItem('access_token', access_token)
        },
        "REMOVE_ACCESS_TOKEN"(state){
            state.access_token = ''
            localStorage.clear()
        },
        "UPDATE_PRODUCTS"(state, products){
            state.products = products
        },
        "UPDATE_PRODUCT_BY_ID"(state, product){
            const index = state.products.findIndex(e => product.id)
            state.products[index] = product
        },
        "DELETE_PRODUCT_BY_ID"(state, id){
            state.products = state.products.filter(e => e.id !== id)
        },
        "UPDATE_SINGLE_PRODUCT"(state, product){
            state.singleProduct = product
        },
        "ADD_PRODUCT"(state, product){
            state.products.push(product)
        }
    },
    actions: {
        login({commit}, data){
            axios.post('/user/login', data).then(res => {
                commit('UPDATE_ACCESS_TOKEN', res.data.access_token)

                router.push('/')
            }).catch(e => {
                Vue.swal.fire({icon : 'Error', title : 'Email/Password salah'})
            })
        },
        logout({commit}){
            commit('REMOVE_ACCESS_TOKEN')
        },
        fetchProducts({commit, state}){
            return axios.get('/products', { headers : { access_token : state.access_token }}).then(e => {
                commit('UPDATE_PRODUCTS', e.data)
            })
        },
        updateById({state, commit}, data){
            return axios.put(`/products/${data.id}`, data, { headers : { access_token : state.access_token }}).then(response => {
                commit('UPDATE_PRODUCT_BY_ID', response.data)
            })
        },
        delete({state,commit}, id){
            return axios.delete(`/products/${id}`, { headers : { access_token : state.access_token }}).then(response => {
                commit('DELETE_PRODUCT_BY_ID', id)
            })
        },
        fetchProductById({state, commit}, id){
            return axios.get(`/products/${id}`, { headers : { access_token : state.access_token }}).then(response => {
                commit('UPDATE_SINGLE_PRODUCT', response.data)
            })
        },
        createProduct({state, commit}, data){
            return axios.post('/products', data, { headers : { access_token : state.access_token } }).then(res => {
                commit('ADD_PRODUCT', res.data)
            })
        }
    },
    modules: {
    }
})
