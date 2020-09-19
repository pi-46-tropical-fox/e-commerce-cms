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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login.vue')
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
