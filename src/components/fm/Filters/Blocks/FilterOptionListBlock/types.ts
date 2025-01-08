import type { FmSelectOption } from '@/components/fm/Select/types';

export interface FmFilterOptionListBlockProps<T extends FmSelectOption> {
	options: T[];
	selected: T[];
	multiple?: boolean;
	locals?: {
		and?: string;
		search?: string;
		selectAll?: string;
	};
}

export interface FmFilterOptionListBlockEmits<T extends FmSelectOption> {
	(event: 'update', value: T[]): void;
}
