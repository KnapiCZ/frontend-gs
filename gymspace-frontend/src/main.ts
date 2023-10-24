import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from "vuetify";

import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/padding.css';


/* Theme variables */
import './theme/variables.css';

// Vuetify
import 'vuetify/styles'

import '@/assets/main.css'

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(createVuetify());

router.isReady().then(() => {
  app.mount('#app');
});