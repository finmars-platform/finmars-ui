import { ref, watch } from 'vue';
import FmDateEditor from '@/components/fm/DateEditor/DateEditor.vue';
import DateEditorDemo from './DateEditorDemo.vue';

const meta = {
	title: 'Components/FmDateEditor',
	component: FmDateEditor,
	argTypes: {},
	args: {}
};

export default meta;

export const General = {
	render: (args) => ({
		components: {
			FmDateEditor
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
			<FmDateEditor :key="key" v-bind="args" />
		`
	})
};

export const AllVariants = {
	render: (args) => ({
		components: {
			DateEditorDemo
		},
		setup() {
			return { args };
		},
		template: `
			<DateEditorDemo />`
	})
};
