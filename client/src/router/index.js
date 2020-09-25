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
        path: '/add',
        name: 'add-Product',
        component: () => import('../components/addForm.vue')
      },
      {
        path: '/edit/:id',
        name: 'edit-Product',
        component: () => import('../components/editForm.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login.vue')
  },
  {
    path: '/checkout'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !localStorage.getItem('access_token')) {
    next({ name: 'login' })
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login' && localStorage.getItem('access_token')) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
