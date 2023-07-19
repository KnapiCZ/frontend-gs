

import './assets/main.css'

// Vuetify
import 'vuetify/styles'

import { createApp } from "vue";
import App from "./App.vue";
import { createVuetify } from "vuetify";


createApp(App).use(createVuetify()).mount("#app");