import { store } from '@/store';
import { RouteRecordRaw, createRouter, NavigationGuard, createWebHistory } from 'vue-router';


const guest: NavigationGuard = (to, from, next) => {
  const isAuthenticated = store.state.authenticated;
  if (!isAuthenticated) {
    return next();
  } else {
    return next('/');
  }
};

const auth: NavigationGuard = (to, from, next) => {
  const isAuthenticated = store.state.authenticated;
  if (isAuthenticated) {
    return next();
  } else {
    localStorage.setItem('redirect', to.fullPath);
    return next('/login');
  }
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
