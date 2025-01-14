import FmDialog from '@/components/fm/Dialog/Dialog.vue';
import DialogDemo from './DialogDemo.vue';

const meta = {
	title: 'Components/FmDialog',
	component: FmDialog,
	argTypes: {},
	args: {}
};

export default meta;

export const Demo = {
	render: (args) => ({
		components: {
			DialogDemo
		},
		setup() {
			return {
				args
			};
		},
		template: `
			<DialogDemo />`
	})
};
