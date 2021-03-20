import router from '@/router';
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store, Getter, ActionTree, MutationTree } from 'vuex';

export const key: InjectionKey<Store<State>> = Symbol();

// ----- Store ------- //
export interface State {
  authenticated: boolean
}
const state: State = {
  authenticated: !!localStorage.authToken
};

const getters: Record<string, Getter<State, State>> = {};

const mutations: MutationTree<State> = {
  login (state, data) {
    localStorage.setItem('username', data.username);
    localStorage.setItem('token', data.token);
    state.authenticated = true;
    router.push(localStorage.redirect ?? '/');
    localStorage.removeItem('redirect');
  },
  logout (state) {
    router.push('/login');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    state.authenticated = false;
  }
};

const actions: ActionTree<State, State> = {
  login ({commit}, data) {
    commit('login', data);
  },
  logout ({commit}) {
    commit('logout');
  }
};
export const store = createStore<State>({
  state,
  getters,
  mutations,
  actions
});

// define your own `useStore` composition function
export function useStore (): Store<State> {
  return baseUseStore(key);
}
