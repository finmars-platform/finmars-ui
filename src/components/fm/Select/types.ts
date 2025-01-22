import { VNode } from 'vue';

export interface FmSelectOption {
  title?: string;
  value?: string | number | boolean;
}

export interface FmSelectActivatorProps {
  value: string | string[];
  isDropdownOpened?: boolean;
  variant: 'standard' | 'outlined';
  compact?: boolean;
  label?: string;
  placeholder?: string;
  persistentPlaceholder?: boolean;
  prependIcon?: string;
  clearIcon?: string;
  clearable?: boolean;
  chip?: boolean;
  width?: number | string;
  error?: boolean;
  focused?: boolean;
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
  (
    event: 'keydown',
    value: {
      event: KeyboardEvent;
      key: 'down' | 'up' | 'esc' | 'enter' | 'space' | 'tab';
    }
  ): void;
}

export interface FmSelectProps<T extends any & FmSelectOption, K extends string & keyof T> {
  modelValue: T[K] | Array<T[K]> | T | T[] | null;
  options: any[];
  itemSize?: 'small' | 'medium' | 'large';
  variant?: 'standard' | 'outlined';
  compact?: boolean;
  label?: string;
  placeholder?: string;
  persistentPlaceholder?: boolean;
  prependIcon?: string;
  clearIcon?: string;
  multiple?: boolean;
  returnObject?: boolean;
  anyUpdateEmits?: boolean; // if false in the not multiple mode FmSelect doesn't emit 'update:modelValue' event for the same value
  titleKey?: K | string;
  valueKey?: K | string;
  chip?: boolean;
  clearable?: boolean;
  error?: boolean;
  width?: number | string;
  rules?: Array<(value: T) => boolean | string>;
  focused?: boolean;
  loading?: boolean;
  scrollStrategy?: 'close' | 'block' | 'none' | 'reposition';
  noDataText?: string;
  disabled?: boolean;
}

export interface FmSelectEmits<T extends any & FmSelectOption, K extends string & keyof T> {
  (event: 'click:prependIcon', value: MouseEvent): void;
  (event: 'click:clear', value: MouseEvent): void;
  (event: 'focus'): void;
  (event: 'blur'): void;
  (event: 'update:menu', value: boolean): void;
  (event: 'update:modelValue', value: T[K] | Array<T[K]> | T | T[] | null): void;
}

export interface FmSelectSlots<T extends any & FmSelectOption> {
  'prepend-icon': () => VNode;
  'clear-icon': () => VNode;
  item: (props: { item: T; index: number }) => VNode;
  loader: () => VNode;
  'no-data': () => VNode;
  selection: (props: { value: T[] }) => VNode;
}
