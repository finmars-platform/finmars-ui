import FmImg from '@/components/fm/Img/Img.vue'
import { ref, watch } from 'vue'

const meta = {
	title: 'Components/FmImg',
	component: FmImg,
	argTypes: {
		aspectRatio: {
			control: 'select',
			options: ['16/9', null, '4/3', '1/1']
		},
		width: {
			control: 'select',
			options: ['100', null, '300', '200']
		},
		height: {
			control: 'select',
			options: ['100', null, '300', '200']
		},
		maxHeight: {
			control: 'select',
			options: ['100', null, '300', '200']
		},
		maxWidth: {
			control: 'select',
			options: ['100', null, '300', '200']
		}
	},
	args: {
		src: 'https://i.pravatar.cc/140',
		cover: false
	}
}

export default meta

export const Default = {
	render: (args) => ({
		components: {
			FmImg
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
          <FmImg v-bind="args" :key="key"/>`
	})
}
