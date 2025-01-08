import { ref, watch } from 'vue';
import FmSwitch from '@/components/fm/Switch/Switch.vue';
import SwitchDemo from './SwitchDemo.vue';

const meta = {
	title: 'Components/FmSwitch',
	component: FmSwitch,
	argTypes: {
		icon: {
			control: 'select',
			options: false
		},
		disable: {
			control: 'select',
			options: false
		}
	},
	args: {
		icon: false,
		disable: false
	}
};

export default meta;

export const General = {
	render: (args) => ({
		components: {
			FmSwitch
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
			<FmSwitch v-bind="args" :key="key" />
		`
	})
};

export const AllVariants = {
	render: (args) => ({
		components: {
			SwitchDemo
		},
		setup() {
			return { args };
		},
		template: `
			<SwitchDemo />`
	})
};
