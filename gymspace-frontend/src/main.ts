import { createApp } from 'vue';
import { createPinia } from 'pinia'
import { IonicVue } from '@ionic/vue';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { register } from 'swiper/element/bundle';

import router from './router';
import App from './App.vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/padding.css';

import 'swiper/css';

/* Theme variables */
import '@/theme/variables.css';
import '@/theme/main.css';

defineCustomElements(window);
register();

const pinia = createPinia()

const app = createApp(App)
	.use(IonicVue,
		{
			rippleEffect: false,
			swipeBackEnabled: false,
		}
	)
	.use(router)
	.use(pinia);

router.isReady().then(() => {
	app.mount('#app');
});