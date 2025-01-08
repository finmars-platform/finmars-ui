import type { FmAttribute } from '@/types';

export interface FmItemPickerItemProps<T extends FmAttribute> {
	item: T;
	selected: string[];
	suggested: string[];
	multiple?: boolean;
	disabled?: boolean;
}

export interface FmItemPickerItemEmits {
	(event: 'update:modelValue', value: string): void;
	(event: 'update:suggested', value: string): void;
}
