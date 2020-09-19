import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DetailProduct from '../components/DetailProduct.vue'
import AddProduct from '../views/AddProduct.vue'
import Login from '../views/Login.vue'
import Edit from '../views/EditProduct.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product',
    name: 'Product',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Product.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/product/:id',
    name: 'Detail Product',
    component: DetailProduct,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('role') === 'admin') {
        next()
      } else {
        next('/product')
      }
    }
  },
  {
    path: '/add',
    name: 'Add Product',
    component: AddProduct,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('role') === 'admin') {
        next()
      } else {
        next('/product')
      }
    }
  },
  {
    path: '/edit-product/:id',
    name: 'Edit Product',
    component: Edit,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('role') === 'admin') {
        next()
      } else {
        next('/product')
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
