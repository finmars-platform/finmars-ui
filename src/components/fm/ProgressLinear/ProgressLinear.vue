<template>
	<VProgressLinear
		v-model="innerValue"
		v-bind="vProgressLinearProps"
	/>

</template>

<script setup>
	import { computed, ref } from 'vue'
	import { VProgressLinear } from 'vuetify/components'

	const props = defineProps({
		modelValue: {
			type: [String, Number],
			default: 0,
		},
		indeterminate: {
			type: [Boolean, undefined]
		},
	})

	const innerValue = ref(props.modelValue)

	const vProgressLinearProps = computed(() => ({
		rounded: true,
		roundedBar: true,
		color: 'var(--color-fmProgressLinear)',
		bgColor: 'var(--backgroundColor-fmProgressLinear)',
		bufferColor: 'var(--backgroundColor-fmProgressLinear)',
		bgOpacity: 1,
		indeterminate: !!props.indeterminate,
	}))
</script>

<style>
	:root {
		--color-fmProgressLinear: var(--primary-color);
		--backgroundColor-fmProgressLinear: var(--on-secondary-color);
	}

	body.dark-mode {
		--color-fmProgressLinear: var(--primary-color);
		--backgroundColor-fmProgressLinear: #723521;
	}
</style>
