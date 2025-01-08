import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import isoWeek from 'dayjs/plugin/isoWeek';
import type { DatePickerDate } from './types';

dayjs.extend(localeData);
dayjs.extend(isoWeek);

export const DATE_FORMAT = 'YYYY-MM-DD';

export function transformIsoDateToObject(value: string): {
	year: number;
	month: number;
	date: number | null;
} {
	const processedValue = value ? dayjs(value) : dayjs();

	const year = processedValue.year();
	const month = processedValue.month();
	const date = value ? processedValue.date() : null;
	return { year, month, date };
}

export function getDaysOfWeek() {
	return dayjs.weekdaysMin().map((day) => day[0].toUpperCase());
}

export function getMonths() {
	return dayjs.months();
}

export function getYearList(min: number = 1970, max: number = 2070): number[] {
	const listSize = max - min + 1;
	return Array.from(Array(listSize).keys()).map((_, i) => min + i);
}

export function getWeekNumber(date: string): number {
	return dayjs(date).isoWeek();
}

function prepareMonthData(year: number, month: number): DatePickerDate[] {
	const selectedDateData = `${year}-${month + 1}-01`;
	const daysInSelectedMonth = dayjs(selectedDateData).daysInMonth();

	return Array.from(Array(daysInSelectedMonth)).map((_, i) => {
		const processedMonth = `${month + 1}`.padStart(2, '0');
		const processedDate = `${i + 1}`.padStart(2, '0');
		const currentDate = `${year}-${processedMonth}-${processedDate}`;
		return {
			dateISO: currentDate,
			date: i + 1,
			day: dayjs(currentDate).day()
		};
	});
}

export function getMonthDayList(
	year: number,
	month: number
): {
	current: (DatePickerDate | null)[];
	prev: (DatePickerDate | null)[];
	next: (DatePickerDate | null)[];
} {
	const selectedDateData = `${year}-${month + 1}-01`;
	const prevMonth = dayjs(selectedDateData).subtract(1, 'month');
	const nextMonth = dayjs(selectedDateData).add(1, 'month');

	return {
		current: prepareMonthData(year, month),
		prev: prepareMonthData(prevMonth.year(), prevMonth.month()),
		next: prepareMonthData(nextMonth.year(), nextMonth.month())
	};
}
