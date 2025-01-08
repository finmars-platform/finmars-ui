import { ref, watch } from 'vue';
import FmIcon from '@/components/fm/Icon/Icon.vue';
import IconDemo from './IconDemo.vue';

const meta = {
	title: 'Components/FmIcon',
	component: FmIcon,
	argTypes: {},
	args: {
		icon: 'mdi-star'
	}
};

export default meta;

export const General = {
	render: (args) => ({
		components: {
			FmIcon
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
			<FmIcon v-bind="args" :key="key" />`
	})
};

export const Demo = {
	render: (args) => ({
		components: {
			IconDemo
		},
		setup() {
			return { args };
		},
		template: `
			<IconDemo />`
	})
};
