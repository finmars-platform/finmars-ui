import type { FmAttributeGroup } from '@/components/fm/ItemPicker/ItemPickerContent/types'

export interface FmItemPickerGroupProps {
	level: number
	items: FmAttributeGroup
	mode: 'add' | 'update'
	selected: string[]
	suggested: string[]
	initialSelected: string[]
	multiple?: boolean
}

export interface FmItemPickerGroupEmits {
	(event: 'update:modelValue', value: string): void
	(event: 'update:suggested', value: string): void
}
