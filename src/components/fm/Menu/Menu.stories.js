import FmMenu from './Menu.vue'
import { ref, watch } from 'vue'

const meta = {
	title: 'Components/FmMenu',
	component: FmMenu,
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
			FmMenu
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
          <FmMenu v-bind="args" :key="key"/>`
	})
}
