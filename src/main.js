import {createApp} from "vue";
import App from "./App.vue"
import "./assets/css/main.css"

import fmTooltipPlugin from "./plugins/fmTooltipDirective";

const app = createApp(App);
app.use(fmTooltipPlugin);

app.mount("#app")