// @ts-ignore
const regex = /^-?(0|[1-9]+)(?:[.]\d{1,2}|)$/g; // a number with two digits after the decimal point

export function formatEnteredNumber(value: string): string {
	if (!value) {
		return '';
	}
	// @ts-ignore
	const v1 = value.replaceAll(',', '.').replaceAll(/[^[0-9.]/g, '');
	const decimalPointsCount = v1.includes('.') ? v1.match(/[.]/g).length : 0;
	return decimalPointsCount > 1 ? v1.slice(0, -1) : v1;
	// const isValueValid = regex.test(v2)
	// return !isValueValid && v2[v2.length - 1] !== '.' ? v2.slice(0, -1) : v2
}
