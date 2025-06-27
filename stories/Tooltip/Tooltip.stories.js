import { ref, watch } from 'vue';
import FmTooltip from '@/components/fm/Tooltip/Tooltip.vue';
import FmButton from '@/components/fm/Button/Button.vue';
import TooltipDemo from './TooltipDemo.vue';

const meta = {
	title: 'Components/FmTooltip',
	component: FmTooltip,
	argTypes: {},
	args: {}
};

export default meta;

export const General = {
	render: (args) => ({
		components: {
			FmButton,
			FmTooltip
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
			<FmTooltip v-bind="args" :key="key">
				<template #activator="{ props }">
					<FmButton v-bind="props">Hover Over Me</FmButton>
				</template>

				<span>Tooltip text</span>
			</FmTooltip>
		`
	})
};

export const AllVariants = {
	render: (args) => ({
		components: {
			TooltipDemo
		},
		setup() {
			return { args };
		},
		template: `
			<TooltipDemo />`
	})
};
