import './src/assets/css/main.css';

import FmBtn from './src/components/fm/Btn.vue';
import FmIcon from './src/components/fm/Icon.vue';
import FmIconBtn from './src/components/fm/IconBtn.vue';
import FmCard from './src/components/fm/card/index.vue';

import BaseInput from './src/components/base/input/index.vue';
import BaseInputBtn from './src/components/base/input/Btn.vue';
import FmInputText from './src/components/fm/input/Text.vue';
import BaseSideNav from './src/components/base/sideNav/index.vue'
import FmSideNavPortal from './src/components/fm/sideNav/Portal.vue'

import BaseModal from './src/components/base/modal/index.vue';


export { default as tailwindCssVariables } from "./tailwind/cssVariablesPlugin.tw";

export {
    FmBtn, FmIcon, FmIconBtn, FmCard, BaseModal,

    BaseInput, BaseInputBtn, FmInputText, FmSideNavPortal, BaseSideNav

}

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

        Vue.component(`${prefix}Btn`, FmBtn);
        Vue.component(`${prefix}Icon`, FmIcon);
        Vue.component(`${prefix}IconBtn`, FmIconBtn);
        Vue.component(`${prefix}Card`, FmCard);
        Vue.component(`${prefix}BaseModal`, BaseModal);

        Vue.component(`${prefix}BaseInput`, BaseInput);
        Vue.component(`${prefix}BaseInputBtn`, BaseInputBtn);
        Vue.component(`${prefix}InputText`, FmInputText);
        Vue.component(`${prefix}BaseSideNav`, BaseSideNav);
        Vue.component(`${prefix}SideNavPortal`, FmSideNavPortal);
    }
}