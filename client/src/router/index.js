import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import NotFound from '../views/NotFound.vue'
import Product from '../views/Product.vue'
import AddProduct from '../views/AddProduct.vue'

import Logout from '../views/Logout.vue'

import store from '../store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: (to, from, next) => {
            if(store.state.access_token){
                next('/dashboard')
            } else {
                next()
            }
        }
    },
    {
        path : '/',
        name: 'Dashboard',
        component: Dashboard,
        meta : {
            requiresAuth : true
        }
    },
    {
        path : '/notfound',
        name : 'NotFound',
        component: NotFound
    },
    {
        path: '/logout',
        name : 'Logout',
        component: Logout
    },
    {
        path: '/product/add',
        name: 'AddProduct',
        component: AddProduct,
        meta : {
            requiresAuth : true
        }
    },
    {
        path: '/product/:id',
        name: 'Product',
        component: Product,
        meta : {
            requiresAuth : true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)){
        if(!store.state.access_token){
            next({
                path: '/login',
                query: { redirect : to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
