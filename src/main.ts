/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css"
import "@ionic/vue/css/padding.css"
/* Theme variables */
import "@/theme/variables.css"
import "@/theme/main.css"

import { IonicVue } from "@ionic/vue"
import { createPinia } from "pinia"
import { register } from "swiper/element/bundle"
import { createApp } from "vue"

import App from "./App.vue"
import router from "./router"

register()

const pinia = createPinia()

const app = createApp(App)
    .use(IonicVue, {
        rippleEffect: false,
        swipeBackEnabled: false,
    })
    .use(router)
    .use(pinia)

router.isReady().then(() => {
    app.mount("#app")
})
