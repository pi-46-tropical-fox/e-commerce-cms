import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Auth from '@/views/Auth.vue';

import Product from '@/views/Product.vue'
import ProductForm from '@/components/product/Form.vue'
import Banner from '@/views/Banner.vue'
import Category from '@/views/Category.vue'
import CategoryForm from '@/components/category/Form.vue'

Vue.use(VueRouter);

const routes = [
  // base routes
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: true
    }
  },
  {
    path: '/auth',
    name: 'Login',
    component: Auth,
    beforeEnter(to, from, next) {
      if (localStorage.getItem('access_token')) {
        next({ path: '/' })
      } else {
        next()
      }
    }
  },
  // {
  //   path: '/register',
  //   name: 'Home',
  //   component: Home,
  // },
  {
    path: '/products',
    name: 'Products',
    component: Product,
    // component: () => import(/* webpackChunkName: "product" */ '@/views/Product.vue'),
    meta: {
      auth: true
    },
    children: [
      {
        path: 'new',
        name: 'NewProduct',
        component: ProductForm,
        // component: () => import(/* webpackChunkName: "new-product" */ '@/components/product/Form.vue'),
      },
      {
        path: ':id',
        name: 'ProductDetails',
        component: () => import(/* webpackChunkName: "product-details" */ '@/components/product/Details.vue'),
      },
    ]
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import(/* webpackChunkName: "category" */ '@/views/Category.vue'),
    meta: {
      auth: true
    },
    children: [
      {
        path: 'new',
        name: 'NewCategory',
        component: CategoryForm,
        // component: () => import(/* webpackChunkName: "new-category" */ '@/components/product/Form.vue'),
      },
    ]
  },
  {
    path: '/banners',
    name: 'Banners',
    component: () => import(/* webpackChunkName: "banner" */ '@/views/Banner.vue'),
    meta: {
      auth: true
    },
    children: [
      {
        path: ':id',
        name: 'BannerDetails',
        component: () => import(/* webpackChunkName: "banner-details" */ '@/components/banner/Details.vue'),
      },
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  // },
];

const router = new VueRouter({
  routes,
  mode: 'history' // buat ngilangin '#'
});

// router.beforeEach((to, from, next) => {
//   console.log(to, from);
//   if (to.name !== 'Login' && !store.state.isAuthenticated) next({ name: 'Login' })
//   else next()
// })
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!localStorage.getItem('access_token')) {
      next({ path: '/auth' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;
