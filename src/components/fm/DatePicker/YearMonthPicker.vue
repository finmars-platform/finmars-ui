<template>
	<div class="fm-year-month-picker">
		<div :class="['fm-year-month-picker__block', 'fm-year-month-picker__block-center']" />

		<div class="fm-year-month-picker__body">
			<div
				class="fm-year-month-picker__col"
				:style="{ transform: `translate(0, ${cssYearOffset})` }"
				@wheel.prevent="onYearColScroll"
			>
				<div
					v-for="y in years"
					:key="y"
					:class="[
						'fm-year-month-picker__cell',
						{ 'fm-year-month-picker__cell--active': y === year }
					]"
					@click.stop.prevent="select('year', y)"
				>
					{{ y }}
				</div>
			</div>

			<div
				class="fm-year-month-picker__col"
				:style="{ transform: `translate(0, ${cssMonthOffset})` }"
				@wheel.prevent="onMonthColScroll"
			>
				<div
					v-for="m in months"
					:key="m.value"
					:class="[
						'fm-year-month-picker__cell',
						{ 'fm-year-month-picker__cell--active': m.value === month }
					]"
					@click.stop.prevent="select('month', m.value)"
				>
					{{ m.title }}
				</div>
			</div>
		</div>

		<div :class="['fm-year-month-picker__block', 'fm-year-month-picker__block-top']" />
		<div :class="['fm-year-month-picker__block', 'fm-year-month-picker__block-bottom']" />
	</div>
</template>

<script lang="ts" setup>
	import { computed, ref, watch } from 'vue';
	import { getMonths, getYearList } from './utils';
	import type { FmYearMonthPickerProps, FmYearMonthPickerEmits } from './types';

	const itemHeight = 48;

	const props = withDefaults(defineProps<FmYearMonthPickerProps>(), {
		minYear: 1970,
		maxYear: 2020
	});

	const emits = defineEmits<FmYearMonthPickerEmits>();

	const year = ref(props.year);
	const month = ref(props.month);

	const months = getMonths().map((m, index) => ({
		title: m,
		value: index
	}));
	const years = computed(() => getYearList(props.minYear, props.maxYear));

	const cssItemHeight = computed(() => `${itemHeight}px`);

	const yearValIndex = computed(() => years.value.findIndex((y) => y === year.value));
	const monthValIndex = computed(() => months.findIndex((m) => m.value === month.value));
	const cssYearOffset = computed(() => `${itemHeight * (-yearValIndex.value + 2)}px`);
	const cssMonthOffset = computed(() => `${itemHeight * (-monthValIndex.value + 2)}px`);

	function onYearColScroll(ev: WheelEvent) {
		let diff = 0;

		if (ev.deltaY > itemHeight / 2 && yearValIndex.value < years.value.length - 1) {
			diff = 1;
		} else if (ev.deltaY < -itemHeight / 2 && yearValIndex.value > 0) {
			diff = -1;
		}

		if (diff !== 0) {
			year.value = years.value[yearValIndex.value + diff];
			emits('update:year', year.value);
		}
	}

	function onMonthColScroll(ev: WheelEvent) {
		let diff = 0;

		if (ev.deltaY > itemHeight / 2 && monthValIndex.value < months.length - 1) {
			diff = 1;
		} else if (ev.deltaY < -itemHeight / 2 && monthValIndex.value > 0) {
			diff = -1;
		}

		if (diff !== 0) {
			month.value = months[monthValIndex.value + diff].value;
			emits('update:month', month.value);
		}
	}

	function select(field: 'year' | 'month', val: number) {
		switch (field) {
			case 'year':
				year.value = val;
				emits('update:year', year.value);
				break;
			case 'month':
				month.value = val;
				emits('update:month', month.value);
				break;
		}
	}

	watch(
		() => props.year,
		(val, oldVal) => {
			if (val !== oldVal && val !== year.value) {
				year.value = val;
			}
		},
		{ immediate: true }
	);

	watch(
		() => props.month,
		(val, oldVal) => {
			if (val !== oldVal && val !== month.value) {
				month.value = val;
			}
		},
		{ immediate: true }
	);
</script>

<style lang="scss" scoped>
	.fm-year-month-picker {
		--fmYearMonthPicker-item-height: v-bind(cssItemHeight);
		--fmYearMonthPicker-font: var(--body-large-font);
		--fmYearMonthPicker-bg-active: var(--secondary);
		--fmYearMonthPicker-color-active: var(--on-secondary);

		position: relative;
		width: 100%;
		height: calc(var(--fmYearMonthPicker-item-height) * 5);

		&__block {
			position: absolute;
			left: var(--fmRimePicker-padding);
			width: 100%;
			height: var(--fmYearMonthPicker-item-height);

			&-center {
				top: calc(50% - calc(var(--fmYearMonthPicker-item-height) / 2));
				background-color: var(--fmYearMonthPicker-bg-active);
			}

			&-top {
				z-index: 1;
				top: 0;
				background: linear-gradient(0deg, transparent 0%, var(--surface-container-high) 75%);
			}

			&-bottom {
				z-index: 1;
				bottom: 0;
				background: linear-gradient(180deg, transparent 0%, var(--surface-container-high) 75%);
			}
		}

		&__body {
			position: relative;
			width: 100%;
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
			width: 50%;
			background-color: transparent;
			transition: all ease-in-out 250ms;
			cursor: pointer;
		}

		&__cell {
			position: relative;
			width: 100%;
			height: var(--fmYearMonthPicker-item-height);
			display: flex;
			justify-content: center;
			align-items: center;
			font: var(--fmYearMonthPicker-font);
			cursor: pointer;

			&--active {
				color: var(--fmYearMonthPicker-color-active);
				font-weight: 500;
			}
		}
	}
</style>
