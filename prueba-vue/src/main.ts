
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios';
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App)
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
app.use(createPinia())
app.use(router)
app.mount('#app')
