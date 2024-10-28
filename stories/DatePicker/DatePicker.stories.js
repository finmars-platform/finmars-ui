import { ref, watch } from 'vue'
import FmDatePicker from '@/components/fm/DatePicker/DatePicker.vue'
import DatePickerDemo from './DatePickerDemo.vue'

const meta = {
	title: 'Components/FmDatePicker',
	component: FmDatePicker,
	argTypes: {
		min: {
			type: { control: 'date' },
		},
		max: {
			type: { control: 'date' },
		},
		allowedDates: {
			type: { control: 'object' },
		},
		minWidth: {
			type: { control: 'number' },
		},
		width: {
			type: { control: 'number' },
		},
		maxWidth: {
			type: { control: 'number' },
		},
	},
	args: {},
}

export default meta

export const General = {
	render: (args) => ({
		components: {
			FmDatePicker
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
			<FmDatePicker v-bind="args" :key="key" />
		`,
	})
}

export const AllVariants = {
	render: (args) => ({
		components: {
			DatePickerDemo
		},
		setup() {
			return { args }
		},
		template: `<DatePickerDemo />`,
	})
}
