import './src/assets/css/main.css';

/*import FmBtn from './src/components/fm/Btn.vue';*/


export { default as tailwindCssVariables } from "./tailwind/cssVariablesPlugin.tw";

/*export {
    FmBtn

}*/

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

        let prefix = "";

        if (args.componentNamePrefix && typeof args.componentNamePrefix === 'string') {
            prefix = args.componentNamePrefix;

        } else if (args.componentNamePrefix === undefined) {
            // "Fm" used as a default prefix
            prefix = 'Fm';
        }

        /*Vue.component(`${prefix}Btn`, FmBtn);*/

    }
}