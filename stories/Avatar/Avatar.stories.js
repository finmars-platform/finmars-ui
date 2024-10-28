import FmAvatar from '@/components/fm/Avatar/Avatar.vue'
import AvatarDemo from './AvatarDemo.vue'
import { ref, watch } from 'vue'

const meta = {
	title: 'Components/FmAvatar',
	component: FmAvatar,
	argTypes: {
		size: {
			control: 'select',
			options: [40, 50, 60, 80]
		}
	},
	args: {
		image: 'https://cdn.vuetifyjs.com/images/john.jpg',
		size: 40
	}
}

export default meta

export const Default = {
	render: (args) => ({
		components: {
			FmAvatar
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
          <FmAvatar v-bind="args" :key="key"/>`
	})
}

export const List = {
	render: (args) => ({
		components: {
			AvatarDemo
		},
		setup() {
			return {
				args
			}
		},
		template: `
          <AvatarDemo />`
	})
}
