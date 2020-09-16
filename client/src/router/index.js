import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Product from '../views/Product.vue'
import AddProduct from '../components/AddProduct.vue'
import ProductDetails from '../views/ProductDetails.vue'
import EditProduct from '../components/EditProduct.vue'
import Banner from '../views/Banner.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'NotFound',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/products',
    name: 'Product',
    component: Product,
    children: [
      {
        path: 'add',
        name: 'AddProduct',
        component: AddProduct
      }
    ]
  },
  {
    path: '/banners',
    name: 'Banner',
    component: Banner
  },
  {
    path: '/details/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    children: [
      {
        path: 'edit',
        name: 'EditProduct',
        component: EditProduct
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
  if (to.name !== 'Login' && !localStorage.access_token) {
    next({ name: 'Login' })
  } else if (localStorage.access_token && to.name === 'Login') {
    next({ name: 'Product' })
  } else {
    next()
  }
})

export default router
