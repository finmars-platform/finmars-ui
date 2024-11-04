import { ref, watch } from 'vue'
import FmItemPicker from '@/components/fm/ItemPicker/ItemPicker.vue'
import ItemPickerDemo from './ItemPickerDemo.vue'

const meta = {
	title: 'Components/FmItemPicker',
	component: FmItemPicker,
	argTypes: {},
	args: {},
}

export default meta

export const General = {
	render: (args) => ({
		components: {
			FmItemPicker
		},
		setup() {
			const key = ref(1)

			watch(args, () => {
				key.value = new Date().getTime()
			})

			return {
				args,
				key
			}
		},
		template: `
			<FmItemPicker v-bind="args" :key="key" />
		`,
	})
}

export const AllVariants = {
	render: (args) => ({
		components: {
			ItemPickerDemo
		},
		setup() {
			return { args }
		},
		template: `<ItemPickerDemo />`,
	})
}
