import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import EditProductForm from '../components/EditProductForm.vue'
import CreateProductForm from '../components/CreateProductForm.vue'
import Banners from '../views/Banners.vue'
import EditBannerForm from '../components/EditBannerForm.vue'

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
    path: '/banners',
    name: 'Banners',
    component: Banners,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/banners/:id',
    name: 'EditBannerForm',
    component: EditBannerForm,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/')
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
    path: '/products/:id',
    name: 'EditProductForm',
    component: EditProductForm,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/products',
    name: 'CreateProductForm',
    component: CreateProductForm,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/')
      }
    }
  },
  // {
  //   path: '/vegetables/:id',
  //   name: 'Vegetables',
  //   component: Vegetables,
  //   children: [
  //     {
  //       path: '',
  //       component: Foodies
  //     },
  //     {
  //       path: 'foodies',
  //       component: Foodies
  //     },
  //     {
  //       path: 'cakes',
  //       component: Cakes
  //     }
      // ,
      // {
      //   path: '*', //kalau ga ada
      //   component: NotFound
      // }
  //   ]
  // }
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
