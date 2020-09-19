import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import AddProduct from '../components/FormAddProduct.vue'
import EditProduct from '../components/FormEditProduct.vue'
import store from '../store'

Vue.use(VueRouter)
const { state } = store
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/addProduct',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/editProduct',
    name: 'EditProduct',
    component: EditProduct
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

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !state.isLogin) next({ name: 'Login' })
  // if the user is not authenticated, `next` is called twice
  next()
})

export default router
