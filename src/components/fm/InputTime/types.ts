export interface FmInputTimeProps {
	modelValue: string; // 'HH:mm'
	label?: string;
	placeholder?: string;
	persistentPlaceholder?: boolean;
	minutesStep?: 1 | 2 | 5 | 10 | 15 | 20 | 30;
	size?: number;
	disabled?: boolean;
}

export interface FmInputTimeEmits {
	(event: 'update:modelValue', value: string): void;
}
