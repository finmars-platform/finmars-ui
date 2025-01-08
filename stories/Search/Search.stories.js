import { ref, watch } from 'vue';
import FmSearch from '@/components/fm/Search/Search.vue';
import SearchDemo from './SearchDemo.vue';

const meta = {
	title: 'Components/FmSearch',
	component: FmSearch,
	argTypes: {},
	args: {}
};

export default meta;

export const Default = {
	render: (args) => ({
		components: {
			FmSearch
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
			<FmSearch v-bind="args" :key="key" />`
	})
};

export const AllVariants = {
	render: (args) => ({
		components: {
			SearchDemo
		},
		setup() {
			return { args };
		},
		template: `
			<SearchDemo />`
	})
};
