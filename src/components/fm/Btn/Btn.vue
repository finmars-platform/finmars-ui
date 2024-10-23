<template>
	<VBtn
		color="var(--primary)"
		base-color="var(--primary)"
		:style="{
			color: variant === 'text' ? 'var(--primary)' : 'var(--on-primary)',
			backgroundColor: variant === 'text' ? 'var(--on-primary)' : 'var(--primary)',
		}"
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
