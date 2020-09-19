import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddProduct from '../views/AddProduct'
import Login from '../views/Login'
import EditProduct from '../views/EditProduct'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/products',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/products/:id',
    name: 'EditProduct',
    component: EditProduct
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.getItem('access_token')) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login' && localStorage.getItem('access_token')) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
