<template>
	<VCheckbox
		:label="label"
		:modelValue="modelValue"
		:value="value"
		:color="color"
		:disabled="disabled"
		:base-color="baseColor"
		:indeterminate="indeterminate"
		density="compact"
		class="fm-checkbox"
		@update:modelValue="(newVal) => emit('update:modelValue', newVal)"
		hide-details
	/>
</template>

<script setup>
	import { VCheckbox } from 'vuetify/components'
	import { computed } from 'vue'

	const props = defineProps({
		modelValue: {
			type: Boolean
		},
		label: {
			type: String
		},
		indeterminate: {
			type: Boolean
		},
		disabled: {
			type: Boolean
		},
		error: {
			type: Boolean
		},
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

<style lang="scss" scoped>
	.fm-checkbox {
		--backgroundColor-checkbox: var(--primary);
		--backgroundColor-error-checkbox: var(--error);
		--borderColor-checkbox: var(--secondary);
		--color-checkbox: var(--on-surface);

		:deep(.v-input__control) {
			.v-checkbox-btn {
				min-height: 32px;

				.v-label {
					font-size: 14px;
					color: var(--color-checkbox);
				}
			}
		}
	}
</style>
