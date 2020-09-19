import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'homecontent',
        name: 'Homecontent',
        component: () => import('../components/Home-content.vue'),
        children: [
          {
            path: 'moviescard',
            name: "Moviescard",
            component: () => import('../components/Movies-card.vue')
          }
        ]
      },
      {
        path: '/add',
        name: 'AddProd',
        component: () => import('../components/Add-product.vue')
      },
      {
        path: '/edit/:id',
        name: 'Edit',
        component: () => import('../components/Edit-product.vue')
      },
      {
        path: '/editbanner/:id',
        name: 'EditBanner',
        component: () => import('../components/Edit-banner.vue')
      },
      {
        path: '/banner',
        name: 'Banner',
        component: () => import('../components/Banner-content.vue'),
        children: [
          {
            path: 'bannerscard',
            name: "Bannerscard",
            component: () => import('../components/Banners-card.vue')
          }
        ]
      },
      {
        path: '/add',
        name: 'AddBanner',
        component: () => import('../components/Add-banner.vue')
      },
    ]
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

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.getItem('access_token')) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
