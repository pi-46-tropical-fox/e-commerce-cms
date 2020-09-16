import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Fruits from '../views/Fruits.vue'
import Vegetables from '../views/Vegetables.vue'
import Foodies from '../components/Foodies.vue'
import Cakes from '../components/Cakes.vue'
import EditForm from '../views/EditForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
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
    path: '/fruits',
    name: 'Fruits',
    component: Fruits,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/products/:id',
    name: 'EditForm',
    component: EditForm,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/vegetables/:id',
    name: 'Vegetables',
    component: Vegetables,
    children: [
      {
        path: '',
        component: Foodies
      },
      {
        path: 'foodies',
        component: Foodies
      },
      {
        path: 'cakes',
        component: Cakes
      }
      // ,
      // {
      //   path: '*', //kalau ga ada
      //   component: NotFound
      // }
    ]
  }
  // ,
  // { //ini global
  //   path: '*', //kalau ga ada
  //   component: NotFound
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
