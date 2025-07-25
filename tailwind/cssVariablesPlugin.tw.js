import plugin from 'tailwindcss/plugin';

import themeExtensionBase from './themeExtensionBase.tw';
import navigation from '../src/components/fm/Navigation/Navigation.tw';
import tooltip from './tooltip.tw';

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
			if (!extensionData.hasOwnProperty(key)) {
				extensionData[key] = {};
			}

			const cssPropData = extensionData[key];

			for (const [customValName, stringValue] of Object.entries(cssPropertyData)) {
				if (cssPropData.hasOwnProperty(customValName)) {
					throw new Error(`A name of a CSS value is duplicated: '${customValName}'`);
				}

				cssPropData[customValName] = stringValue;
			}
		}
	}

	Object.values(arguments).forEach(applyThemeExt);

	return extensionData;
}

const themeExtensionData = createDefaultThemeExtension(themeExtensionBase, tooltip, navigation);

export default plugin(function () {}, {
	theme: {
		extend: themeExtensionData
	}
});
