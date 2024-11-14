import { ref, watch } from 'vue'
import FmTab from '@/components/fm/Tab/Tab.vue'
import TabDemo from './TabDemo.vue'

const meta = {
	title: 'Components/FmTab',
	component: FmTab,
	argTypes: {
		underline: {
			control: 'select',
			options: ['thin', 'bold']
		},
		variant: {
			control: 'select',
			options: ['normal', 'large']
		},
		icon: {
			control: 'select',
			options: undefined
		},
		size: {
			control: 'select',
			options: ['normal', 'small']
		},
		appendIcon: {
			control: 'select',
			options: false
		},
		prependIcon: {
			control: 'select',
			options: false
		}
	},
	args: {
		underline: 'thin',
		type: 'normal',
		dot: '',
		defaultTab: 0,
		icon: undefined,
		size: 'normal',
		appendIcon: false,
		prependIcon: false,
		disabled: false
	}
}

export default meta

export const General = {
	render: (args) => ({
		components: {
			FmTab
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
        <FmTab v-bind="args" :key="key"/>
    `
	})
}

export const AllVariants = {
	render: (args) => ({
		components: {
			TabDemo
		},
		setup() {
			return { args }
		},
		template: `
        <TabDemo/>`
	})
}
