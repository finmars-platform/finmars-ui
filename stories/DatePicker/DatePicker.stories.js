import { ref, watch } from 'vue';
import FmDatePicker from '@/components/fm/DatePicker/DatePicker.vue';
import DatePickerDemo from './DatePickerDemo.vue';

const meta = {
	title: 'Components/FmDatePicker',
	component: FmDatePicker,
	argTypes: {
		min: {
			type: { control: 'date' }
		},
		max: {
			type: { control: 'date' }
		},
		nonSelectableDates: {
			type: { control: 'object' }
		},
		erroneousDates: {
			type: { control: 'object' }
		}
	},
	args: {}
};

export default meta;

export const General = {
	render: (args) => ({
		components: {
			FmDatePicker
		},
		setup() {
			const key = ref(1);

			watch(args, () => {
				key.value = new Date().getTime();
			});

			return {
				args,
				key
			};
		},
		template: `
			<FmDatePicker v-bind="args" :key="key" />
		`
	})
};

export const Demo = {
	render: (args) => ({
		components: {
			DatePickerDemo
		},
		setup() {
			return { args };
		},
		template: `
			<DatePickerDemo />`
	})
};
