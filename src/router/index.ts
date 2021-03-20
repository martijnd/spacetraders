import { store } from '@/store';
import { RouteRecordRaw, createRouter, NavigationGuard, createWebHistory } from 'vue-router';


const guest: NavigationGuard = async (to, from, next) => {
  if (!store.state.authenticated) {
    return next();
  }

  if (localStorage.username && localStorage.token) {
    try {
      await store.dispatch('fetchUserData');
      return next('/');
    } catch (e) {
      localStorage.setItem('redirect', to.fullPath);
      store.dispatch('logout');
      return next();
    } 
  }
  
  return next();
};

const auth: NavigationGuard = async (to, from, next) => {
  const isAuthenticated = store.state.user;
  if (isAuthenticated) {
    return next();
  } 

  if (localStorage.username && localStorage.token) {
    try {
      await store.dispatch('fetchUserData');
      return next();
    } catch (e) {
      localStorage.setItem('redirect', to.fullPath);
      store.dispatch('logout');
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
    path: '/ships',
    name: 'ShipsIndex',
    beforeEnter: auth,
    component: () => import(/* webpackChunkName: "ShipsIndex" */ '../pages/ships/index.vue')
  },
  {
    path: '/systems',
    name: 'SystemsIndex',
    beforeEnter: auth,
    component: () => import(/* webpackChunkName: "SystemsIndex" */ '../pages/systems/index.vue')
  },
  {
    path: '/locations/:symbol',
    name: 'LocationsShow',
    beforeEnter: auth,
    component: () => import(/* webpackChunkName: "LocationsShow" */ '../pages/locations/show.vue')
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
