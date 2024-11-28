import { ref, watch } from 'vue'
import FmFilterToolbar from '@/components/fm/Filters/FilterToolbar/FilterToolbar.vue'
import FilterDemo from './FilterDemo.vue'

const meta = {
	title: 'Components/FmFilterToolbar',
	component: FmFilterToolbar,
	argTypes: {},
	args: {}
}

export default meta

export const General = {
	render: (args) => ({
		components: {
			FmFilterToolbar
		},
		setup() {
			const key = ref(1)

			watch(args, () => {
				key.value = new Date().getTime()
			})

			const eventHandlers = {
				'click:prepend': (ev) =>
					console.log(`The 'click:prepend' event triggered. `, ev),
				'click:append': (ev) =>
					console.log(`The 'click:append' event triggered. `, ev)
			}

			return {
				args,
				key,
				eventHandlers
			}
		},
		template: `
			<FmFilterToolbar v-bind="args" :key="key" v-on="eventHandlers" />`
	})
}

export const Demo = {
	render: (args) => ({
		components: {
			FilterDemo
		},
		setup() {
			return {
				args
			}
		},
		template: `
			<FilterDemo />`
	})
}
