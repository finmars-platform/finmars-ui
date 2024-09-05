import plugin from "tailwindcss/plugin"

import baseInput from "../src/components/base/input/tailwindThemeExtension";
import baseModal from "../src/components/base/modal/tailwindThemeExtension";

let themeExtensionData = {
    fontSize: {
        '--baseText-fontSize': 'var(--baseText-fontSize)',

        '--tooltip-fontSize': 'var(--tooltip-fontSize)',
        '--tooltip-error-fontSize': 'var(--tooltip-error-fontSize)',
    },
    fontFamily: {
        '--baseText-fontFamily': 'var(--baseText-fontFamily)',

        '--tooltip-fontFamily': 'var(--tooltip-fontFamily)',
    },
    fontWeight: {
        '--baseText-fontWeight': 'var(--baseText-fontWeight)',

        '--tooltip-fontWeight': 'var(--tooltip-fontWeight)',
    },
    lineHeight: {
        '--baseText-lineHeight': 'var(--baseText-lineHeight)',

        '--tooltip-lineHeight': 'var(--tooltip-lineHeight)',
    },
    letterSpacing: {
        '--baseText-letterSpacing': 'var(--baseText-letterSpacing)',

        '--tooltip-letterSpacing': 'var(--tooltip-letterSpacing)',
    },
    padding: {
        '--icon-padding': 'var(--icon-padding)',
        '--iconButton-padding': 'var(--iconButton-padding)',

        '--tooltip-padding': 'var(--tooltip-padding)',
        '--tooltip-error-padding': 'var(--tooltip-error-padding)',
    },
    colors: {
        '--primary-color': 'var(--primary-color)',
        '--error-color': 'var(--error-color)',
        '--baseText-color': 'var(--baseText-color)',

        '--iconButton-color': 'var(--iconButton-color)',
        '--iconButton-backgroundColor': 'var(--iconButton-backgroundColor)',
        '--iconButton-hover-color': 'var(--iconButton-hover-color)',
        '--iconButton-hover-backgroundColor': 'var(--iconButton-hover-backgroundColor)',
        '--iconButton-focus-color': 'var(--iconButton-focus-color)',
        '--iconButton-focus-backgroundColor': 'var(--iconButton-focus-backgroundColor)',
        '--iconButton-active-color': 'var(--iconButton-active-color)',
        '--iconButton-active-backgroundColor': 'var(--iconButton-active-backgroundColor)',
        '--iconButton-disabled-color': 'var(--iconButton-disabled-color)',
        '--iconButton-disabled-backgroundColor': 'var(--iconButton-disabled-backgroundColor)',

        '--iconButton-filled-color': 'var(--iconButton-filled-color)',
        '--iconButton-filled-backgroundColor': 'var(--iconButton-filled-backgroundColor)',
        '--iconButton-filled-hover-color': 'var(--iconButton-filled-hover-color)',
        '--iconButton-filled-hover-backgroundColor': 'var(--iconButton-filled-hover-backgroundColor)',
        '--iconButton-filled-focus-color': 'var(--iconButton-filled-focus-color)',
        '--iconButton-filled-focus-backgroundColor': 'var(--iconButton-filled-focus-backgroundColor)',
        '--iconButton-filled-active-color': 'var(--iconButton-filled-active-color)',
        '--iconButton-filled-active-backgroundColor': 'var(--iconButton-filled-active-backgroundColor)',
        '--iconButton-filled-disabled-color': 'var(--iconButton-filled-disabled-color)',
        '--iconButton-filled-disabled-backgroundColor': 'var(--iconButton-filled-disabled-backgroundColor)',

        '--button-text-color': 'var(--button-text-color)',
        '--button-text-backgroundColor': 'var(--button-text-backgroundColor)',

        '--button-text-hover-color': 'var(--button-text-hover-color)',
        '--button-text-hover-backgroundColor': 'var(--button-text-hover-backgroundColor)',

        '--button-text-focus-color': 'var(--button-text-focus-color)',
        '--button-text-focus-backgroundColor': 'var(--button-text-focus-backgroundColor)',

        '--button-text-active-color': 'var(--button-text-active-color)',
        '--button-text-active-backgroundColor': 'var(--button-text-active-backgroundColor)',

        '--button-text-disabled-color': 'var(--button-text-disabled-color)',
        '--button-text-disabled-backgroundColor': 'var(--button-text-disabled-backgroundColor)',

        '--button-filled-color': 'var(--button-filled-color)',
        '--button-filled-backgroundColor': 'var(--button-filled-backgroundColor)',
        '--button-filled-hover-color': 'var(--button-filled-hover-color)',
        '--button-filled-hover-backgroundColor': 'var(--button-filled-hover-backgroundColor)',
        '--button-filled-focus-color': 'var(--button-filled-focus-color)',
        '--button-filled-focus-backgroundColor': 'var(--button-filled-focus-backgroundColor)',
        '--button-filled-active-color': 'var(--button-filled-active-color)',
        '--button-filled-active-backgroundColor': 'var(--button-filled-active-backgroundColor)',
        '--button-filled-disabled-color': 'var(--button-filled-disabled-color)',
        '--button-filled-disabled-backgroundColor': 'var(--button-filled-disabled-backgroundColor)',

        '--tooltip-color': 'var(--tooltip-color)',

        '--tooltip-error-color': 'var(--tooltip-error-color)',
    },
    backgroundColor: {
        '--base-backgroundColor': 'var(--base-backgroundColor)',

        '--tooltip-backgroundColor': 'var(--tooltip-backgroundColor)',
        '--tooltip-error-backgroundColor': 'var(--tooltip-error-backgroundColor)',
    },
    opacity: {
        '--button-disabled': 'var(--button-disabled-opacity)',

        '--icon-disabled': 'var(--icon-disabled-opacity)',
    },
    borderColor: {
        '--border-color': 'var(--border-color)',

        '--light-borderColor': 'var(--light-borderColor)',

        '--tooltip-borderColor': 'var(--tooltip-borderColor)',
    },
    borderRadius: {
        '--tooltip-borderRadius': 'var(--tooltip-borderRadius)',
    },
}

function createDefaultThemeExtension() {

    const extensionData = {};

    /**
     *
     * @param {Object} themeExt - object with keys like 'color', 'opacity' etc.
     */
    function applyThemeExt(themeExt) {

        let key;
        /**
         * keys - names of custom values. E.g. '--icon-disabled'.
         * values - strings that will be converted into CSS values.
         * E.g. 'var(--icon-disabled-opacity)'
         * @type {Object}
         */
        let cssPropertyData;

        for ([key, cssPropertyData] of Object.entries(themeExt)) {

            if ( !extensionData.hasOwnProperty(key) ) {
                extensionData[key] = {};
            }

            const cssPropData = extensionData[key];

            for (const [customValName, stringValue] of Object.entries(cssPropertyData)) {

                if ( cssPropData.hasOwnProperty(customValName) ) {
                    throw new Error(`A name of a CSS value is duplicated: '${customValName}'`);
                }

                cssPropData[customValName] = stringValue;

            }

        }

    }

    Object.values(arguments).forEach(applyThemeExt);

    return extensionData;

}

themeExtensionData = createDefaultThemeExtension(
    themeExtensionData,
    baseInput,
    baseModal,
)

export default plugin(
    function () {},
    {
        theme: {
            extend: themeExtensionData
        }
    }
)