import { ref, watch } from 'vue';
import FmSlider from '@/components/fm/Slider/Slider.vue';
import SliderDemo from './SliderDemo.vue';

const meta = {
	title: 'Components/FmSlider',
	component: FmSlider,
	argTypes: {
		modelValue: 0,
		type: {
			control: 'select',
			options: ['continuous', 'discrete', 'centered']
		},
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
		modelValue: 0
	}
};

export default meta;

export const General = {
	render: (args) => ({
		components: {
			FmSlider
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
			<FmSlider v-bind="args" :key="key" />
		`
	})
};

export const AllVariants = {
	render: (args) => ({
		components: {
			SliderDemo
		},
		setup() {
			return { args };
		},
		template: `
			<SliderDemo />`
	})
};
