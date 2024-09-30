<template>
	<VCheckbox
		:modelValue="modelValue"
		:value="value"
		:color="color"
		:disabled="disabled"
		:base-color="baseColor"
		@update:modelValue="(newVal) => emit('update:modelValue', newVal)"
		hide-details
	/>
</template>

<script setup>
	import { VCheckbox } from 'vuetify/components'
	import { computed } from 'vue'

	const props = defineProps({
		modelValue: Boolean,
		disabled: Boolean,
		error: Boolean,
		value: {
			default: true
		}
	})

	const emit = defineEmits(['update:modelValue'])

	const color = computed(() => {
		if (props.error) {
			return 'var(--backgroundColor-error-checkbox)'
		} else if (props.disabled) {
			return undefined
		} else {
			return 'var(--backgroundColor-checkbox)'
		}
	})

	const baseColor = computed(() => {
		if (props.error) {
			return 'var(--backgroundColor-error-checkbox)'
		} else if (props.disabled) {
			return undefined
		} else {
			return 'var(--borderColor-checkbox)'
		}
	})
</script>

<style>
	:root {
		--backgroundColor-checkbox: var(--primary-color);
		--backgroundColor-error-checkbox: var(--error-color);
		--borderColor-checkbox: var(--secondary-color);
	}

	body.dark-mode {
		--backgroundColor-checkbox: var(--primary-color);
		--backgroundColor-error-checkbox: var(--error-color);
		--borderColor-checkbox: var(--secondary-color);
	}
</style>
