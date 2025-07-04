import type { FmAttribute } from '@/types';

export interface FmAttributeGroup {
  name: string;
  itemType: 'group';
  key: string;
  content: Record<string, FmAttributeGroup | FmAttribute>;
}

export interface FmItemPickerContentProps {
  category: string;
  attributes?: Record<string, FmAttributeGroup>;
  suggested: string[];
  selected: string[];
  initialSelected: string[];
  allowSuggested?: boolean;
  multiple?: boolean;
  mode: 'add' | 'update';
  locals?: {
    suggested: string;
    selected: string;
  };
}

export interface FmItemPickerContentEmits {
  (event: 'update:suggested', value: string): void;
  (event: 'update:modelValue', value: string): void;
}
