import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
      },
      {
        path: '/',
        name: 'Cards',
        component: () => import('../components/cards.vue')
      },
      {
        path: '/products',
        name: 'addProducts',
        component: () => import('../components/addProduct.vue')
      },
      {
        path: '/products/:id',
        name: 'Product',
        component: () => import('../components/product.vue')
      },
      {
        path: '/products/edit/:id',
        name: 'Edit Product',
        component: () => import('../components/editProduct.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: ''
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !localStorage.getItem('access_token'))next({ name: 'login' })
  else next()
})
router.beforeEach((to, from, next) => {
  if (to.name === 'login' && localStorage.getItem('access_token'))next({ name: 'Home' })
  else next()
})

export default router
