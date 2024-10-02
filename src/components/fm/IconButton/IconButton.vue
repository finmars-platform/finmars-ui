<template>
	<VBtn
		rounded="xl"
		:variant="variant"
		:disabled="disabled"
		:size="buttonSize"
		color="var(--backgroundColor-iconButton)"
	>
		<VIcon :icon="icon" :size="iconSize" color="var(--iconColor-iconButton)" />
	</VBtn>
</template>

<script setup>
	import { VBtn, VIcon } from 'vuetify/components'
	import { computed } from 'vue'

	const props = defineProps({
		size: String, // normal, small
		icon: String,
		disabled: Boolean,
		variant: String // tonal, filled, outlined, default
	})

	const buttonSize = computed(() => {
		if (props.size === 'small') {
			return '32'
		} else {
			return '40'
		}
	})

	const iconSize = computed(() => {
		if (props.size === 'small') {
			return '16'
		} else {
			return '24'
		}
	})
</script>

<style>
	:root {
		--backgroundColor-iconButton: var(--on-primary-color);
		--iconColor-iconButton: var(--primary-color);
	}

	body.dark-mode {
		--backgroundColor-iconButton: var(--on-primary-color);
		--iconColor-iconButton: var(--primary-color);
	}
</style>
