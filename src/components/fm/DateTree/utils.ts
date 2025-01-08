import dayjs from 'dayjs';
import size from 'lodash/size';
import type { DateTreeItem } from '@/components/fm/DateTree/types';

export function parseDate(value: string): {
	year: number;
	month: number;
	date: number;
	hours: number;
	minutes: number;
	time: number;
} {
	const currentDate = dayjs(value);
	const year = currentDate.get('year');
	const month = currentDate.get('month');
	const date = currentDate.get('date');
	const hours = currentDate.get('hours');
	const minutes = currentDate.get('minutes');
	const time = hours * 60 + minutes;

	return { year, month, date, hours, minutes, time };
}

export function getYearIndexInDateTree({
	tree,
	year
}: {
	tree: DateTreeItem[];
	year: number;
}): number {
	return tree.findIndex((y) => y.value === year);
}

export function getMonthIndexInDateTree({
	tree,
	month,
	yearIndex
}: {
	tree: DateTreeItem[];
	month: number;
	yearIndex: number;
}): number {
	if (yearIndex === -1) {
		return -1;
	}

	return tree[yearIndex].children!.findIndex((m) => m.value === month);
}

export function getDateIndexInDateTree({
	tree,
	date,
	yearIndex,
	monthIndex
}: {
	tree: DateTreeItem[];
	date: number;
	yearIndex: number;
	monthIndex: number;
}): number {
	if (yearIndex === -1 || monthIndex === -1) {
		return -1;
	}

	return tree[yearIndex].children![monthIndex].children!.findIndex((d) => d.value === date);
}

export function getTimeIndexInDateTree({
	tree,
	time,
	yearIndex,
	monthIndex,
	dateIndex,
	includeTime
}: {
	tree: DateTreeItem[];
	time: number;
	yearIndex: number;
	monthIndex: number;
	dateIndex: number;
	includeTime?: boolean;
}): number {
	if (yearIndex === -1 || monthIndex === -1 || dateIndex === -1) {
		return -1;
	}

	return includeTime
		? tree[yearIndex].children![monthIndex].children![dateIndex].children!.findIndex(
				(t) => t.value === time
			)
		: -1;
}

export function makeDateTree(data: string[] = [], includeTime?: boolean): DateTreeItem[] {
	const tree = data.reduce((res, item) => {
		const { year, month, date, hours, minutes, time } = parseDate(item);

		let yearIndex = getYearIndexInDateTree({ tree: res, year });
		if (yearIndex === -1) {
			yearIndex = size(res);
			res.push({
				title: `${year}`,
				value: year,
				level: 0,
				selectedStatus: 'unselected',
				isOpened: false,
				children: []
			});
		}

		let monthIndex = getMonthIndexInDateTree({ tree: res, month, yearIndex });
		if (monthIndex === -1) {
			monthIndex = size(res[yearIndex].children);
			res[yearIndex].children!.push({
				title: new Date(item).toLocaleDateString('default', { month: 'long' }),
				value: month,
				level: 1,
				selectedStatus: 'unselected',
				isOpened: false,
				children: []
			});
		}

		let dateIndex = getDateIndexInDateTree({ tree: res, date, yearIndex, monthIndex });
		if (dateIndex === -1) {
			dateIndex = size(res[yearIndex].children![monthIndex].children);
			res[yearIndex].children![monthIndex].children!.push({
				title: new Date(item).toLocaleDateString('default', { day: '2-digit' }),
				value: date,
				level: 2,
				selectedStatus: 'unselected',
				...(includeTime && {
					isOpened: false,
					children: []
				})
			});
		}

		if (includeTime) {
			const timeIndex = getTimeIndexInDateTree({
				tree: res,
				time,
				yearIndex,
				monthIndex,
				dateIndex
			});
			if (timeIndex === -1 && time > 0) {
				const hoursVal = `${hours}`.padStart(2, '0');
				const minutesVal = `${minutes}`.padStart(2, '0');
				res[yearIndex].children![monthIndex].children![dateIndex].children!.push({
					title: `${hoursVal}:${minutesVal}`,
					value: time,
					level: 3,
					selectedStatus: 'unselected'
				});
			}
		}

		return res;
	}, [] as DateTreeItem[]);

	tree.sort((a, b) => a.value - b.value);
	tree.forEach((y) => {
		y.children!.sort((a, b) => a.value - b.value);

		y.children!.forEach((m) => {
			m.children!.sort((a, b) => a.value - b.value);

			if (includeTime) {
				m.children!.forEach((d) => {
					d.children!.sort((a, b) => a.value - b.value);
				});
			}
		});
	});

	return tree;
}
