import { ref, watch } from 'vue';
import FmDateTree from '@/components/fm/DateTree/DateTree.vue';
import DateTreeDemo from './DateTreeDemo.vue';

const meta = {
	title: 'Components/FmDateTree',
	component: FmDateTree,
	argTypes: {},
	args: {
		data: []
	}
};

export default meta;

export const General = {
	render: (args) => ({
		components: {
			FmDateTree
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
			<FmDateTree v-bind="args" :key="key" />`
	})
};

export const Demo = {
	render: (args) => ({
		components: {
			DateTreeDemo
		},
		setup() {
			return { args };
		},
		template: `
			<DateTreeDemo />`
	})
};
