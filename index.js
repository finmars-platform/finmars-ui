import './src/assets/css/base-theme.css'

import FmBtn from './src/components/fm/Btn.vue'

export { default as tailwindBaseCssVariables } from "./tailwind/baseCssVariablesPlugin";

export { FmBtn }

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

    }
}