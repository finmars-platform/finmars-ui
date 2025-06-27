import type { Nullable } from '@/types';

export type DatePickerDate = {
  dateISO: string;
  date: number;
  day: number;
  disabled?: boolean;
  erroneous?: boolean;
};

export interface FmDatePickerProps {
  modelValue: Nullable<string>;
  min?: string; // date/month ISO 8601 format
  max?: string; // date/month ISO 8601 format
  nonSelectableDates?: string[];
  erroneousDates?: string[];
  canWeekendsBeSelected?: boolean;
  showAdjacentMonths?: boolean;
  border?: boolean;
  disabled?: boolean;
}

export interface FmDatePickerEmits {
  (event: 'update:modelValue', value: string): void;
}

export interface FmYearMonthPickerProps {
  year: number;
  month: number;
  minYear?: number;
  maxYear?: number;
  disabled?: boolean;
}

export interface FmYearMonthPickerEmits {
  (event: 'update:year', value: number): void;
  (event: 'update:month', value: number): void;
}
