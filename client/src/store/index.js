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
        productDetail: {},
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

        setProductDetail(state, product) {
            state.productDetail = product;
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
            })
                .then(({ data }) => {
                    commit('setProducts', data);
                })
                .catch(err => {
                    console.log(err);
                });
        },

        fetchProductsById({ commit }, { id }) {
            Axios({
                url: `/products/${id}`,
                method: 'GET',
            })
                .then(({ data }) => {
                    commit('setProductDetail', data);
                })
                .catch(err => {
                    console.log(err);
                });
        },

        fetchCategories({ commit }) {
            Axios({
                url: '/categories',
                method: 'GET',
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
                url: `/products/${productData.id}`,
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

        deleteProduct(context, id) {
            return Axios({
                url: `/products/${id}`,
                method: 'DELETE',
                headers: {
                    access_token: localStorage.getItem('access_token'),
                },
            });
        },
    },
    modules: {},
});
