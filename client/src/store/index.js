import Vue from 'vue';
import Vuex from 'vuex';
import Axios from '@/config/axios.js';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentUser: {},
        products: [],
        categories: [],
    },
    mutations: {
        setCurrentUser(state, userData) {
            state.currentUser = userData.data;
        },

        deleteCurrentUser(state) {
            state.currentUser = {};
        },

        setProducts(state, products) {
            state.products = products;
        },

        setCategories(state, categories) {
            state.categories = categories;
        },
    },
    actions: {
        login(context, loginData) {
            return Axios({
                url: '/login',
                method: 'POST',
                data: {
                    email: loginData.email,
                    password: loginData.password,
                },
            });
        },

        logout({ commit }) {
            localStorage.clear();
            commit('deleteCurrentUser');
            router.push({ name: 'Login' });
        },

        fetchProducts({ commit }) {
            Axios({
                url: '/products',
                method: 'GET',
                headers: {
                    access_token: localStorage.getItem('access_token'),
                },
            })
                .then(({ data }) => {
                    commit('setProducts', data);
                })
                .catch(err => {
                    console.log(err);
                });
        },

        fetchProductsById(context, { id }) {
            return Axios({
                url: `/products/${id}`,
                method: 'GET',
                headers: {
                    access_token: localStorage.getItem('access_token'),
                },
            });
        },

        fetchCategories({ commit }) {
            Axios({
                url: '/categories',
                method: 'GET',
                headers: {
                    access_token: localStorage.getItem('access_token'),
                },
            })
                .then(({ data }) => {
                    commit('setCategories', data);
                })
                .catch(err => {
                    console.log(err);
                });
        },

        addProduct(context, productData) {
            return Axios({
                url: '/products',
                method: 'POST',
                headers: {
                    access_token: localStorage.getItem('access_token'),
                },
                data: {
                    name: productData.name,
                    image_url: productData.image_url,
                    price: Number(productData.price),
                    stock: Number(productData.stock),
                    CategoryId: productData.CategoryId,
                },
            });
        },

        updateProduct(context, productData) {
            return Axios({
                url: '/products',
                method: 'PUT',
                headers: {
                    access_token: localStorage.getItem('access_token'),
                },
                data: {
                    name: productData.name,
                    image_url: productData.image_url,
                    price: Number(productData.price),
                    stock: Number(productData.stock),
                    CategoryId: productData.CategoryId,
                },
            });
        },

        deleteProduct({ dispatch }, id) {
            Axios({
                url: `/products/${id}`,
                method: 'DELETE',
                headers: {
                    access_token: localStorage.getItem('access_token'),
                },
            })
                .then(() => {
                    dispatch.fetchProducts();
                })
                .catch(err => {
                    console.log(err);
                });
        },
    },
    modules: {},
});
