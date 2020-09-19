import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AddProduct from '../components/addProduct.vue'
import EditProduct from '../components/editProduct.vue'
import CardGroup from '../components/CardGroup.vue'
import AddCategory from '../components/addCategory'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'Home',
        component: CardGroup
      },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: AddProduct
      },
      {
        path: 'editProduct/:id',
        name: 'editProduct',
        component: EditProduct
      },
      {
        path: 'cardGroup',
        name: 'cardGroup',
        component: CardGroup
      },
      {
        path: 'addCategory',
        name: 'addCategory',
        component: AddCategory
      }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
