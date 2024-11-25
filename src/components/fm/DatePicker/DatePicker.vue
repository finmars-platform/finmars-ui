<template>
	<VDatePicker
		v-model="innerValue"
		v-bind="vDatePickerProps"
		class="fm-date-picker"
		@update:month="emits('update:month', $event)"
		@update:year="emits('update:year', $event)"
		@update:view-mode="emits('update:viewMode', $event)"
		@update:model-value="onUpdateModelValue"
	/>
</template>

<script setup>
	import { computed, ref, watch } from 'vue'
	import { VDatePicker } from 'vuetify/components'

	const props = defineProps({
		modelValue: {
			type: String
		},
		title: {
			type: String
		},
		header: {
			type: String
		},
		min: {
			type: String // date/month ISO 8601 format
		},
		max: {
			type: String // date/month ISO 8601 format
		},
		allowedDates: {
			type: [Array, Function]
		},
		showHeader: {
			type: Boolean
		},
		showWeek: {
			type: Boolean
		},
		showAdjacentMonths: {
			type: Boolean
		},
		border: {
			type: Boolean
		},
		minWidth: {
			type: [String, Number]
		},
		width: {
			type: [String, Number]
		},
		maxWidth: {
			type: [String, Number]
		},
		minHeight: {
			type: [String, Number]
		},
		height: {
			type: [String, Number]
		},
		maxHeight: {
			type: [String, Number]
		},
		disabled: {
			type: Boolean
		}
	})

	const emits = defineEmits([
		'update:modelValue',
		'update:month',
		'update:year',
		'update:viewMode'
	])

	const innerValue = ref(props.modelValue ? isoToDate(props.modelValue) : null)

	const vDatePickerProps = computed(() => ({
		bgColor: 'var(--backgroundColor-fmDatePicker)',
		border: false,
		color: 'var(--color-fmDatePicker)',
		title: props.title,
		min: props.min,
		max: props.max,
		header: props.header,
		allowedDates: props.allowedDates,
		hideHeader: !props.showHeader,
		showWeek: !!props.showWeek,
		showAdjacentMonths: props.showAdjacentMonths,
		minWidth: props.minWidth,
		width: props.width,
		maxWidth: props.maxWidth,
		minHeight: props.minHeight,
		height: props.height,
		maxHeight: props.maxHeight,
		disabled: props.disabled
	}))

	const borderRadiusValue = computed(() => (props.border ? '24px' : '0'))

	function isoToDate(val) {
		return val ? new Date(val) : new Date()
	}

	function dateToIso(val) {
		return val.toISOString()
	}

	function onUpdateModelValue(value) {
		emits('update:modelValue', dateToIso(value))
	}

	watch(
		() => props.modelValue,
		(val, oVal) => {
			if (val !== oVal) {
				innerValue.value = val ? isoToDate(val) : null
			}
		},
		{ immediate: true }
	)
</script>

<style scoped lang="scss">
	.fm-date-picker {
		--color-fmDatePicker: var(--primary);
		--backgroundColor-fmDatePicker: var(--surface-container-high);

		border-radius: v-bind(borderRadiusValue);

		:deep(.v-picker-title) {
			background-color: var(--surface-container-high);
			font-size: 14px;
			color: var(--on-surface-variant);
		}

		:deep(.v-date-picker-header) {
			background-color: var(--surface-container-high) !important;
			border-bottom: 1px solid var(--outline-variant);
			color: var(--on-surface);
		}

		:deep(.v-picker__body) {
			.v-date-picker-controls {
				.v-btn__content {
					color: var(--on-surface-variant);
				}
			}

			.v-date-picker-month {
				.v-date-picker-month__weekday {
					font-size: 16px;
					color: var(--on-surface);
				}

				.v-date-picker-month__day {
					.v-btn {
						font-size: 16px;
						color: var(--on-surface);
						background-color: transparent;
					}

					&.v-date-picker-month__day--selected {
						.v-btn {
							background-color: var(--color-fmDatePicker);
							color: var(--on-primary);
						}
					}
				}
			}

			.v-date-picker-months {
				.v-date-picker-months__content {
					.v-btn {
						font-size: 16px;
						color: var(--on-surface-variant);

						&.v-btn--active {
							color: var(--on-primary);
						}
					}
				}
			}

			.v-date-picker-years {
				.v-date-picker-years__content {
					.v-btn {
						font-size: 16px;
						color: var(--on-surface-variant);

						&.v-btn--active {
							color: var(--on-primary);
						}
					}
				}
			}
		}
	}
</style>
