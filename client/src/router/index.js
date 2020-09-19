import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/auth/Login.vue";
import Index from "../views/main/Index.vue";
import Product from "../views/main/product/Product.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/auth/login",
    name: "Login",
    component: Login,
    beforeEnter (to, from, next) {
      if(localStorage.getItem('access_token')) {
        next({
          name: 'Product'
        })
      } else {
        next()
      }
    },
  },
  {
    path: "/",
    component: Index,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        // default children
        path: "/product",
        name: "Product",
        component: Product
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem("access_token")) {
      next({
        name: "Login"
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
