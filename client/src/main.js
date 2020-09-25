import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

// for Tailwind CSS components
import './assets/styles/index.css';
import VueTailwind from 'vue-tailwind'

import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false;
Vue.component('v-select', vSelect)

const settings = {
  //...
}

Vue.use(VueTailwind, settings)

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
