import type { FmFilter, FmAttribute } from '@/types';
import type { FmSelectOption } from '@/components/fm/Select/types';

export interface FmFilterAttribute extends FmAttribute {
	value_types: number;
	layout_name?: string;
}

export interface FmFilterAttributes {
	title: string;
	selectedAttributes: string[];
	favoriteAttributes: string[];
	attributes: FmFilterAttribute[];
}

export interface FmtFilterToolbarProps {
	value: FmFilter[];
	attributes: FmFilterAttribute[];
	suggestedAttrs: string[];
	showLinkedFilters?: boolean;
	getFilterOptions: <T extends FmSelectOption>(filter: FmFilter) => Promise<T[]>;
	getSourceLinkedGroups: <T extends FmSelectOption>(filter: FmFilter) => Promise<T[]>;
	getSourceLinkedGroupAttributes: (filter: FmFilter) => FmAttribute[];
	expandable?: boolean;
	disabled?: boolean;
}

export interface FmtFilterToolbarEmits {
	(event: 'update:modelValue', value: FmFilter[]): void;
	(event: 'update:suggested', value: string): void;
}
