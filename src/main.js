import {createApp} from "vue";
import App from "./App.vue"

import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css"

import FmIcon from "./components/fm/Icon.vue";
import FmIconBtn from "./components/fm/IconBtn.vue";
import FmBtn from "./components/fm/Btn.vue";

import BaseModal from "./components/base/modal/index.vue";

import FmCard from "./components/fm/card/index.vue";

import FmInputText from "./components/fm/input/Text.vue";

import "./assets/css/main.dev.css";

const app = createApp(App);

app.use(FloatingVue, {
    themes: {
        'error-tooltip': {
            $extend: 'tooltip',
        }
    }
})

app.component("FmIcon", FmIcon);
app.component("FmIconBtn", FmIconBtn);
app.component("FmBtn", FmBtn);
app.component("BaseModal", BaseModal);

app.component("FmCard", FmCard);

app.component("FmInputText", FmInputText);

app.mount("#app")