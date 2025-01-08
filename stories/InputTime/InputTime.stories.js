import { ref, watch } from 'vue';
import FmInputTime from '@/components/fm/InputTime/InputTime.vue';
import InputTimeDemo from './InputTimeDemo.vue';

const meta = {
	title: 'Components/FmInputTime',
	component: FmInputTime,
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
			FmInputTime
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
			<FmInputTime v-bind="args" :key="key" />`
	})
};

export const Demo = {
	render: (args) => ({
		components: {
			InputTimeDemo
		},
		setup() {
			return { args };
		},
		template: `
			<InputTimeDemo />`
	})
};
