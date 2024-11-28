export interface FmTransferListProps<T extends any, K extends string & keyof T> {
	title: string
	locals?: {
		available?: string
		selected?: string
		placeholder?: string
		cancelBtn?: string
		saveBtn?: string
	}
	optionAsObject?: boolean
	optionTitleKey?: K | string
	optionValueKey?: K | string
	width?: number | string
	height?: number | string
	options: T[]
	selected: T[]
}

export interface FmTransferListEmits<T extends any> {
	(event: 'end'): void
	(event: 'change', value: T[]): void
}
