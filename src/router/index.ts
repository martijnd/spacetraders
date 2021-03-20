import { store } from '@/store';
import axios from 'axios';
import { RouteRecordRaw, createRouter, NavigationGuard, createWebHistory } from 'vue-router';


const guest: NavigationGuard = (to, from, next) => {
  const isAuthenticated = store.state.user;
  if (!isAuthenticated) {
    return next();
  } else {
    return next('/');
  }
};

const auth: NavigationGuard = async (to, from, next) => {
  const isAuthenticated = store.state.user;
  if (isAuthenticated) {
    return next();
  } 

  if (localStorage.username && localStorage.token) {
    try {
      const response = await axios.get(`/users/${localStorage.username}`, {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
      store.dispatch('login', {username: localStorage.username, token: localStorage.token, user: response.data.user});
    } catch (e) {
      localStorage.setItem('redirect', to.fullPath);
      return next('/login');
    }
  }
  
  localStorage.setItem('redirect', to.fullPath);
  return next('/login');
  
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: auth,
    component: () => import(/* webpackChunkName: "home" */ '../pages/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: guest,
    component: () =>
      import(/* webpackChunkName: "login" */ '../pages/login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: () =>
    import(/* webpackChunkName: "gamesShow" */ '../pages/notfound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
