<template>
	<VSlider
		:model-value="innerValue"
		v-bind="vSliderProps"
		@click:append="emits('click:append', $event)"
		@click:prepend="emits('click:prepend', $event)"
		@end="emits('end', $event)"
		@start="emits('start', $event)"
		@update:model-value="onUpdate"
		:class="[
			'fm-slider',
			{ 'fm-slider--centered': props.type === 'centered' },
		]"
	>
		<template #prepend>
			<slot name="prepend" />
		</template>

		<template #append>
			<slot name="append" />
		</template>

		<template #thumb-label="{ modelValue }">
			<div class="fm-slider__thumbLabel">{{ getThumbLabel(modelValue) }}</div>
		</template>
	</VSlider>
</template>

<script setup>
	import { computed, ref, watch } from 'vue'
	import { VSlider } from 'vuetify/components'

	const props = defineProps({
		modelValue: {
			type: [String, Number],
			default: 0,
			required: true
		},
		type: {
			type: String,
			default: 'continuous',
			validator(value) {
				return ['continuous', 'discrete', 'centered'].includes(value)
			},
		},
		min: {
			type: [String, Number],
			default: 0,
			validator(value) {
				return !isNaN(Number(value));
			},
		},
		max: {
			type: [String, Number],
			default: 100,
			validator(value) {
				return !isNaN(Number(value));
			},
		},
		prependIcon: {
			type: [String, undefined],
		},
		appendIcon: {
			type: [String, undefined],
		},
		step: {
			type: [String, Number],
			default: 10,
			validator(value) {
				return !isNaN(Number(value));
			},
		},
		disabled: {
			type: Boolean,
		},
	})

	const emits = defineEmits([
		'click:append',
		'click:prepend',
		'end',
		'start',
		'update:modelValue',
	])

	const innerValue = ref(Number(props.modelValue));

	const vSliderProps = computed(() => ({
		color: 'var(--color-fmSlider)',
		disabled: !!props.disabled,
		hideDetails: true,
		min: props.type === 'centered' ? -Math.abs(Number(props.max))  : props.min,
		max: props.type === 'centered' ? Math.abs(Number(props.max)) : props.max,
		ripple: false,
		trackSize: 16,
		thumbColor: 'var(--color-fmSlider)',
		thumbLabel: true,
		thumbSize: 44,
		trackColor: 'var(--backgroundColor-fmSlider)',
		trackFillColor: 'var(--color-fmSlider)',
		rounded: true,
		showTicks: props.type === 'continuous' ? false : 'always',
		...(props.type !== 'continuous' && props.step  && { step: props.step }),
		...(props.prependIcon && { prependIcon: props.prependIcon }),
		...(props.appendIcon && { appendIcon: props.appendIcon }),
	}))

	function getThumbLabel(value) {
		return Number(value).toFixed()
	}

	function onUpdate(value) {
		innerValue.value = value
		emits('update:modelValue', value)
	}

	watch(
		() => props.modelValue,
		(val, oldValue) => {
			if (val !== oldValue) {
				innerValue.value = Number(props.modelValue)
			}
		},
	)
</script>

<style>
	:root {
		--color-fmSlider: var(--primary-color);
		--backgroundColor-fmSlider: var(--on-secondary-color);
		--backgroundColor-fmSlider-thumbLabel: #392e2b;
		--color-fmSlider-thumbLabel: #f5eff7;
	}

	body.dark-mode {
		--color-fmSlider: var(--primary-color);
		--backgroundColor-fmSlider: var(--on-secondary-color);
		--backgroundColor-fmSlider-thumbLabel: var(--on-surface-color);
		--color-fmSlider-thumbLabel: #392e2b;
	}
</style>

<style lang="scss" scoped>
	.fm-slider {
		--thumbWidth-fmSlider: 4px;

		:deep(.v-input__control) {
			.v-slider-thumb__surface {
				width: var(--thumbWidth-fmSlider);
				border-radius: calc(var(--thumbWidth-fmSlider) / 2);

				&:before {
					content: '';
					position: absolute;
					width: 16px;
					height: 20px;
					background-color: var(--base-backgroundColor);
					left: -6px;
					top: 12px;
					opacity: 1;
					border-radius: 0;
					z-index: -1;
					transform: none !important;
				}
			}

			.v-slider-track__background--opacity {
				opacity: 1;
			}
		}

		&.v-input--horizontal {
			:deep(.v-slider-thumb) {
				z-index: 1;
				inset-inline-start: calc(var(--v-slider-thumb-position) - calc(var(--thumbWidth-fmSlider) / 2));

				.v-slider-thumb__label-container {
					left: 0;
					top: 18px;

					.v-slider-thumb__label {
						width: max-content;
						height: auto;
						padding: 0;
						background-color: transparent;

						&::before {
							content: none;
						}
					}
				}

				&:hover {
					.v-slider-thumb__surface:before {
						transform: none !important;
					}
				}
			}
		}

		&__thumbLabel {
			position: relative;
			width: 48px;
			height: 44px;
			border-radius: 100px;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: var(--backgroundColor-fmSlider-thumbLabel);
			font-size: 14px;
			color: var(--color-fmSlider-thumbLabel);
		}

		&.fm-slider--centered {
			--color-fmSlider: var(--backgroundColor-fmSlider);

			:deep(.v-slider-thumb__surface) {
				--color-fmSlider: var(--primary-color);
			}

			:deep(.v-slider-track__fill) {
				opacity: 0.3;
			}

			:deep(.v-slider-track__tick--filled) {
				background-color: rgb(var(--v-theme-surface-variant));
			}
		}
	}
</style>
