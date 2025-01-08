<template>
	<div class="fm-time-picker">
		<div :class="['fm-time-picker__block', 'fm-time-picker__block-center']" />

		<div class="fm-time-picker__body">
			<div
				class="fm-time-picker__col"
				:style="{ transform: `translate(0, ${cssHoursOffset})` }"
				@wheel.prevent="onHoursColScroll"
			>
				<div
					v-for="hour in hours"
					:key="hour"
					:class="['fm-time-picker__cell', { 'fm-time-picker__cell--active': hour === hoursVal }]"
					@click.stop.prevent="select('hours', hour)"
				>
					{{ hour }}
				</div>
			</div>

			<div
				class="fm-time-picker__col"
				:style="{ transform: `translate(0, ${cssMinutesOffset})` }"
				@wheel.prevent="onMinutesColScroll"
			>
				<div
					v-for="min in filteredMinutes"
					:key="min"
					:class="['fm-time-picker__cell', { 'fm-time-picker__cell--active': min === minutesVal }]"
					@click.stop.prevent="select('minutes', min)"
				>
					{{ min }}
				</div>
			</div>
		</div>

		<div :class="['fm-time-picker__block', 'fm-time-picker__block-top']" />
		<div :class="['fm-time-picker__block', 'fm-time-picker__block-bottom']" />
	</div>
</template>

<script lang="ts" setup>
	import { computed, onBeforeMount, ref, watch } from 'vue';
	import type { FmTimePickerProps, FmTimePickerEmits } from './types';

	const hours = Array.from({ length: 24 }).map((_, i) => `${i}`.padStart(2, '0'));
	const minutes = Array.from({ length: 60 }).map((_, i) => `${i}`.padStart(2, '0'));

	const props = withDefaults(defineProps<FmTimePickerProps>(), {
		modelValue: '00:00',
		minutesStep: 1,
		size: 288
	});

	const emits = defineEmits<FmTimePickerEmits>();

	const value = ref<string>(props.modelValue);

	const filteredMinutes = computed(() =>
		minutes.filter((m) => Number(m) % props.minutesStep === 0)
	);

	const hoursVal = computed(() => (value.value || '00:00').split(':')[0]);
	const hoursValIndex = computed(() => hours.findIndex((h) => h === hoursVal.value));
	const minutesVal = computed(() => (value.value || '00:00').split(':')[1]);
	const minutesValIndex = computed(() =>
		filteredMinutes.value.findIndex((m) => m === minutesVal.value)
	);

	const cssSize = computed(() => `${props.size}px`);
	const cssBorderRadius = computed(() => `${Math.floor(props.size / 10)}px`);
	const cssPadding = computed(() => `${Math.floor((props.size / 10 / 7) * 6)}px`);
	const cellSize = computed(() => {
		const blockHeight = props.size - Math.floor((props.size / 10 / 7) * 6) * 2;
		return Math.floor(blockHeight / 5);
	});
	const cssCellSize = computed(() => `${cellSize.value}px`);
	const cssHoursOffset = computed(() => `${cellSize.value * (-hoursValIndex.value + 2)}px`);
	const cssMinutesOffset = computed(() => `${cellSize.value * (-minutesValIndex.value + 2)}px`);

	function onHoursColScroll(ev: WheelEvent) {
		let diff = 0;

		if (ev.deltaY > cellSize.value / 2 && hoursValIndex.value < hours.length - 1) {
			diff = 1;
		} else if (ev.deltaY < -cellSize.value / 2 && hoursValIndex.value > 0) {
			diff = -1;
		}

		if (diff !== 0) {
			const newHours = hours[hoursValIndex.value + diff];
			value.value = `${newHours}:${minutesVal.value}`;
			emits('update:modelValue', value.value);
		}
	}

	function onMinutesColScroll(ev: WheelEvent) {
		let diff = 0;

		if (
			ev.deltaY > cellSize.value / 2 &&
			minutesValIndex.value < filteredMinutes.value.length - 1
		) {
			diff = 1;
		} else if (ev.deltaY < -cellSize.value / 2 && minutesValIndex.value > 0) {
			diff = -1;
		}

		if (diff !== 0) {
			const newMinutes = filteredMinutes.value[minutesValIndex.value + diff];
			value.value = `${hoursVal.value}:${newMinutes}`;
			emits('update:modelValue', value.value);
		}
	}

	function select(field: 'hours' | 'minutes', val: string) {
		let newTimeValue = `${hoursVal.value}:${minutesVal.value}`;
		switch (field) {
			case 'hours':
				newTimeValue = `${val}:${minutesVal.value}`;
				break;
			case 'minutes':
				newTimeValue = `${hoursVal.value}:${val}`;
				break;
		}

		value.value = newTimeValue;
		emits('update:modelValue', newTimeValue);
	}

	watch(
		() => props.modelValue,
		(val, oldVal) => {
			if (val !== oldVal && val !== value.value) {
				value.value = val;
			}
		},
		{ immediate: true }
	);

	onBeforeMount(() => {
		if (![1, 2, 5, 10, 15, 20, 30].includes(props.minutesStep)) {
			throw new Error(
				`[FmTimePicker] The value of props 'minutes-step' cannot be ${props.minutesStep}. It must be one of the following: 1, 2, 5, 10, 15, 20 or 30.`
			);
		}
	});
</script>

<style lang="scss" scoped>
	.fm-time-picker {
		--fmRimePicker-size: v-bind(cssSize);
		--fmRimePicker-background: var(--surface-container-high);
		--fmRimePicker-padding: v-bind(cssPadding);
		--fmRimePicker-border-radius: v-bind(cssBorderRadius);
		--fmRimePicker-item-size: v-bind(cssCellSize);
		--fmRimePicker-font: var(--body-large-font);
		--fmRimePicker-bg-active: var(--secondary);
		--fmRimePicker-color-active: var(--on-secondary);

		position: relative;
		width: var(--fmRimePicker-size);
		min-width: var(--fmRimePicker-size);
		height: var(--fmRimePicker-size);
		min-height: var(--fmRimePicker-size);
		padding: var(--fmRimePicker-padding);
		background-color: var(--fmRimePicker-background);
		border-radius: var(--fmRimePicker-border-radius);
		box-shadow:
			0 2px 6px 2px rgba(0, 0, 0, 0.15),
			0 1px 2px 0 rgba(0, 0, 0, 0.3);

		&__body {
			position: relative;
			width: calc(var(--fmRimePicker-item-size) * 2);
			height: 100%;
			overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: stretch;
			margin: 0 auto;
			background-color: transparent;
		}

		&__col {
			position: relative;
			width: var(--fmRimePicker-item-size);
			background-color: transparent;
			transition: all ease-in-out 250ms;
			cursor: pointer;
		}

		&__cell {
			position: relative;
			width: var(--fmRimePicker-item-size);
			height: var(--fmRimePicker-item-size);
			display: flex;
			justify-content: center;
			align-items: center;
			font: var(--fmRimePicker-font);

			&--active {
				color: var(--fmRimePicker-color-active);
				font-weight: 500;
			}
		}

		&__block {
			position: absolute;
			left: var(--fmRimePicker-padding);
			width: calc(100% - calc(var(--fmRimePicker-padding) * 2));
			height: var(--fmRimePicker-item-size);
		}

		&__block-center {
			top: calc(50% - calc(var(--fmRimePicker-item-size) / 2));
			background-color: var(--fmRimePicker-bg-active);
		}

		&__block-top {
			z-index: 1;
			top: var(--fmRimePicker-padding);
			background: linear-gradient(0deg, transparent 0%, var(--surface-container-high) 75%);
		}

		&__block-bottom {
			z-index: 1;
			bottom: var(--fmRimePicker-padding);
			background: linear-gradient(180deg, transparent 0%, var(--surface-container-high) 75%);
		}
	}
</style>
