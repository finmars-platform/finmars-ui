import {createApp} from "vue";
import App from "./App.vue"

import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css"

import "./assets/css/main.dev.css"

const app = createApp(App);
// app.directive("tooltip", vTooltip);
app.use(FloatingVue, {
    themes: {
        'error-tooltip': {
            $extend: 'tooltip',
        }
    }
})

app.mount("#app")