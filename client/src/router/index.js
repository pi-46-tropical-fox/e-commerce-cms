import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Products from '@/views/Products.vue';
import Login from '../views/Login.vue';
import ProductsDetail from '../views/ProductsDetail.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        children: [
            {
                path: 'products',
                name: 'Products',
                component: Products,
            },
            {
                path: 'product/:id/:slug',
                name: 'ProductsDetail',
                component: ProductsDetail,
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = () => localStorage.getItem('access_token');

    if (to.name !== 'Login' && !isAuthenticated()) {
        next({ name: 'Login' });
    } else if (to.name === 'Login' && isAuthenticated()) {
        next({ name: 'Dashboard' });
    } else {
        next();
    }
});

export default router;
