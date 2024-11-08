<template>
	<VIcon
		:icon="icon"
		:color="color ?? 'var(--primary)'"
		:size="size ?? 24"
		:start="start"
		:end="end"
		:tag="tag"
		:disabled="disabled"
	>
		<slot />
	</VIcon>
</template>

<script setup lang="ts">
	import { VIcon } from 'vuetify/components'
	import type { FmIconProps, FmIconSlots } from './types'

	defineProps<FmIconProps>()
	defineSlots<FmIconSlots>()
</script>
