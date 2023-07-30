

import './assets/main.css'

// Vuetify
import 'vuetify/styles'

import { createApp } from "vue";
import App from "./App.vue";
import { createVuetify } from "vuetify";


const app = createApp(App)

app.use(createVuetify())
app.mount('#app')