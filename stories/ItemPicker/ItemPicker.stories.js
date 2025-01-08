import { ref, watch } from 'vue';
import FmItemPicker from '@/components/fm/ItemPicker/ItemPicker/ItemPicker.vue';
import ItemPickerDemo from './ItemPickerDemo.vue';

const meta = {
	title: 'Components/FmItemPicker',
	component: FmItemPicker,
	argTypes: {
		minutesStep: {
			control: 'select',
			options: [1, 2, 5, 10, 15, 20, 30]
		}
	},
	args: {
		minutesStep: 1
	}
};

export default meta;

export const General = {
	render: (args) => ({
		components: {
			FmItemPicker
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
			<FmItemPicker v-bind="args" :key="key" />
		`
	})
};

export const AllVariants = {
	render: (args) => ({
		components: {
			ItemPickerDemo
		},
		setup() {
			return { args };
		},
		template: `
			<ItemPickerDemo />`
	})
};
