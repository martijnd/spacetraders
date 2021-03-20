import router from '@/router';
import { User } from '@/types';
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store, Getter, ActionTree, MutationTree } from 'vuex';

export const key: InjectionKey<Store<State>> = Symbol();

// ----- Store ------- //
export interface State {
  user: User|null;
}
const state: State = {
  user: null
};

const getters: Record<string, Getter<State, State>> = {};

const mutations: MutationTree<State> = {
  login (state, {username, token}) {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    router.push(localStorage.redirect ?? '/');
    localStorage.removeItem('redirect');
  },
  logout (state) {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    state.user = null;
    router.push('/login');
  },
  setUserData(state, user: User) {
    state.user = user;
  }
};

const actions: ActionTree<State, State> = {
  login ({commit}, {username, token, user}: {username: string, token: string, user: User}) {
    commit('login', {username, token});
    commit('setUserData', user);
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
