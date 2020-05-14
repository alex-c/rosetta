import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// Import views
import Home from '../views/Home.vue';
import Project from '../views/Project.vue';

// Store
import store from '../store';

// Define routes
const routes = [
  {
    path: '/',
    beforeEnter: (_to, _from, next) => {
      if (store.state.projectLoaded) {
        next({ path: '/project' });
      } else {
        next();
      }
    },
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/project',
    component: Project,
    beforeEnter: (_to, _from, next) => {
      if (store.state.projectLoaded) {
        next();
      } else {
        next({ path: '/home' });
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
