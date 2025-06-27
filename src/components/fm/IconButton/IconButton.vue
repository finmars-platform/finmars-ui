<template>
	<VBtn
		:variant="variant"
		:disabled="disabled"
		:size="buttonSize"
		:icon="icon"
		:color="fmIconBtnColor.btnColor"
		:style="{ opacity: disabled ? '0.3' : '1' }"
		v-ripple.center.circle
	>
		<template #default>
			<VIcon :icon="icon" :size="iconSize" :color="fmIconBtnColor.iconColor" />
			<slot />
		</template>
	</VBtn>
</template>

<script setup>
	import { computed } from 'vue';
	import { VBtn, VIcon } from 'vuetify/components';
	import { Ripple } from 'vuetify/directives';

	const vRipple = Ripple;

	const props = defineProps({
		size: {
			type: String,
			default: 'normal',
			validator(value) {
				return ['normal', 'small'].includes(value);
			}
		},
		icon: {
			type: String,
			required: true
		},
		disabled: {
			type: Boolean
		},
		variant: {
			type: String,
			default: 'flat',
			validator(value) {
				return ['flat', 'outlined', 'text', 'tonal'].includes(value);
			}
		}
	});

	const buttonSize = computed(() => {
		if (props.size === 'small') {
			return '32';
		} else {
			return '40';
		}
	});

	const iconSize = computed(() => {
		if (props.size === 'small') {
			return '16';
		} else {
			return '24';
		}
	});

	const fmIconBtnColor = computed(() => {
		const btnColor = props.variant === 'text' ? 'var(--on-primary)' : 'var(--primary)';
		const iconColor = props.variant === 'flat' ? 'var(--on-primary)' : 'var(--primary)';

		return {
			btnColor,
			iconColor
		};
	});
</script>
