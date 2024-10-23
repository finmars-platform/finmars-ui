<template>
	<VAutocomplete
		:items="items"
		density="comfortable"
		menu-icon=""
		placeholder="Search"
		prepend-inner-icon="mdi-magnify"
		:variant="variant"
		clearable
		auto-select-first
		item-props
		:rounded="rounded"
		:style="style"
		color="var(--on-surface-variant)"
		bg-color="var(--surface-container)"
		prepend-icon-color="var(--on-surface-variant)"
		hide-details="hideDetails"
		loader-color="red"
		text-color="green"
		border-color="bl"
	/>
</template>

<script setup>
	import { VAutocomplete } from 'vuetify/components'

	defineProps({
		rounded: {
			type: Boolean,
		},
		style: {
			type: Object,
			default: () => ({}),
		},
		items: {
			type: Array,
			default: () => [],
		},
		variant: {
			type: String,
			default: 'solo',
			validator(value) {
				return ['outlined', 'plain', 'underlined', 'filled', 'solo', 'solo-inverted', 'solo-filled'].includes(value)
			},
		},
		hideDetails: {
			type: Boolean
		},
	})
</script>
