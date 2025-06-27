import type { VNode } from 'vue';
import type { FmFilter } from '@/types';
import type { FmSelectOption } from '@/components/fm/Select/types';
import { FmFilterRangeValues } from '@/types';

export interface FmFilterProps {
	filter: FmFilter;
	filterValue: string | string[] | number | number[] | boolean | boolean[] | FmFilterRangeValues;
	options?: FmSelectOption[] | string[];
	isFilterLinked?: boolean;
}

export interface FmFilterEmits {
	(event: 'update', value: FmFilter): void;
}

export interface FmFilterSlots {
	'type-selector': () => VNode;
	'option-list': () => VNode;
	linked: () => VNode;
}
