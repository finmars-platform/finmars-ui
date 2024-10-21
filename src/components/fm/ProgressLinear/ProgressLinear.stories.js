import { ref, watch } from 'vue'
import FmProgressLinear from './ProgressLinear.vue'
import ProgressLinearList from './ProgressLinearList.vue'

const meta = {
	title: 'Components/FmProgressLinear',
	component: FmProgressLinear,
	argTypes: {
		modelValue: 0,
		indeterminate: {
			control: 'select',
			options: [false, true],
		}
	},
	args: {},
}

export default meta

export const General = {
	render: (args) => ({
		components: {
			FmProgressLinear
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
			<FmProgressLinear v-bind="args" :key="key" />
		`,
	})
}

export const AllVariants = {
	render: (args) => ({
		components: {
			ProgressLinearList
		},
		setup() {
			return { args }
		},
		template: `<ProgressLinearList />`,
	})
}
