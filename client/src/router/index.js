import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import ProductList from '../views/ProductList.vue'
import Login from '../views/Login.vue'
import AddPage from '../views/AddPage.vue'
import ItemDetail from '../views/ItemDetail.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'product-list/:id',
        name: 'ProductList',
        component: ProductList,
        children: [
          {
            path: 'add',
            name: 'AddPage',
            component: AddPage
          },
          {
            path: 'detail',
            name: 'ItemDetail',
            component: ItemDetail
          }
        ]
      }

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  if(to.name !== 'Login' && to.name !== 'Home' && !localStorage.access_token){
    next({name: 'Login'})
  } else if(to.name === 'Login' && localStorage.access_token) {
    next({name: 'Home'})
  } else {
    next()
  }
})

export default router
