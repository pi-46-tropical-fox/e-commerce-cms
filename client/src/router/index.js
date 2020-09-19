import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import FormProduct from '../views/FormProduct.vue'
import FormBanner from '../views/FormBanner.vue'
import ProductTable from '../views/ProductTable.vue'
import BannerTable from '../views/BannerTable.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'products',
        name: 'ProductTable',
        component: ProductTable
      },
      {
        path: 'banners',
        name: 'BannerTable',
        component: BannerTable
      },
      {
        path: 'products/form',
        name: 'FormProduct',
        component: FormProduct
      },
      {
        path: 'banners/form',
        name: 'FormBanner',
        component: FormBanner
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.access_token) next({ name: 'Login' })
  else next()
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login' && localStorage.access_token) next({ name: 'ProductTable' })
  else next()
})

export default router
