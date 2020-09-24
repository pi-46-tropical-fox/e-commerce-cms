import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
// for Tailwind CSS components
import './assets/styles/index.css';
// import { gapi, config } from "./config/gapi";
import VueTailwind from 'vue-tailwind'

Vue.config.productionTip = false;

// Vue.use(gapi, config);

const settings = {
  //...
}

Vue.use(VueTailwind, settings)

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
