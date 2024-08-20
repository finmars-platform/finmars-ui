import './src/assets/css/main.css';

import FmBtn from './src/components/fm/Btn.vue';
import FmIcon from './src/components/fm/Icon.vue';
import FmIconBtn from './src/components/fm/IconBtn.vue';
import BaseInput from './src/components/base/input/index.vue';
import BaseInputBtn from './src/components/base/input/Btn.vue';

export { default as tailwindBaseCssVariables } from "./tailwind/baseCssVariablesPlugin";

export { FmBtn, FmIcon, FmIconBtn, BaseInput, BaseInputBtn }

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

        let prefix = "Fm"

        if (args.componentNamePrefix && typeof args.componentNamePrefix === 'string') {
            prefix = args.componentNamePrefix;

        } else if (args.componentNamePrefix !== undefined) {
            prefix = '';
        }

        Vue.component(`${prefix}Btn`, FmBtn);
        Vue.component(`${prefix}Icon`, FmIcon);
        Vue.component(`${prefix}IconBtn`, FmIconBtn);

        Vue.components(`${prefix}BaseInput`, BaseInput);
        Vue.components(`${prefix}BaseInputBtn`, BaseInputBtn);

    }
}