import type { FmAttribute } from '@/types';

export interface FmItemPickerProps {
	modelValue?: string[];
	attributes?: FmAttribute[];
	suggested?: string[];
	mode?: 'add' | 'update';
	multiple?: boolean;
	width?: number | string;
	height?: number | string;
	locals?: {
		searchPlaceholder?: string;
		noResultText?: string;
		searchResultCategoryLabel?: string;
		suggestedLabel?: string;
		selectedLabel?: string;
		cancelBtn?: string;
		addBtn?: string;
		updateBtn?: string;
	};
}

export interface FmItemPickerEmits {
	(event: 'close'): void;
	(event: 'update:suggested', value: string): void;
	(event: 'update:modelValue', value: string[]): void;
}
