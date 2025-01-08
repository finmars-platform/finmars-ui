import { ref, watch } from 'vue';
import FmInputDate from '@/components/fm/InputDate/InputDate.vue';
import InputDateDemo from './InputDateDemo.vue';

const meta = {
	title: 'Components/FmInputDate',
	component: FmInputDate,
	argTypes: {},
	args: {}
};

export default meta;

export const General = {
	render: (args) => ({
		components: {
			FmInputDate
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
			<div class="relative w-[200px]">
				<FmInputDate v-bind="args" :key="key" />
			</div>`
	})
};

export const Demo = {
	render: (args) => ({
		components: {
			InputDateDemo
		},
		setup() {
			return {
				args
			};
		},
		template: `
			<InputDateDemo />`
	})
};
