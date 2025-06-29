import { ref, watch } from 'vue';
import FmTabs from '@/components/fm/Tabs/Tabs.vue';
import TabsDemo from './TabsDemo.vue';

const meta = {
	title: 'Components/FmTabs',
	component: FmTabs,
	argTypes: {
		underline: {
			control: 'select',
			options: ['thin', 'bold']
		},
		variant: {
			control: 'select',
			options: ['normal', 'large']
		},
		icon: {
			control: 'select',
			options: 'mdi-home-account'
		},
		size: {
			control: 'select',
			options: ['normal', 'small']
		},
		appendIcon: {
			control: 'select',
			options: false
		},
		prependIcon: {
			control: 'select',
			options: false
		}
	},
	args: {
		underline: 'thin',
		type: 'normal',
		dot: '',
		defaultTab: 0,
		icon: 'mdi-home-account',
		size: 'normal',
		appendIcon: false,
		prependIcon: false,
		disabled: false
	}
};

export default meta;

export const General = {
	render: (args) => ({
		components: {
			FmTabs
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
			<FmTabs v-bind="args" :key="key" />
		`
	})
};

export const AllVariants = {
	render: (args) => ({
		components: {
			TabsDemo
		},
		setup() {
			return { args };
		},
		template: `
			<TabsDemo />`
	})
};
