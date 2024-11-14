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
		type: {
			control: 'select',
			options: ['normal', 'large']
		},
		dot: {
			control: 'select',
			options: ['row', 'column']
		}
	},
	args: {
		underline: 'thin',
		type: 'normal',
		dot: '',
		defaultTab: 0,
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
