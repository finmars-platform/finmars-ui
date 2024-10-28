import { ref, watch } from 'vue'
import FmButton from '@/components/fm/Button/Button.vue'
import ButtonDemo from './ButtonDemo.vue'

const meta = {
	title: 'Components/FmButton',
	component: FmButton,
	argTypes: {
		type: {
			control: 'select',
			options: ['primary', 'secondary', 'tertiary', 'icon'],
		},
		prependIcon:  {
			control: 'select',
			options: [undefined, 'mdi-plus', 'mdi-open-in-new']
		},
		appendIcon: {
			control: 'select',
			options: [undefined, 'mdi-plus', 'mdi-open-in-new']
		},
	},
	args: {},
}

export default meta

export const General = {
	render: (args) => ({
		components: {
			FmButton
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
			<FmButton v-bind="args" :key="key">
				Label
			</FmButton>
		`,
	})
}

export const Default = {
	render: (args) => ({
		components: {
			FmButton
		},
		setup() {
			return { args }
		},
		template: `<FmButton>Primary</FmButton>`,
	})
}

export const DefaultRounded = {
	render: (args) => ({
		components: {
			FmButton
		},
		setup() {
			return { args }
		},
		template: `
			<FmButton rounded>
				Primary
			</FmButton>
		`,
	})
}

export const DefaultWithPrependIcon = {
	render: (args) => ({
		components: {
			FmButton
		},
		setup() {
			return { args }
		},
		template: `<FmButton prepend-icon="mdi-plus">Primary</FmButton>`,
	})
}

export const DefaultWithPrependSlot = {
	render: (args) => ({
		components: {
			FmButton
		},
		setup() {
			return { args }
		},
		template: `
			<FmButton>
				Primary
				<template #prepend>
					<div style="position: relative; width: 10px; height: 10px; border-radius: 50%; background-color: #66bf3c" />
				</template>
			</FmButton>
		`,
	})
}

export const DefaultWithAppendIcon = {
	render: (args) => ({
		components: {
			FmButton
		},
		setup() {
			return { args }
		},
		template: `<FmButton append-icon="mdi-plus">Primary</FmButton>`,
	})
}

export const DefaultWithAppendSlot = {
	render: (args) => ({
		components: {
			FmButton
		},
		setup() {
			return { args }
		},
		template: `
			<FmButton>
				Primary
				<template #append>
					<div style="position: relative; width: 10px; height: 10px; border-radius: 50%; background-color: orange" />
				</template>
			</FmButton>
		`,
	})
}

export const Secondary = {
	render: (args) => ({
		components: {
			FmButton
		},
		setup() {
			return { args }
		},
		template: `<FmButton type="secondary">Secondary</FmButton>`,
	})
}

export const Tertiary = {
	render: (args) => ({
		components: {
			FmButton
		},
		setup() {
			return { args }
		},
		template: `<FmButton type="tertiary">Tertiary</FmButton>`,
	})
}

export const AllVariants = {
	render: (args) => ({
		components: {
			ButtonDemo
		},
		setup() {
			return { args }
		},
		template: `<ButtonDemo />`,
	})
}
