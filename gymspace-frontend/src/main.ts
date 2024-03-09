import { createApp } from 'vue';
import { createVuetify } from "vuetify";
import { createPinia } from 'pinia'
import { IonicVue } from '@ionic/vue';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

import router from './router';
import App from './App.vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/padding.css';


/* Theme variables */
import '@/theme/variables.css';

// Vuetify
import 'vuetify/styles'
import '@/theme/main.css'

defineCustomElements(window);

const pinia = createPinia()
const vuetify = createVuetify()

const app = createApp(App)
	.use(IonicVue)
	.use(router)
	.use(vuetify)
	.use(pinia);

router.isReady().then(() => {
	app.mount('#app');
});