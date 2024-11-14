import { VNode } from 'vue'

export interface FmSelectOption {
	title?: string;
	value: string;
}

export interface FmSelectActivatorProps {
	value: string;
	isDropdownOpened?: boolean;
	variant: 'standard' | 'outlined';
	label?: string;
	placeholder?: string;
	persistentPlaceholder?: boolean;
	prependIcon?: string;
	clearIcon?: string;
	clearable?: boolean;
	chip?: boolean;
	width?: number | string;
	error?: boolean;
	loading?: boolean;
	disabled?: boolean;
}

export interface FmSelectActivatorSlots {
	default: () => VNode;
}

export interface FmSelectActivatorEmits {
	(event: 'init', value: HTMLDivElement): void;
	(event: 'focus', value: FocusEvent): void;
	(event: 'blur', value: FocusEvent): void;
	(event: 'click:clear', value: MouseEvent): void;
	(event: 'click:prependIcon', value: MouseEvent): void;
	(event: 'keydown', value: { event: KeyboardEvent, key: 'down' | 'up' | 'esc' | 'enter' | 'space' | 'tab' }): void;
}

export interface FmSelectProps<T extends FmSelectOption, K extends string & keyof T> {
	modelValue: T[K] | Array<T[K]> | T | T[];
	options: T[];
	itemSize?: 'small' | 'medium' | 'large';
	variant?: 'standard' | 'outlined';
	label?: string;
	placeholder?: string;
	persistentPlaceholder?: boolean;
	prependIcon?: string;
	clearIcon?: string;
	multiple?: boolean;
	returnObject?: boolean;
	chip?: boolean;
	clearable?: boolean;
	error?: boolean;
	width?: number | string;
	titleKey?: K | string;
	valueKey?: K | string;
	rules?: Array<(value: T) => boolean | string>
	loading?: boolean;
	noDataText?: string;
	disabled?: boolean;
}

export interface FmSelectEmits<T extends FmSelectOption, K extends string & keyof T> {
	(event: 'click:prependIcon', value: MouseEvent): void;
	(event: 'click:clear', value: MouseEvent): void;
	(event: 'focus', value: FocusEvent): void;
	(event: 'blur', value: FocusEvent): void;
	(event: 'update:menu', value: boolean): void;
	(event: 'change', value: T[K] | Array<T[K]> | T | T[] | null): void;
	(event: 'update:modelValue', value: T[K] | Array<T[K]> | T | T[] | null): void;
}

export interface FmSelectSlots<T extends FmSelectOption> {
	'prepend-icon': () => VNode;
	'clear-icon': () => VNode;
	item: (props: { item: T; index: number }) => VNode;
	loader: () => VNode;
	'no-data': () => VNode;
	selection: (props: { value: T[] }) => VNode;
}
