<template>
	<VRadio
		v-bind="vRadioProps"
		v-model="innerValue"
		class="fm-radio"
		@click="emits('click', $event)"
	>
		<template #label>
			<slot name="label">
				<div v-if="label" class="fm-radio__label">
					{{ label }}
				</div>
			</slot>
		</template>
	</VRadio>
</template>

<script setup>
	import { computed, ref, watch } from 'vue'
	import { VRadio } from 'vuetify/components'

	const props = defineProps({
		modelValue: {
			type: [String, Number, Boolean],
		},
		value: {
			type: [String, Number, Boolean],
		},
		id: {
			type: String,
		},
		name: {
			type: String,
		},
		label: {
			type: String,
		},
		falseValue: {
			type: [String, Number, Boolean, undefined],
			default: undefined,
		},
		trueValue: {
			type: [String, Number, Boolean, undefined],
			default: undefined,
		},
		readonly: {
			type: Boolean,
		},
		disabled: {
			type: Boolean,
		},
	})

	const emits = defineEmits([
		'click',
		'update:modelValue',
	]);

	const innerValue = ref(props.modelValue)

	const vRadioProps = computed(() => ({
		type: 'radio',
		color: 'var(--primary)',
		...(props.id && { id: props.id }),
		...(props.name && { name: props.name }),
		value: props.value,
		label: props.label,
		falseValue: props.falseValue,
		trueValue: props.trueValue,
		readonly: props.readonly,
		disabled: props.disabled,
	}))

	watch(
		() => innerValue.value,
		(val) => {
			emits('update:modelValue', val)
		},
		{ immediate: true },
	)
</script>

<style scoped>
	.fm-radio {
		max-width: max-content;
	}

	.fm-radio__label {
		font-size: 14px;
		line-height: 20px;
		font-weight: 500;
		color: var(--on-surface);
	}
</style>
