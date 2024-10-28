import FmBtn from '@/components/fm/Btn/Btn.vue'
import { ref, watch } from 'vue'

const meta = {
	title: 'Components/FmBtn',
	component: FmBtn,
	argTypes: {
		variant: {
			control: 'select',
			options: ['solo', 'text', 'flat']
		}
	},
	args: {
		rounded: true,
		variant: 'solo'
	}
}

export default meta

export const Default = {
	render: (args) => ({
		components: {
			FmBtn
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
			<FmBtn v-bind="args" :key="key">Label</FmBtn>`
	})
}
