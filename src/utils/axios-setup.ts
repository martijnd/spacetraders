import { store } from '@/store';
import axios from 'axios';

export function axiosSetup (): void {

  axios.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
      store.dispatch('logout');
    }

    return Promise.reject(error);
  });

  axios.interceptors.request.use(function (config) {
    config.headers.common = {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    return config;
  });

  axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;
}
