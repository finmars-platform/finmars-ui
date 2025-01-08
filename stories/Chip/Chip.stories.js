import { ref, watch } from 'vue';
import FmChip from '@/components/fm/Chip/Chip.vue';
import ChipDemo from './ChipDemo.vue';

const meta = {
	title: 'Components/FmChip',
	component: FmChip,
	argTypes: {},
	args: {
		value: 'Label'
	}
};

export default meta;

export const General = {
	render: (args) => ({
		components: {
			FmChip
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
			<FmChip v-bind="args" :key="key">
				Label
			</FmChip>
		`
	})
};

export const Demo = {
	render: (args) => ({
		components: {
			ChipDemo
		},
		setup() {
			return { args };
		},
		template: `
			<ChipDemo />`
	})
};
