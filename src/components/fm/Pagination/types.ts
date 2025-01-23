export interface FmPaginationProps {
  modelValue: number;
  itemsPerPage: number;
  totalItems: number;
  locals?: {
    of?: string;
    entities?: string;
    page?: string;
  };
  withInfo?: boolean;
  disabled?: boolean;
}

export interface FmPaginationEmits {
  (event: 'first', value: number): void;
  (event: 'last', value: number): void;
  (event: 'prev', value: number): void;
  (event: 'next', value: number): void;
  (event: 'update:modelValue', value: number): void;
}
