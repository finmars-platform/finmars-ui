<template>
	<VChip
		:variant="variant"
		:closable="closable"
		:prepend-icon="prependIcon"
		:append-icon="appendIcon"
	>
		<slot />
	</VChip>
</template>

<script setup>
	import { VChip } from 'vuetify/components'

	defineProps({
		variant: String,
		closable: Boolean,
		prependIcon: String,
		appendIcon: String
	})
</script>

<style>
	:root {
	}

	body.dark-mode {
	}
</style>
