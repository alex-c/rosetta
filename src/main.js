import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// Material Design Icons
import '@mdi/font/css/materialdesignicons.min.css';

// Load reusable components
import Button from './components/reusable/Button.vue';

// Register reusable components
Vue.component('Button', Button);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
