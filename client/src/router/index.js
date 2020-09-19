import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import FormEdit from '../components/formEdit'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    name: 'Edit Products',
    path: '/products/:productId',
    component: FormEdit,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
    beforeEnter: (to, from, next) => {
      console.log(from)
      if (localStorage.getItem('access_token')) {
        next({path: from.path})
      } else {
        next()
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
