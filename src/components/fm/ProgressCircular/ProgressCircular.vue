<template>
	<VProgressCircular :model-value="modelValue" v-bind="vProgressCircularProps">
		<template v-if="showValue" #default>
			<span :style="displayingValueStyle">{{ modelValue }}%</span>
		</template>
	</VProgressCircular>
</template>

<script setup>
	import { computed } from 'vue';
	import { VProgressCircular } from 'vuetify/components';

	const props = defineProps({
		modelValue: {
			type: [String, Number],
			default: 0
		},
		size: {
			type: [String, Number],
			default: 44
		},
		showValue: {
			type: [Boolean, undefined]
		},
		indeterminate: {
			type: [Boolean, undefined]
		}
	});

	const vProgressCircularProps = computed(() => ({
		size: props.size,
		color: 'var(--primary)',
		bgColor: props.indeterminate ? 'transparent' : 'var(--primary-container)',
		indeterminate: !!props.indeterminate
	}));

	const displayingValueStyle = computed(() => ({
		fontSize: `${Math.round(Number(props.size / 4))}px`,
		fontWeight: 600
	}));
</script>
