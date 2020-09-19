import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Add from '../views/Add.vue'
import Edit from '../views/Edit.vue'
import Login from '../views/Login.vue'

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
    path: '/add',
    name: 'Add',
    component: Add
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit
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


// LOGIN Validation
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.getItem('access_token')) next({ name: 'Login' })
  else next()
})

export default router
