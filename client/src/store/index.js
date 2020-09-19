import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import swal from 'sweetalert';
import router from '../router/index';

Vue.use(Vuex);
const baseURL = 'https://cms-commerce-obos.herokuapp.com/';

export default new Vuex.Store({
  state: {
    products: [],
    banners: [],
    product: {},
    banner: {},
    statusAdd: true,
  },
  mutations: {
    RESET_BANNER_FORM(state, status) {
      state.banner = {};
      state.statusAdd = status;
      router.push({ name: 'FormBanner' });
    },
    RESET_PRODUCT_FORM(state, status) {
      state.product = {};
      state.statusAdd = status;
      router.push({ name: 'FormProduct' });
    },
    CHANGE_FORM_STATUS(state, status) {
      state.statusAdd = status;
    },
    SET_PRODUCTS(state, result) {
      state.products = result;
    },
    SET_BANNERS(state, result) {
      state.banners = result;
    },
    DELETE_PRODUCT(state, result) {
      state.products = state.products.filter((product) => product.id !== result);
    },
    DELETE_BANNER(state, result) {
      state.banners = state.banners.filter((banner) => banner.id !== result);
    },
    FIND_PRODUCT(state, result) {
      state.product = result;
    },
    FIND_BANNER(state, result) {
      state.banner = result;
    },
  },
  actions: {
    showProducts(context) {
      axios({
        method: 'GET',
        url: `${baseURL}/products`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          context.commit('SET_PRODUCTS', result.data);
        })
        .catch(() => {
          swal('Error!', 'Something went error.', 'error');
        });
    },
    showBanners(context) {
      axios({
        method: 'GET',
        url: `${baseURL}/banners`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          context.commit('SET_BANNERS', result.data);
        })
        .catch(() => {
          swal('Error!', 'Something went error.', 'error');
        });
    },
    deleteProduct(context, id) {
      axios({
        method: 'DELETE',
        url: `${baseURL}/products/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          context.commit('DELETE_PRODUCT', +id);
          swal('Success!', `${result.data.message}`, 'success');
        })
        .catch(() => {
          swal('Error!', 'Something went error.', 'error');
        });
    },
    deleteBanner(context, id) {
      axios({
        method: 'DELETE',
        url: `${baseURL}/banners/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          context.commit('DELETE_BANNER', +id);
          swal('Success!', `${result.data.message}`, 'success');
        })
        .catch(() => {
          swal('Error!', 'Something went error.', 'error');
        });
    },
    findProduct(context, id) {
      axios({
        method: 'GET',
        url: `${baseURL}/products/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          context.commit('FIND_PRODUCT', result.data);
          router.push({ name: 'FormProduct' });
        })
        .catch(() => {
          swal('Error!', 'Something went error.', 'error');
        });
    },
    findBanner(context, id) {
      axios({
        method: 'GET',
        url: `${baseURL}/banners/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          context.commit('FIND_BANNER', result.data);
          router.push({ name: 'FormBanner' });
        })
        .catch(() => {
          swal('Error!', 'Something went error.', 'error');
        });
    },
    addProduct(context, newProduct) {
      axios({
        method: 'POST',
        url: `${baseURL}/products`,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          name: newProduct.name,
          image_url: newProduct.image_url,
          price: +newProduct.price,
          stock: +newProduct.stock,
          category: newProduct.category,
          BannerId: +newProduct.BannerId,
        },
      })
        .then(() => {
          swal('Success!', `Success add new product '${newProduct.name}'`, 'success');
          router.push({ name: 'ProductTable' })
        })
        .catch((err) => {
          const errors = err.response.data.message;
          errors.forEach((element) => {
            swal('Error', `${element}`, 'error')
          });
        });
    },
    addBanner(context, newBanner) {
      axios({
        method: 'POST',
        url: `${baseURL}/banners`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name: newBanner.name,
          image_url: newBanner.image_url,
          description: newBanner.description,
          status: newBanner.status,
        }
      })
        .then(() => {
          swal('Success!', `Success add new banner '${newBanner.name}'`, 'success')
          router.push({ name: 'BannerTable' })
        })
        .catch((err) => {
          const errors = err.response.data.message
          errors.forEach((element) => {
            swal('Error', `${element}`, 'error')
          })
        })
    },
    editProduct(context, editedProduct) {
      axios({
        method: 'PUT',
        url: `${baseURL}/products/${editedProduct.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name: editedProduct.name,
          image_url: editedProduct.image_url,
          price: +editedProduct.price,
          stock: +editedProduct.stock,
          category: editedProduct.category,
          BannerId: +editedProduct.BannerId
        }
      })
        .then(() => {
          swal('Success!', `Success edit product '${editedProduct.name}'`, 'success')
          router.push({ name: 'ProductTable' })
        })
        .catch((err) => {
          const errors = err.response.data.message
          console.log(err)
          errors.forEach((element) => {
            swal('Error', `${element}`, 'error')
          })
        })
    },
    editBanner(context, editedBanner) {
      axios({
        method: 'PUT',
        url: `${baseURL}/banners/${editedBanner.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name: editedBanner.name,
          image_url: editedBanner.image_url,
          description: editedBanner.description,
          status: editedBanner.status
        }
      })
        .then(() => {
          swal('Success!', `Success edit banner '${editedBanner.name}'`, 'success')
          router.push({ name: 'BannerTable' })
        })
        .catch((err) => {
          const errors = err.response.data.message
          errors.forEach((element) => {
            swal('Error', `${element}`, 'error');
          })
        })
    }
  }
})