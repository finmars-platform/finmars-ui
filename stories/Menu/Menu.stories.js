import { ref, watch } from 'vue';
import FmMenu from '@/components/fm/Menu/Menu.vue';
import FmButton from '@/components/fm/Button/Button.vue';
import MenuDemo from './MenuDemo.vue';

const meta = {
	title: 'Components/FmMenu',
	component: FmMenu,
	argTypes: {
		itemSize: {
			control: 'select',
			options: ['small', 'medium', 'large']
		}
	},
	args: {}
};

export default meta;

export const Default = {
	render: (args) => ({
		components: {
			FmMenu,
			FmButton
		},
		setup() {
			const key = ref(1);
			const v = ref(false);

			const items = ref([{ title: 'Item 1' }, { title: 'Item 2' }, { title: 'Item 3' }]);

			watch(args, () => {
				key.value = new Date().getTime();
			});

			return {
				args,
				items,
				v,
				key
			};
		},
		template: `
			<FmMenu v-bind="args" :key="key" v-model="v" :items="items">
				<template #activator="{ props }">
					<FmButton v-bind="props">
						Activator
					</FmButton>
				</template>
			</FmMenu>
		`
	})
};

export const AllVariants = {
	render: (args) => ({
		components: {
			MenuDemo
		},
		setup() {
			return { args };
		},
		template: `
			<MenuDemo />`
	})
};
