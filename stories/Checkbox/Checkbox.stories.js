import { ref } from 'vue'
import FmCheckbox from '@/components/fm/Checkbox/Checkbox.vue'
import CheckboxDemo from './CheckboxDemo.vue'

const meta = {
	title: 'Components/FmCheckbox',
	component: FmCheckbox,
	args: {
		disabled: false,
		error: false
	}
}

export default meta

export const Default = {
	render: (args) => ({
		components: {
			FmCheckbox
		},
		setup() {
			const value = ref(true)

			return {
				args,
				value
			}
		},
		template: `
			<FmCheckbox v-bind="args" v-model="value" />`
	})
}

export const List = {
	render: (args) => ({
		components: {
			CheckboxDemo
		},
		setup() {
			return {
				args
			}
		},
		template: `
			<CheckboxDemo />`
	})
}
