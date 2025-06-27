import { ref, watch } from 'vue';
import FmRadio from '@/components/fm/Radio/Radio.vue';
import RadioDemo from './RadioDemo.vue';

const meta = {
	title: 'Components/FmRadio',
	component: FmRadio,
	argTypes: {},
	args: {}
};

export default meta;

export const Default = {
	render: (args) => ({
		components: {
			FmRadio
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
			<FmRadio v-bind="args" :key="key" />`
	})
};

export const Selected = {
	render: (args) => ({
		components: {
			FmRadio
		},
		setup() {
			return {
				args
			};
		},
		template: `
			<FmRadio :model-value="true" />`
	})
};

export const AllVariants = {
	render: (args) => ({
		components: {
			RadioDemo
		},
		setup() {
			return { args };
		},
		template: `
			<RadioDemo />`
	})
};
