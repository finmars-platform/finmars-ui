import { ref, watch } from 'vue'
import FmSelect from '@/components/fm/Select/Select.vue'
import SelectDemo from './SelectDemo.vue'

const meta = {
	title: 'Components/FmSelect',
	component: FmSelect,
	argTypes: {},
	args: {}
}

export default meta

export const Default = {
	render: (args) => ({
		components: {
			FmSelect
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
		template: `<FmSelect v-bind="args" :key="key"/>`
	})
}

export const AllVariants = {
	render: (args) => ({
		components: {
			SelectDemo
		},
		setup() {
			return { args }
		},
		template: `<SelectDemo />`,
	})
}
