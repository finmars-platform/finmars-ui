<template>
	<div
		:class="[
			'fm-date-picker',
			{ 'fm-date-picker--bordered': border, 'fm-date-picker--disabled': disabled }
		]"
	>
		<div class="fm-date-picker__controls">
			<FmButton
				type="secondary"
				rounded
				:append-icon="isYearMonthSelectorOpen ? 'mdi-menu-up' : 'mdi-menu-down'"
				:disabled="disabled"
				@click.stop.prevent="isYearMonthSelectorOpen = !isYearMonthSelectorOpen"
			>
				{{ pickerControllerText }}
			</FmButton>

			<div class="fm-date-picker__controls-block">
				<FmIconButton
					variant="text"
					icon="mdi-chevron-left"
					:disabled="isYearMonthSelectorOpen || disabled"
					@click.stop.prevent="selectMonth('prev')"
				/>
				<FmIconButton
					variant="text"
					icon="mdi-chevron-right"
					:disabled="isYearMonthSelectorOpen || disabled"
					@click.stop.prevent="selectMonth('next')"
				/>
			</div>
		</div>

		<div class="fm-date-picker__days">
			<div v-for="(day, index) in daysOfWeek" :key="index" class="fm-date-picker__day">
				{{ day }}
			</div>
		</div>

		<div class="fm-date-picker__dates">
			<div v-for="(item, index) in currentMonthData" :key="index" class="fm-date-picker__date">
				<div
					v-ripple.center
					:class="[
						'fm-date-picker__date-cell',
						{
							'fm-date-picker__date-cell--other': !item?.dateISO.startsWith(displayedYearAndMonth),
							'fm-date-picker__date-cell--current': item?.dateISO === today,
							'fm-date-picker__date-cell--selected': item?.dateISO === selectedDate,
							'fm-date-picker__date-cell--erroneous': item?.erroneous,
							'fm-date-picker__date-cell--disabled': item?.disabled || item === null || disabled
						}
					]"
					@click.stop.prevent="selectDate(item!)"
				>
					{{ item?.date }}
				</div>
			</div>
		</div>

		<div v-if="isYearMonthSelectorOpen" class="fm-date-picker__year-month">
			<YearMonthPicker
				:min-year="minYear"
				:max-year="maxYear"
				:year="displayedPicker.year"
				:month="displayedPicker.month"
				:disabled="disabled"
				@update:year="displayedPicker.year = $event"
				@update:month="displayedPicker.month = $event"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { computed, ref, watch } from 'vue';
	import size from 'lodash/size';
	import cloneDeep from 'lodash/cloneDeep';
	import dayjs from 'dayjs';
	import localeData from 'dayjs/plugin/localeData';
	import { Ripple } from 'vuetify/directives';
	import FmButton from '../Button/Button.vue';
	import FmIconButton from '../IconButton/IconButton.vue';
	import YearMonthPicker from './YearMonthPicker.vue';
	import { DATE_FORMAT, getDaysOfWeek, getMonthDayList, transformIsoDateToObject } from './utils';
	import { FmDatePickerProps, FmDatePickerEmits, DatePickerDate } from './types';

	dayjs.extend(localeData);
	const vRipple = Ripple;

	const props = withDefaults(defineProps<FmDatePickerProps>(), {
		min: '1970-01-01',
		max: '2070-12-31',
		nonSelectableDates: () => [],
		erroneousDates: () => [],
		showAdjacentMonths: true
	});
	const emits = defineEmits<FmDatePickerEmits>();

	const daysOfWeek = getDaysOfWeek();

	const value = ref<{
		year: number;
		month: number;
		date: number | null;
	}>(transformIsoDateToObject(props.modelValue));

	const displayedPicker = ref<{
		year: number;
		month: number;
	}>({
		year: value.value.year,
		month: value.value.month
	});

	const isYearMonthSelectorOpen = ref(false);

	const today = computed(() => dayjs().format(DATE_FORMAT));
	const minYear = computed(() => dayjs(props.min).year());
	const maxYear = computed(() => dayjs(props.max).year());

	const displayedYearAndMonth = computed(() => {
		const m = `${displayedPicker.value.month + 1}`.padStart(2, '0');
		return `${displayedPicker.value.year}-${m}`;
	});
	const selectedDate = computed(() => {
		const m = `${value.value.month + 1}`.padStart(2, '0');
		const d = `${value.value.date}`.padStart(2, '0');
		return `${value.value.year}-${m}-${d}`;
	});
	const pickerControllerText = computed(
		() =>
			`${dayjs().month(displayedPicker.value.month).format('MMMM')} ${dayjs().year(displayedPicker.value.year).format('YYYY')}`
	);

	const currentMonthData = computed(() => {
		const { current, prev, next } = getMonthDayList(
			displayedPicker.value.year,
			displayedPicker.value.month
		);
		const currentMonth = cloneDeep(current);
		const firstDayOfCurrentMonth = currentMonth[0];
		const lastDayOfCurrentMonth = currentMonth[size(currentMonth) - 1];

		if (lastDayOfCurrentMonth?.day !== 6) {
			let completed = false;
			let i = 0;
			while (!completed) {
				const item = next[i];
				currentMonth.push(props.showAdjacentMonths ? item : null);
				if (item?.day === 6) {
					completed = true;
				} else {
					i += 1;
				}
			}
		}

		if (firstDayOfCurrentMonth?.day !== 0) {
			let completed = false;
			let i = prev.length - 1;
			while (!completed) {
				const item = prev[i];
				currentMonth.unshift(props.showAdjacentMonths ? item : null);
				if (item?.day === 0) {
					completed = true;
				} else {
					i -= 1;
				}
			}
		}

		return currentMonth.map((item) => {
			if (item === null) {
				return null;
			}

			return {
				...item,
				disabled: isDateDisabled(item),
				erroneous: props.erroneousDates.includes(item.dateISO)
			};
		});
	});

	function rangeCheck(val: string) {
		const isGreaterThanOrEqualToMin = dayjs(val).diff(dayjs(props.min)) >= 0;
		const isLessThanOrEqualToMax = dayjs(val).diff(dayjs(props.max)) <= 0;
		return isGreaterThanOrEqualToMin && isLessThanOrEqualToMax;
	}

	function isDateDisabled(val: DatePickerDate) {
		const isDateInRange = rangeCheck(val.dateISO);
		if (size(props.nonSelectableDates) === 0 && props.canWeekendsBeSelected) {
			return !isDateInRange;
		}

		const isDateInList = props.nonSelectableDates.includes(val.dateISO);
		return props.canWeekendsBeSelected
			? isDateInList || !isDateInRange
			: isDateInList || [0, 6].includes(val.day) || !isDateInRange;
	}

	function selectDate(item: DatePickerDate) {
		if (item.disabled) {
			return;
		}

		value.value = {
			year: dayjs(item.dateISO).year(),
			month: dayjs(item.dateISO).month(),
			date: dayjs(item.dateISO).date()
		};
		emits('update:modelValue', item.dateISO);
	}

	function selectMonth(direction: 'prev' | 'next') {
		const current = `${displayedPicker.value.year}-${displayedPicker.value.month + 1}-01`;
		const newMonthsDate =
			direction === 'next' ? dayjs(current).add(1, 'month') : dayjs(current).subtract(1, 'month');
		displayedPicker.value = {
			year: dayjs(newMonthsDate).year(),
			month: dayjs(newMonthsDate).month()
		};
	}

	watch(
		() => props.modelValue,
		(val, oVal) => {
			if (val !== oVal) {
				value.value = transformIsoDateToObject(val);
				displayedPicker.value = {
					year: value.value.year,
					month: value.value.month
				};
			}
		},
		{ immediate: true }
	);
</script>

<style lang="scss" scoped>
	.fm-date-picker {
		--fmDatePicker-bg: var(--surface-container-high);
		--fmDatePicker-border-radius: 28px;
		--fmDatePicker-cell-size: 48px;
		--fmDatePicker-day-color: var(--on-surface-variant);
		--fmDatePicker-date-color: var(--on-surface);
		--fmDatePicker-selected-date-bg: var(--secondary);
		--fmDatePicker-selected-date-color: var(--on-primary);

		position: relative;
		width: fit-content;
		height: fit-content;
		background-color: var(--fmDatePicker-bg);

		&--bordered {
			border-radius: var(--fmDatePicker-border-radius);
			box-shadow:
				0 2px 6px 2px rgba(0, 0, 0, 0.15),
				0 1px 2px 0 rgba(0, 0, 0, 0.3);
		}

		&__controls {
			display: flex;
			width: 100%;
			height: 56px;
			justify-content: space-between;
			align-items: center;

			&-block {
				display: flex;
				justify-content: center;
				align-items: center;
				padding-right: 10px;
				column-gap: 10px;
			}

			button {
				text-transform: none;
			}
		}

		&__days {
			position: relative;
			padding: 0 8px;
			display: grid;
			grid-template-columns: repeat(7, var(--fmDatePicker-cell-size));
		}

		&__day {
			position: relative;
			width: var(--fmDatePicker-cell-size);
			height: var(--fmDatePicker-cell-size);
			display: flex;
			justify-content: center;
			align-items: center;
			font: var(--title-small-font);
			color: var(--fmDatePicker-day-color);
		}

		&__dates {
			position: relative;
			display: grid;
			height: 296px;
			padding: 0 8px 8px 8px;
			grid-template-columns: repeat(7, var(--fmDatePicker-cell-size));
			grid-template-rows: repeat(6, var(--fmDatePicker-cell-size));
		}

		&__date {
			position: relative;
			width: var(--fmDatePicker-cell-size);
			height: var(--fmDatePicker-cell-size);
			display: flex;
			justify-content: center;
			align-items: center;

			&-cell {
				position: relative;
				width: calc(var(--fmDatePicker-cell-size) - 8px);
				height: calc(var(--fmDatePicker-cell-size) - 8px);
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				font: var(--body-large-font);
				color: var(--fmDatePicker-date-color);

				&--other {
					opacity: 0.5;
				}

				&--current {
					border: 1px solid var(--secondary);
				}

				&--selected {
					background-color: var(--fmDatePicker-selected-date-bg);
					color: var(--fmDatePicker-selected-date-color);

					&:hover {
						color: color-mix(in srgb, var(--fmDatePicker-selected-date-color) 75%, transparent);
					}
				}

				&--erroneous {
					color: var(--error);
				}

				&--disabled {
					cursor: default;
					pointer-events: none;
					color: color-mix(in srgb, var(--fmDatePicker-date-color) 38%, transparent);
				}

				&:hover:not(.fm-date-picker__date-cell--disabled):not(
						.fm-date-picker__date-cell--selected
					) {
					background-color: color-mix(in srgb, var(--on-surface) 8%, transparent);
				}
			}
		}

		&__year-month {
			position: absolute;
			width: 100%;
			height: 344px;
			left: 0;
			bottom: 0;
			z-index: 2;
			background-color: var(--fmDatePicker-bg);
			padding: 24px;
		}

		&--disabled {
			cursor: default;
		}
	}
</style>
