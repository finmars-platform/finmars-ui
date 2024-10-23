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
		color: 'var(--primary)',
		bgColor: 'var(--primary-container)',
		bufferColor: 'var(--primary-container)',
		bgOpacity: 1,
		indeterminate: !!props.indeterminate,
	}))
</script>
