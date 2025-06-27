export interface FmItemPickerListProps {
	categories: string[];
	currentCategory?: string;
	selectedCategoryName: string;
	selectedCount?: number;
}

export interface FmItemPickerListEmits {
	(event: 'select:category', value: string): void;
}
