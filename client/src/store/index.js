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

                router.push('/dashboard')
            }).catch(e => {
                Vue.swal.fire('Error', e.data)
            })
        },
        logout({state}){
            state.access_token = undefined
            localStorage.clear()
        },
        fetchProducts({state}){
            axios.get('/products', { headers : { access_token : state.access_token }}).then(e => {
                console.log(e)
            })
        },
        createProduct({state}, data){
            axios.post('/products', data, { headers : { access_token : state.access_token } }).then(res => {
                router.push(`/products/${res.data.id}`)
            })
        }
    },
    modules: {
    }
})
