import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '@/views/Auth'
import FilteredProducts from '@/views/FilteredProducts'
import Product from '../views/Product'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/',
    name: 'Auth',
    component: Auth,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('access_token')) {
        next()
      } else {
        next('/home')
      }
    }
  },
  {
    path: '/category/:category',
    name: 'Filtered',
    component: FilteredProducts,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/')
      }
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
