import type { FmFilterType } from '@/types';
import { FmSelectOption } from '@/components/fm/Select/types';

export const FILTER_CONDITIONS: {
	name: string;
	id: FmFilterType;
	availableInFilters: Array<number | 'field'>;
}[] = [
	{ name: 'Contains', id: 'contains', availableInFilters: [10, 30] },
	{ name: 'Equal', id: 'equal', availableInFilters: [10, 20, 30, 40, 50, 80] },
	{ name: 'Not equal', id: 'not_equal', availableInFilters: [10, 20, 30, 40, 80] },
	{ name: 'Greater than', id: 'greater', availableInFilters: [20, 40, 80] },
	{ name: 'Greater or equal to', id: 'greater_equal', availableInFilters: [20, 40, 80] },
	{ name: 'Less than', id: 'less', availableInFilters: [20, 40, 80] },
	{ name: 'Less or equal to', id: 'less_equal', availableInFilters: [20, 40, 80] },
	{ name: 'From ... to ... (incl)', id: 'from_to', availableInFilters: [20, 40, 80] },
	{ name: 'Out of range (incl)', id: 'out_of_range', availableInFilters: [20, 40, 80] },
	{ name: 'Empty cells', id: 'empty', availableInFilters: [10, 20, 40, 80] },
	{ name: 'Select', id: 'selector', availableInFilters: [10, 50] },
	{ name: 'Multiple select', id: 'multiselector', availableInFilters: [10, 50] },
	{ name: 'Date tree', id: 'date_tree', availableInFilters: [40, 80] },
	{ name: 'Linked to', id: 'use_from_above', availableInFilters: [10, 20, 30, 40, 50, 80] }
];

export const SELECTORS_BOOLEAN_OPTIONS: FmSelectOption[] = [
	{ value: false, title: 'False' },
	{ value: true, title: 'True' }
];
