import { ref, watch } from 'vue'
import FmProgressCircular from './ProgressCircular.vue'
import ProgressCircularList from './ProgressCircularList.vue'

const meta = {
	title: 'Components/FmProgressCircular',
	component: FmProgressCircular,
	argTypes: {
		modelValue: 0,
		indeterminate: {
			control: 'select',
			options: [false, true],
		},
		showValue: {
			control: 'select',
			options: [false, true],
		},
	},
	args: {},
}

export default meta

export const General = {
	render: (args) => ({
		components: {
			FmProgressCircular
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
			<FmProgressCircular v-bind="args" :key="key" />
		`,
	})
}

export const AllVariants = {
	render: (args) => ({
		components: {
			ProgressCircularList
		},
		setup() {
			return { args }
		},
		template: `<ProgressCircularList />`,
	})
}
