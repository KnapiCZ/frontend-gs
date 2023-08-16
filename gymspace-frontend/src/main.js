

import './assets/main.css'

// Vuetify
import 'vuetify/styles'

import { createApp } from "vue";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import router from './router'

const app = createApp(App)

app.use(createVuetify())
app.use(router)
app.mount('#app')
