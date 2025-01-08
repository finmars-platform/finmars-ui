import { ref, watch } from 'vue';
import FmRangeSlider from '@/components/fm/RangeSlider/RangeSlider.vue';

const meta = {
	title: 'Components/FmRangeSlider',
	component: FmRangeSlider,
	argTypes: {
		modelValue: [0, 100],
		min: {
			control: 'number',
			min: 0,
			max: 100,
			step: 1
		},
		max: {
			control: 'number',
			min: 0,
			max: 100,
			step: 1
		},
		step: {
			control: 'number',
			min: 1,
			max: 100,
			step: 1
		},
		disabled: {
			control: 'boolean'
		}
	},
	args: {
		modelValue: [0, 100]
	}
};

export default meta;

export const General = {
	render: (args) => ({
		components: {
			FmRangeSlider
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
			<FmRangeSlider v-bind="args" :key="key" />
		`
	})
};
