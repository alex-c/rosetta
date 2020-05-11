import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// Material Design Icons
import '@mdi/font/css/materialdesignicons.min.css';

// Load reusable components
import Button from './components/reusable/Button.vue';
import Select from './components/reusable/Select.vue';
import InputGroup from './components/reusable/InputGroup.vue';
import Alert from './components/reusable/Alert.vue';

// Register reusable components
Vue.component('Button', Button);
Vue.component('Select', Select);
Vue.component('InputGroup', InputGroup);
Vue.component('Alert', Alert);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
