import './src/assets/css/main.css'
import FmButton from '@/components/fm/Button/Button.vue'
import FmIconButton from '@/components/fm/IconButton/IconButton.vue'
import FmCheckbox from '@/components/fm/Checkbox/Checkbox.vue'
import FmProgressCircular from '@/components/fm/ProgressCircular/ProgressCircular.vue'
import FmProgressLinear from '@/components/fm/ProgressLinear/ProgressLinear.vue'
import FmSlider from '@/components/fm/Slider/Slider.vue'
import FmRangeSlider from '@/components/fm/RangeSlider/RangeSlider.vue'
import FmTextField from '@/components/fm/TextField/TextField.vue'
import FmDatePicker from '@/components/fm/DatePicker/DatePicker.vue'
import FmDateEditor from '@/components/fm/DateEditor/DateEditor.vue'
import FmChip from '@/components/fm/Chip/Chip.vue'
import FmRadio from '@/components/fm/Radio/Radio.vue'
import FmRadioGroup from '@/components/fm/Radio/RadioGroup.vue'
import FmTooltip from '@/components/fm/Tooltip/Tooltip.vue'
import FmNavigationPortal from '@/components/fm/Navigation/NavigationPortal.vue'
import FmHeader from '~/stories/Header.vue'
import { createVuetify } from 'vuetify'
import '@/assets/css/tailwind.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

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

		Vue.component(`${prefix}Button`, FmButton)
		Vue.component(`${prefix}IconButton`, FmIconButton)
		Vue.component(`${prefix}Checkbox`, FmCheckbox)
		Vue.component(`${prefix}ProgressCircular`, FmProgressCircular)
		Vue.component(`${prefix}ProgressLinear`, FmProgressLinear)
		Vue.component(`${prefix}Slider`, FmSlider)
		Vue.component(`${prefix}RangeSlider`, FmRangeSlider)
		Vue.component(`${prefix}TextField`, FmTextField)
		Vue.component(`${prefix}DatePicker`, FmDatePicker)
		Vue.component(`${prefix}DateEditor`, FmDateEditor)
		Vue.component(`${prefix}Chip`, FmChip)
		Vue.component(`${prefix}Radio`, FmRadio)
		Vue.component(`${prefix}RadioGroup`, FmRadioGroup)
		Vue.component(`${prefix}Tooltip`, FmTooltip)
		Vue.component(`${prefix}NavigationPortal`, FmNavigationPortal)
		Vue.component(`${prefix}Header`, FmHeader)
	}
}
