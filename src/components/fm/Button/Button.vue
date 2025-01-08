<template>
	<VBtn
		v-bind="vBtnProps"
		:class="[
			'fm-button',
			{
				'fm-button--primary': type === 'primary',
				'fm-button--rounded': rounded
			}
		]"
		:style="vBtnStyle"
	>
		<template #default>
			<slot />
		</template>

		<template #loader>
			<slot name="loader">
				<VProgressCircular v-if="loading" indeterminate />
			</slot>
		</template>

		<template #append>
			<slot name="append">
				<VIcon v-if="appendIcon" :icon="appendIcon" />
			</slot>
		</template>

		<template #prepend>
			<slot name="prepend">
				<VIcon v-if="prependIcon" :icon="prependIcon" />
			</slot>
		</template>
	</VBtn>
</template>

<script setup>
	import { computed } from 'vue';
	import { VBtn, VIcon, VProgressCircular } from 'vuetify/components';

	const props = defineProps({
		type: {
			type: String,
			default: 'primary',
			validator(value) {
				return ['primary', 'secondary', 'tertiary'].includes(value);
			}
		},
		href: {
			type: [String, undefined]
		},
		to: {
			type: [String, Object, undefined]
		},
		minWidth: {
			type: [String, Number, undefined]
		},
		rounded: {
			type: Boolean
		},
		loading: {
			type: Boolean
		},
		appendIcon: {
			type: [String, undefined]
		},
		prependIcon: {
			type: [String, undefined]
		},
		tag: {
			type: String
		},
		symbol: {
			type: [String, Object]
		},
		disabled: {
			type: Boolean
		},
		icon: {
			type: Boolean
		}
	});

	const vBtnProps = computed(() => {
		const value = {
			flat: true,
			disabled: !!props.disabled || !!props.loading,
			loading: !!props.loading,
			...(props.to && { to: props.to }),
			...(props.href && { href: props.href }),
			...(props.minWidth && { minWidth: props.minWidth }),
			...(props.type === 'primary' && { variant: 'flat' }),
			...(props.type === 'secondary' && { variant: 'text' }),
			...(props.type === 'tertiary' && { variant: 'outlined' }),
			...(props.tag && { tag: props.tag }),
			...(props.icon && { icon: props.icon }),
			...(props.symbol && { symbol: props.symbol })
		};

		if (props.type === 'primary') {
			value['base-color'] = 'var(--on-primary)';
			value.color = 'var(--primary)';
		}

		return value;
	});

	const vBtnStyle = computed(() => {
		const value = {};

		if (props.type === 'primary') {
			value['--color-fmButton'] = 'var(--on-primary)';
		}

		if (props.type === 'secondary') {
			value['--color-fmButton'] = 'var(--primary)';
		}

		if (props.type === 'tertiary') {
			value['--color-fmButton'] = 'var(--on-surface)';
		}

		return value;
	});
</script>

<style lang="scss" scoped>
	.fm-button {
		--color-fmButton: var(--on-primary);

		color: var(--color-fmButton) !important;
		max-width: max-content !important;

		&.fm-button--primary:hover {
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
		}

		&--rounded {
			border-radius: 24px;
		}
	}
</style>
