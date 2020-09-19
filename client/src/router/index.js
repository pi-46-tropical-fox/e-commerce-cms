import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import AddProduct from '../views/AddProduct'
import EditProduct from '../views/EditProduct'
import Banner from '../views/Banner.vue'
import AddBanner from '../views/AddBanner.vue'
import EditBanner from '../views/EditBanner.vue'
import CustomerRegister from '../views/CustomerRegister'
import CustomerSite from '../views/CustomerSite'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/addProduct',
    name: 'AddProduct',
    component: AddProduct,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/editProduct/:id',
    name: 'EditProduct',
    component: EditProduct,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/banner',
    name: 'Banner',
    component: Banner,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/addBanner',
    name: 'AddBanner',
    component: AddBanner,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/editBanner/:id',
    name: 'EditBanner',
    component: EditBanner,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/customerRegister',
    name: 'CustomerRegister',
    component: CustomerRegister
  },
  {
    path: '/customerSite',
    name: 'CustomerSite',
    component: CustomerSite
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
