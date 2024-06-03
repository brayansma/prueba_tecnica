import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap';

// Importar la variable global
import { API_BASE_URL } from './globals';

// Crear la aplicación Vue
const app = createApp(App);

// Agregar la variable global a la instancia de Vue
app.config.globalProperties.$apiBaseUrl = API_BASE_URL;

// Usar router y store
app.use(store).use(router).mount('#app');
