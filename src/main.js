import {createApp} from "vue";
import App from "./App.vue"
import 'vuetify/styles' // Импорт стилей Vuetify
import '@mdi/font/css/materialdesignicons.css' // Импорт иконок
import { createVuetify } from 'vuetify'

const vuetify = createVuetify()


import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css"


import FmSearch from "./components/fm/Search/Search.vue";

import "./assets/css/main.dev.css";

const app = createApp(App);

app.use(vuetify)

app.use(FloatingVue, {
    themes: {
        'error-tooltip': {
            $extend: 'tooltip',
        }
    }
})
app.component("FmSearch", FmSearch);

app.mount("#app")