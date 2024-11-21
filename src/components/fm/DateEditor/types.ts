export interface FmDateEditorProps {
	modelValue: string
	min?: string // data in ISO 8601 format (YYYY-MM-DD)
	max?: string // data in ISO 8601 format (YYYY-MM-DD)
	nonWorkingDays?: string[]
	allowWeekendSelection?: boolean
	showWeek?: boolean
	showAdjacentMonths?: boolean
	calculatePreviousDayFromToday?: boolean
	disabled?: boolean
	locals?: {
		enteringFieldLabel: string
		enteringFieldPlaceholder: string
		cancelButtonText: string
		confirmButtonText: string
		menuItemCustom: string
		menuPresetToday: string
		menuPresetPrevious: string
	}
}

export interface FmDateEditorEmits {
	(event: 'update:modelValue', value: string): void
	(event: 'click:dateIcon'): void
}
