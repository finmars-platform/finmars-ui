<template>
	<VCheckbox
		:modelValue="modelValue"
		:value="value"
		:color="color"
		:disabled="disabled"
		:base-color="baseColor"
		class="fm-checkbox"
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

<style scoped>
	.fm-checkbox {
		--backgroundColor-checkbox: var(--primary);
		--backgroundColor-error-checkbox: var(--error);
		--borderColor-checkbox: var(--secondary);
	}
</style>
