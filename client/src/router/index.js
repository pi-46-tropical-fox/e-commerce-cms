import Vue from 'vue';
import VueRouter from 'vue-router';
import AdminLogin from '../views/AdminLogin.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import AddProduct from '../components/admin/AddProduct.vue';
// import store from '../store/index'

Vue.use(VueRouter);

const routes = [
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
    beforeEnter: (to, from, next) => {
      let token = localStorage.getItem('access_token')
      if (token) {
        next({path:'/admin/dashboard'});
      } else{
        next();
      };
    },
  },
  {
    path: '/admin/dashboard',
    name: 'About',
    component: AdminDashboard,
    beforeEnter: (to, from, next) => {
      let token = localStorage.getItem('access_token')
      if (token) {
        next();
      } else{
        next({
          path: '/admin/login'
        });
      };
    },
    children:[
      {
        path:'add',
        component: AddProduct,
        beforeEnter:(to,from,next)=>{
          if(localStorage.getItem('access_token')){
            next()
          }else{
            next({path:'/admin/login'})
          }
        }
      }
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
