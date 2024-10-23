<template>
	<VBadge
		color="var(--error)"
		text-color="var(--on-error)"
		:content="content"
		:dot="dot"
	>
		<slot></slot>
	</VBadge>
</template>

<script setup>
	import { VBadge } from 'vuetify/components'

	defineProps({
		content: String,
		dot: Boolean
	})
</script>
