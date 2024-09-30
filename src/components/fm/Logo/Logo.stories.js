import FmLogo from './Logo.vue'
import { ref, watch } from 'vue'

const meta = {
	title: 'Components/FmLogo',
	component: FmLogo,
	argTypes: {
		variant: {
			control: 'select',
			options: ['solo']
		}
	},
	args: {
		rounded: true,
		variant: 'solo'
	}
}

export default meta

export const Default = {
	render: (args) => ({
		components: {
			FmLogo
		},
		setup() {
			const key = ref(1)

			watch(args, () => {
				key.value = new Date().getTime()
			})

			return {
				args,
				key
			}
		},
		template: `
          <FmLogo v-bind="args" :key="key"/>`
	})
}
