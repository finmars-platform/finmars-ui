import FmLogo from './Logo.vue'
import { ref, watch } from 'vue'
import { useTheme } from 'vuetify'

const meta = {
	title: 'Components/FmLogo',
	component: FmLogo,
	argTypes: {
		size: {
			control: 'select',
			options: ['small', null]
		}
	},
	args: {}
}

export default meta

export const Default = {
	render: (args) => ({
		components: {
			FmLogo
		},
		setup() {
			const key = ref(1)
			const theme = useTheme()

			watch(args, () => {
				key.value = new Date().getTime()
			})

			return {
				args,
				key,
				theme
			}
		},
		template: `
          <FmLogo v-bind="args" :theme="theme.global.name" maxHeight="30" :key="key"/>`
	})
}
