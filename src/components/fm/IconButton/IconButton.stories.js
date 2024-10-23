import FmIconButton from './IconButton.vue'
import IconButtonListStory from './IconButtonListStory.vue'
import { ref, watch } from 'vue'

const meta = {
	title: 'Components/FmIconButton',
	component: FmIconButton,
	argTypes: {
		icon: {
			control: 'select',
			options: ['mdi-plus', 'mdi-open-in-new'],
		},
		size: {
			control: 'select',
			options: ['normal', 'small'],
		},
		variant: {
			control: 'select',
			options: ['flat', 'outlined', 'text', 'tonal'],
		}
	},
	args: {
		size: 'normal',
		variant: 'flat',
		disabled: false,
		icon: 'mdi-plus',
	},
}

export default meta

export const Default = {
	render: (args) => ({
		components: {
			FmIconButton
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
          <FmIconButton v-bind="args" :key="key"/>`
	})
}

export const List = {
	render: (args) => ({
		components: {
			IconButtonListStory
		},
		setup() {
			return {
				args
			}
		},
		template: `
          <IconButtonListStory/>`
	})
}
