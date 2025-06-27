import type { Nullable } from '@/types';

export interface FmTimePickerProps {
  modelValue: Nullable<string>; // 'HH:mm'
  minutesStep?: 1 | 2 | 5 | 10 | 15 | 20 | 30;
  size?: number;
}

export interface FmTimePickerEmits {
  (event: 'update:modelValue', value: string): void;
}
