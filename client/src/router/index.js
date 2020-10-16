import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home'

import HomePage from '../views/HomePage'
import LoginPage from '../views/LoginPage'
import ProductPage from '../views/ProductPage'
import AddPage from '../components/AddPage'
import OneProductPage from '../components/OneProductPage'

// import OneProduct from '../components/OneProduct'

import BannerPage from '../views/BannerPage'
import AddBannerPage from '../components/AddBannerPage'
import OneBannerPage from '../components/OneBannerPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/products',
    name: 'ProductPage',
    component: ProductPage
  },
  {
    path: '/products/add',
    name: 'AddPage',
    component: AddPage
  },
  {
    path: '/products/:product_id',
    name: 'OneProductPage',
    component: OneProductPage
  },
  {
    path: '/banners',
    name: 'BannerPage',
    component: BannerPage
  },
  {
    path: '/banners/add',
    name: 'AddBannerPage',
    component: AddBannerPage
  },
  {
    path: '/banners/:banner_id',
    name: 'OneBannerPage',
    component: OneBannerPage
  }
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: About
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
