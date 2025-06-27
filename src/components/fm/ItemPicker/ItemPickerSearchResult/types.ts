import type { FmAttribute } from '@/types';

export interface FmItemPickerSearchResultProps<T extends FmAttribute> {
	searchText?: string;
	items: T[];
	initialSelectedItems: string[];
	selectedItems: string[];
	multiple?: boolean;
	mode: 'add' | 'update';
}

export interface FmItemPickerSearchResultEmits {
	(event: 'select', value: string): void;
	(event: 'add:suggested', value: string): void;
}
