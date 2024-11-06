import './assets/css/main.css'
import FmAvatar from '@/components/fm/Avatar/Avatar.vue'
import FmBadge from '@/components/fm/Badge/Badge.vue'
import FmButton from '@/components/fm/Button/Button.vue'
import FmCheckbox from '@/components/fm/Checkbox/Checkbox.vue'
import FmChip from '@/components/fm/Chip/Chip.vue'
import FmDateEditor from '@/components/fm/DateEditor/DateEditor.vue'
import FmDatePicker from '@/components/fm/DatePicker/DatePicker.vue'
import FmIconButton from '@/components/fm/IconButton/IconButton.vue'
import FmItemPicker from '@/components/fm/ItemPicker/ItemPicker.vue'
import FmLogo from '@/components/fm/Logo/Logo.vue'
import FmMenu from '@/components/fm/Menu/Menu.vue'
import FmNavigationPortal from '@/components/fm/Navigation/NavigationPortal.vue'
import FmPagination from '@/components/fm/Pagination/Pagination.vue'
import type { FmPaginationProps, FmPaginationEmits } from '@/components/fm/Pagination/types'
import FmProgressCircular from '@/components/fm/ProgressCircular/ProgressCircular.vue'
import FmProgressLinear from '@/components/fm/ProgressLinear/ProgressLinear.vue'
import FmRadio from '@/components/fm/Radio/Radio.vue'
import FmRadioGroup from '@/components/fm/Radio/RadioGroup.vue'
import FmRangeSlider from '@/components/fm/RangeSlider/RangeSlider.vue'
import FmSearch from '@/components/fm/Search/Search.vue'
import FmSelect from '@/components/fm/Select/Select.vue'
import type { FmSelectProps, FmSelectEmits, FmSelectSlots } from '@/components/fm/Select/types'
import FmSlider from '@/components/fm/Slider/Slider.vue'
import FmTextField from '@/components/fm/TextField/TextField.vue'
import FmTooltip from '@/components/fm/Tooltip/Tooltip.vue'
import FmHeader from '../stories/Header.vue'
import { createVuetify } from 'vuetify'
import '@/assets/css/tailwind.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

export {
	FmHeader,
	FmNavigationPortal,

	FmAvatar,
	FmBadge,
	FmButton,
	FmCheckbox,
	FmChip,
	FmDateEditor,
	FmDatePicker,
	FmIconButton,
	FmItemPicker,
	FmLogo,
	FmMenu,
	FmPagination,
	FmProgressCircular,
	FmProgressLinear,
	FmRadio,
	FmRadioGroup,
	FmRangeSlider,
	FmSearch,
	FmSelect,
	FmSlider,
	FmTextField,
	FmTooltip,

	FmPaginationProps,
	FmPaginationEmits,
	FmSelectProps,
	FmSelectEmits,
	FmSelectSlots,
}

/**
 * VUE plugin that registers all components
 *
 * @type {{install(*, {}=): void}}
 */
export const uiComponentsPlugin = {
	// @ts-ignore
	install(Vue, args = {} as sny) {
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
		Vue.component(`${prefix}Avatar`, FmAvatar)
		Vue.component(`${prefix}Badge`, FmBadge)
		Vue.component(`${prefix}Button`, FmButton)
		Vue.component(`${prefix}Checkbox`, FmCheckbox)
		Vue.component(`${prefix}Chip`, FmChip)
		Vue.component(`${prefix}DateEditor`, FmDateEditor)
		Vue.component(`${prefix}DatePicker`, FmDatePicker)
		Vue.component(`${prefix}IconButton`, FmIconButton)
		Vue.component(`${prefix}ItemPicker`, FmItemPicker)
		Vue.component(`${prefix}Logo`, FmLogo)
		Vue.component(`${prefix}Menu`, FmMenu)
		Vue.component(`${prefix}FmPagination`, FmPagination)
		Vue.component(`${prefix}ProgressCircular`, FmProgressCircular)
		Vue.component(`${prefix}ProgressLinear`, FmProgressLinear)
		Vue.component(`${prefix}Radio`, FmRadio)
		Vue.component(`${prefix}RadioGroup`, FmRadioGroup)
		Vue.component(`${prefix}RangeSlider`, FmRangeSlider)
		Vue.component(`${prefix}Search`, FmSearch)
		Vue.component(`${prefix}FmSelect`, FmSelect)
		Vue.component(`${prefix}Slider`, FmSlider)
		Vue.component(`${prefix}TextField`, FmTextField)
		Vue.component(`${prefix}Tooltip`, FmTooltip)
	}
}

declare module 'vue' {
	interface GlobalComponents {
		FmNavigationPortal: typeof FmNavigationPortal,
		FmHeader: typeof FmHeader,
		FmAvatar: typeof FmAvatar,
		FmBadge: typeof FmBadge,
		FmButton: typeof FmButton,
		FmCheckbox: typeof FmCheckbox,
		FmChip: typeof FmChip,
		FmDateEditor: typeof FmDateEditor,
		FmDatePicker: typeof FmDatePicker,
		FmIconButton: typeof FmIconButton,
		FmItemPicker: typeof FmItemPicker,
		FmLogo: typeof FmLogo,
		FmMenu: typeof FmMenu,
		FmPagination: typeof FmPagination,
		FmProgressCircular: typeof FmProgressCircular,
		FmProgressLinear: typeof FmProgressLinear,
		FmRadio: typeof FmRadio,
		FmRadioGroup: typeof FmRadioGroup,
		FmRangeSlider: typeof FmRangeSlider,
		FmSearch: typeof FmSearch,
		FmSelect: typeof FmSelect,
		FmSlider: typeof FmSlider,
		FmTextField: typeof FmTextField,
		FmTooltip: typeof FmTooltip,
	}
}
