import type { ComputedRef, Ref, VNode } from 'vue'

interface ListItem<T = any> {
	title: string;
	props: {
		[key: string]: any;
		title: string;
		value: any;
	}
	children?: ListItem<T>[];
}

export interface FmVSelectProps<T> {
	appendIcon?: string;
	bgColor?: string;
	color?: string;
	density: 'default' | 'comfortable' | 'compact';
	chips?: boolean;
	clearable?: boolean;
	closableChips?: boolean;
	disabled?: boolean;
	error?: boolean;
	errorMessages?: string | string[];
	focused?: boolean;
	hideDetails?: boolean;
	hideNoData?: boolean;
	hideSelected?: boolean;
	hint?: string;
	itemProps?: string | boolean;
	items: T[];
	itemTitle?: keyof T | string | any;
	itemValue?: keyof T | string | any;
	loading?: boolean;
	menu?: boolean;
	menuProps?: any;
	messages?: string | string[];
	maxWidth?: number | string;
	minWidth?: number | string;
	width?: number | string;
	modelValue?: T | T[keyof T] | any;
	multiple?: boolean;
	name?: string;
	noDataText?: string;
	openOnClear?: boolean;
	placeholder?: string;
	prependIcon?: string | any;
	prependInnerIcon?: string | any;
	readonly?: boolean;
	returnObject?: boolean;
	rounded?: string | number | boolean;
	singleLine?: boolean;
	tile?: boolean;
	variant?: 'outlined'
		| 'plain'
		| 'underlined'
		| 'filled'
		| 'solo'
		| 'solo-inverted'
		| 'solo-filled';
}

export interface FmVSelectEmits<T> {
	(event: 'click:clear', value: MouseEvent): void;
	(event: 'click:prepend', value: MouseEvent): void;
	(event: 'click:prependInner', value: MouseEvent): void;
	(event: 'click:selection', value: MouseEvent): void;
	(event: 'update:focused', value: boolean): void;
	(event: 'update:modelValue', value: T | T[keyof T] | unknown): void;
}

export interface FmVSelectSlots<T> {
	'append-inner': (props: {
		isActive: Ref<boolean>;
		isFocused: Ref<boolean>;
		controlRef: Ref<HTMLElement | undefined>
	}) => VNode;
	chip: (props: { item: ListItem<T>; index: number; props: Record<string, any> }) => VNode;
	clear: (props: {
		isActive: Ref<boolean>;
		isFocused: Ref<boolean>;
		controlRef: Ref<HTMLElement | undefined>
	}) => VNode;
	details: (props: {
		id: ComputedRef<string>;
		messagesId: ComputedRef<string>;
		isDirty: ComputedRef<boolean>;
		isDisabled: ComputedRef<boolean>;
		isReadonly: ComputedRef<boolean>;
		isPristine: Ref<boolean>;
		isValid: ComputedRef<boolean | null>;
		isValidating: Ref<boolean>;
	}) => VNode;
	item: (props: { item: ListItem<T>; index: number; props: Record<string, any> }) => VNode;
	loader: (props: { color?: string; isActive: boolean }) => VNode;
	message: (props: { message: string }) => VNode;
	'no-data': () => VNode;
	'prepend-inner': (props: {
		isActive: Ref<boolean>;
		isFocused: Ref<boolean>;
		controlRef: Ref<HTMLElement | undefined>
	}) => VNode;
	selection: (props: { item: ListItem<T>; index: number }) => VNode;
}
