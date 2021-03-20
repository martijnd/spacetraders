import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import {darkMode} from './utils/darkmode';
import {axiosSetup} from './utils/axios-setup';
import { store, key } from './store';
import './index.css';

darkMode();
axiosSetup();

const app = createApp(App);

app.use(store, key);
app.use(router);
app.mount('#app');
