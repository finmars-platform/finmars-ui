import type { FmAttribute } from '@/types';

export interface FmAttributeGroup {
	[key: string]: FmAttributeGroup | FmAttribute;
}

export interface FmItemPickerContentProps {
	category: string;
	attributes?: Record<string, FmAttributeGroup>;
	suggested: string[];
	selected: string[];
	initialSelected: string[];
	multiple?: boolean;
	mode: 'add' | 'update';
	locals?: {
		suggested: string;
		selected: string;
	};
}

export interface FmItemPickerContentEmits {
	(event: 'update:suggested', value: string): void;
	(event: 'update:modelValue', value: string): void;
}
