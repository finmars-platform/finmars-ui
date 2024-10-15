import './src/assets/css/main.css'
import FmNavigationPortal from '@/components/fm/Navigation/NavigationPortal.vue'
import FmHeader from '~/stories/Header.vue'
import { createVuetify } from 'vuetify'
import '@/assets/css/tailwind.css'

export { FmNavigationPortal, FmHeader }

/**
 * VUE plugin that registers all components
 *
 * @type {{install(*, {}=): void}}
 */
export const uiComponentsPlugin = {
	install(Vue, args = {}) {
		let prefix = ''

		if (
			args.componentNamePrefix &&
			typeof args.componentNamePrefix === 'string'
		) {
			prefix = args.componentNamePrefix
		} else if (args.componentNamePrefix === undefined) {
			// "Fm" used as a default prefix
			prefix = 'Fm'
		}

		const vuetify = createVuetify()
		Vue.use(vuetify)

		Vue.component(`${prefix}NavigationPortal`, FmNavigationPortal)
		Vue.component(`${prefix}Header`, FmHeader)
	}
}
