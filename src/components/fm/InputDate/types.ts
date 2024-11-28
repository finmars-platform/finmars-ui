export interface FmInputDateProps {
	modelValue?: string
	compact?: boolean
	label?: string
	placeholder?: string
	persistentPlaceholder?: boolean
	dateFormat?: string
	showAdjacentMonths?: boolean
	allowWeekendSelection?: boolean
	disabled?: boolean
}

export interface FmInputDateEmits {
	(event: 'update:modelValue', value: string): void
}
