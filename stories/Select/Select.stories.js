import FmSelect from '@/components/fm/Select/Select.vue';
import SelectDemo from './SelectDemo.vue';

const meta = {
	title: 'Components/FmSelect',
	component: FmSelect,
	argTypes: {},
	args: {}
};

export default meta;

export const Demo = {
	render: (args) => ({
		components: {
			SelectDemo
		},
		setup() {
			return { args };
		},
		template: `
			<SelectDemo />`
	})
};
