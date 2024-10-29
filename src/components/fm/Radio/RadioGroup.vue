<template>
	<VRadioGroup
		class="fm-radio-group"
		v-bind="vRadioGroupProps"
		@update:model-value="emits('update:modelValue', $event)"
	>
		<slot />
	</VRadioGroup>
</template>

<script setup>
	import { computed } from 'vue'
	import { VRadioGroup } from 'vuetify/components'

	const props = defineProps({
		modelValue: {
			type: [String, Number, Boolean],
		},
		name: {
			type: String,
		},
		label: {
			type: String,
		},
		direction: {
			type: String,
			default: 'horizontal',
			validator(value) {
				return ['horizontal', 'vertical'].includes(value)
			},
		},
		readonly: {
			type: Boolean,
		},
		disabled: {
			type: Boolean,
		},
	})

	const emits = defineEmits([
		'update:modelValue',
	])

	const vRadioGroupProps = computed(() => ({
		color: 'var(--primary)',
		modelValue: props.modelValue,
		...(props.name && { name: props.name }),
		label: props.label,
		readonly: props.readonly,
		disabled: props.disabled,
		hideDetails: true,
		inline: props.direction === 'horizontal',
	}))
</script>

<style scoped>
	.fm-radio-group.v-input--disabled {
		opacity: 0.3;
	}
</style>
