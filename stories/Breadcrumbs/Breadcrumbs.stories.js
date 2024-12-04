import { ref, watch } from 'vue'
import FmBreadcrumbs from '@/components/fm/Breadcrumbs/Breadcrumbs.vue'
import BreadcrumbsDemo from './BreadcrumbsDemo.vue'

const meta = {
	title: 'Components/FmBreadcrumbs',
	component: FmBreadcrumbs,
	argTypes: {},
	args: {}
}

export default meta

export const General = {
	render: (args) => ({
		components: {
			FmBreadcrumbs
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
        <FmBreadcrumbs v-bind="args" :key="key"/>
    `
	})
}

export const AllVariants = {
	render: (args) => ({
		components: {
			BreadcrumbsDemo
		},
		setup() {
			return { args }
		},
		template: `
        <BreadcrumbsDemo/>`
	})
}
