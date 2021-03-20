import router from '@/router';
import { User } from '@/types';
import axios from 'axios';
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store, Getter, ActionTree, MutationTree } from 'vuex';

export const key: InjectionKey<Store<State>> = Symbol();

// ----- Store ------- //
export interface State {
  user: User|null;
  authenticated: boolean;
}
const state: State = {
  user: null,
  authenticated: false
};

const getters: Record<string, Getter<State, State>> = {};

const mutations: MutationTree<State> = {
  setCredentials (_, {username, token}) {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
  },
  logout (state) {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    state.authenticated = false;
    router.push('/login');
    state.user = null;
  },
  setUserData(state, user: User) {
    state.user = user;
    state.authenticated = true;
  }
};

const actions: ActionTree<State, State> = {
  async login ({commit, dispatch}, {username, token}: {username: string, token: string}) {
    commit('setCredentials', {username, token});
    await dispatch('fetchUserData');
    router.push(localStorage.redirect ?? '/');
    localStorage.removeItem('redirect');
  },
  async fetchUserData({commit}) {
    const response = await axios.get(`/users/${localStorage.username}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
    commit('setUserData', response.data.user);
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
