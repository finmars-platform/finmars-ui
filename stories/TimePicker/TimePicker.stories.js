import { ref, watch } from 'vue';
import FmTimePicker from '@/components/fm/TimePicker/TimePicker.vue';
import TimePickerDemo from './TimePickerDemo.vue';

const meta = {
	title: 'Components/FmTimePicker',
	component: FmTimePicker,
	argTypes: {
		minutesStep: {
			control: 'select',
			options: [1, 2, 5, 10, 15, 20, 30]
		}
	},
	args: {
		minutesStep: 1
	}
};

export default meta;

export const General = {
	render: (args) => ({
		components: {
			FmTimePicker
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
			<FmTimePicker v-bind="args" :key="key" />`
	})
};

export const Demo = {
	render: (args) => ({
		components: {
			TimePickerDemo
		},
		setup() {
			return { args };
		},
		template: `
			<TimePickerDemo />`
	})
};
