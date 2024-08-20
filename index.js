import './src/assets/css/main.css';

import FmBtn from './src/components/fm/Btn.vue';
import FmIcon from './src/components/fm/Icon.vue';
import FmIconBtn from './src/components/fm/IconBtn.vue';

export { default as tailwindBaseCssVariables } from "./tailwind/baseCssVariablesPlugin";

export { FmBtn, FmIcon, FmIconBtn }

/**
 * VUE plugin that registers all components
 *
 * @type {{install(*, {}=): void}}
 */
export const uiComponentsPlugin = {
    install(
        Vue,
        args={}
    ) {

        const prefix = args.componentNamePrefix || "Fm"

        Vue.component(`${prefix}Btn`, FmBtn);
        Vue.component(`${prefix}Icon`, FmIcon);
        Vue.component(`${prefix}IconBtn`, FmIconBtn);

    }
}