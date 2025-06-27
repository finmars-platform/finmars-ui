import FmLogo from '@/components/fm/Logo/Logo.vue';
import { ref, watch } from 'vue';
import { useTheme } from 'vuetify';

const meta = {
	title: 'Components/FmLogo',
	component: FmLogo,
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'normal']
		},
		theme: {
			control: false
		},
		maxHeight: {
			control: false
		}
	},
	args: {}
};

export default meta;

export const Default = {
	render: (args) => ({
		components: {
			FmLogo
		},
		setup() {
			const key = ref(1);
			const theme = useTheme();

			watch(args, () => {
				key.value = new Date().getTime();
			});

			return {
				args,
				key,
				theme
			};
		},
		template: `
			<FmLogo v-bind="args" :theme="theme?.global?.name?.value" maxHeight="30" :key="key" />`
	})
};
