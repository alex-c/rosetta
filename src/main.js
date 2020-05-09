import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// Material Design Icons
import '@mdi/font/css/materialdesignicons.min.css';

// Load reusable components
import Action from './components/Action.vue';

// Register reusable components
Vue.component('Action', Action);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
