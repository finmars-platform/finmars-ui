import { type FmAttribute, FmFilter } from '@/types'
import type { FmSelectOption } from '@/components/fm/Select/types'

export interface FmFilterEditorProps {
	value?: FmFilter
	getFilterOptions: <T extends FmSelectOption>(filter: FmFilter) => Promise<T[]>
	getSourceLinkedGroups: <T extends FmSelectOption>(filter: FmFilter) => Promise<T[]>
	getSourceLinkedGroupAttributes: (filter: FmFilter) => FmAttribute[]
	locals?: {
		linkedGroupPlaceholder?: string
		linkedFieldPlaceholder?: string
		linkedCondition?: string
		linkedFilterTypePlaceholder?: string
	}
}

export interface FmFilterEditorEmits {
	(event: 'cancel'): void
	(event: 'update:modelValue', value: FmFilter): void
}
