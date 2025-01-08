export interface FmInputDateProps {
	modelValue?: string;
	min?: string; // data in ISO 8601 format (YYYY-MM-DD)
	max?: string; // data in ISO 8601 format (YYYY-MM-DD)
	includeTime?: boolean;
	simplePicker?: boolean;
	compact?: boolean;
	label?: string;
	placeholder?: string;
	persistentPlaceholder?: boolean;
	showAdjacentMonths?: boolean;
	allowWeekendSelection?: boolean;
	disabled?: boolean;
}

export interface FmInputDateEmits {
	(event: 'update:modelValue', value: string): void;
}
