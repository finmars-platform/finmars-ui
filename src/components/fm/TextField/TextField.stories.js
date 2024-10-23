import { ref, watch } from 'vue'
import FmTextField from './TextField.vue'
import TextFieldList from './TextFieldList.vue'

const meta = {
	title: 'Components/FmTextField',
	component: FmTextField,
	argTypes: {
		name: {
			control: 'text',
		},
		label: {
			control: 'text',
		},
		placeholder: {
			control: 'text',
		},
		hint: {
			control: 'text',
		},
		prependIcon:  {
			control: 'select',
			options: [undefined, 'mdi-plus', 'mdi-magnify'],
		},
	},
	args: {},
}

export default meta

export const General = {
	render: (args) => ({
		components: {
			FmTextField
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
			<FmTextField v-bind="args" :key="key" />
		`,
	})
}

export const AllVariants = {
	render: (args) => ({
		components: {
			TextFieldList
		},
		setup() {
			return { args }
		},
		template: `<TextFieldList />`,
	})
}
