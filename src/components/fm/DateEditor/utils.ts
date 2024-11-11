import { datesInMonth } from './constants'

/**
 * @param {string} date
 * @param {string} year
 * @return {string}
 */
function processedYear(date: string, year: string): string {
	if (!year) {
		return date
	}

	if (year.length === 2 && Number(year) < 19) {
		return date.slice(0, -1)
	}

	if (year && year.length === 3 && Number(year) < 197) {
		return date.slice(0, -1)
	}

	return date
}

/**
 * @param {string} date
 * @param {string} month
 * @return {string}
 */
function processedMonth(date: string, month: string): string {
	if (!month) {
		return date
	}

	if (month.length === 1 && Number(month) > 1) {
		return date.slice(0, -1)
	}

	if (month.length === 2 && Number(month) > 12) {
		return date.slice(0, -1)
	}

	return date
}

/**
 * @param {string} date
 * @param {string} year
 * @param {string} month
 * @param {string} day
 * @return {string}
 */
function processedDay(date: string, year: string, month: string, day: string): string {
	if (!day) {
		return date
	}

	if (day.length === 1 && Number(month) === 2 && Number(day) > 2) {
		return date.slice(0, -1)
	}

	if (day.length === 1 && Number(month) !== 2 && Number(day) > 3) {
		return date.slice(0, -1)
	}

	const isYearLeap = (Number(year) % 4 === 0 && Number(year) % 100 !== 0) || Number(year) % 400 === 0
	const dayInCurrentMonth = isYearLeap ? datesInMonth[month][1] : datesInMonth[month][0]

	if (day.length === 2 && Number(day) > dayInCurrentMonth) {
		return date.slice(0, -1)
	}

	return date
}

/**
 * @param {string} date
 * @return {string}
 */
export function processedDate(date: string): string {
	const [year, month, day] = date.split('-')

	let processedValue = processedYear(date, year)
	processedValue = processedMonth(processedValue, month)
	processedValue = processedDay(processedValue, year, month, day)

	return processedValue
}
