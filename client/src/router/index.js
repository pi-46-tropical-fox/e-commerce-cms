import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AddProduct from '../components/addProduct.vue'
import EditProduct from '../components/editProduct.vue'
import ProductGroup from '../components/ProductGroup.vue'
import AddCategory from '../components/addCategory'
import Dashboard from '../views/dashboard.vue'
import BannerGroup from '../components/bannerGroup.vue'
import AddBanner from '../components/addBanner.vue'
import EditBanner from '../components/editBanner.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/Login')
      }
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: ProductGroup
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
        path: 'ProductGroup',
        name: 'ProductGroup',
        component: ProductGroup
      },
      {
        path: 'addCategory',
        name: 'addCategory',
        component: AddCategory
      },
      {
        path: 'bannerGroup',
        name: 'bannerGroup',
        component: BannerGroup
      },
      {
        path: 'addBanner',
        name: 'addBanner',
        component: AddBanner
      },
      {
        path: 'editBanner/:id',
        name: 'editBanner',
        component: EditBanner
      }
    ]
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next('/Home')
      } else {
        next()
      }
    }
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next('/Home')
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
