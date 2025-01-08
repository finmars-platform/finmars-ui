import { ref, watch } from 'vue';
import FmPagination from '@/components/fm/Pagination/Pagination.vue';
import PaginationDemo from './PaginationDemo.vue';

const meta = {
	title: 'Components/FmPagination',
	component: FmPagination,
	argTypes: {},
	args: {}
};

export default meta;

export const General = {
	render: (args) => ({
		components: {
			FmPagination
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
			<FmPagination v-bind="args" :key="key" />
		`
	})
};

export const AllVariants = {
	render: (args) => ({
		components: {
			PaginationDemo
		},
		setup() {
			return { args };
		},
		template: `
			<PaginationDemo />`
	})
};
