import { ref, watch } from 'vue';
import FmTransferList from '@/components/fm/TransferList/TransferList.vue';
import TransferListDemo from './TransferListDemo.vue';

const meta = {
	title: 'Components/FmTransferList',
	component: FmTransferList,
	argTypes: {},
	arg: {}
};

export default meta;

export const General = {
	render: (args) => ({
		components: {
			FmTransferList
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
			<FmTransferList v-bind="args" :key="key" />
		`
	})
};

export const Demo = {
	render: (args) => ({
		components: {
			TransferListDemo
		},
		setup() {
			return { args };
		},
		template: `
			<TransferListDemo />`
	})
};
