import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import(/* webpackChunkName: "products" */ '../views/Products.vue')
  },
  {
    path: '/products/add',
    name: 'AddProducts',
    component: () => import(/* webpackChunkName: "products" */ '../views/AddProducts.vue')
  },
  {
    path: '/products/:id',
    name: 'EditProducts',
    component: () => import(/* webpackChunkName: "products" */ '../views/EditProducts.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Products' && !localStorage.access_token) next({ name: 'Login' })
  else if (to.name === 'AddProduct' && !localStorage.access_token) next({ name: 'Login' })
  else if (to.name === 'Login' && localStorage.access_token) next({ name: 'Products' })
  else if (to.name === 'Home' && localStorage.access_token) next({ name: 'Products' })
  else next()
})

export default router
