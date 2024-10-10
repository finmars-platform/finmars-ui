<template>
	<VBtn
		:variant="variant || undefined"
		:icon="icon"
		:rounded="rounded || undefined"
		:href="href || undefined"
	>
		<slot />
	</VBtn>
</template>

<script setup>
	import { VBtn } from 'vuetify/components'

	defineProps({
		icon: Boolean,
		rounded: Boolean,
		variant: String, // 'text'
		href: String
	})
</script>

<style>
	:root {
	}

	body.dark-mode {
	}
</style>
