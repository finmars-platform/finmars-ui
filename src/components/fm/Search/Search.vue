<template>
	<VAutocomplete
		:items="items"
		class="search"
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
		color="var(--color-search)"
		bg-color="var(--backgroundColor-search)"
		prepend-icon-color="var(--prependIconColor-search)"
		loader-color="red"
		text-color="green"
		border-color="bl"
	/>
</template>

<script setup>
	import { VAutocomplete } from 'vuetify/components'

	defineProps({
		rounded: Boolean,
		style: String,
		items: Array,
		variant: String
	})
</script>

<style>
	:root {
		--color-search: var(--on-surface-color);
		--backgroundColor-search: var(--surface-container);
		--prependIconColor-search: var(--secondary-color);
	}

	body.dark-mode {
		--color-search: var(--on-surface-color);
		--backgroundColor-search: var(--surface-container);
		--prependIconColor-search: #d8c2bc;
	}
</style>
