import type { FmSelectOption } from '@/components/fm/Select/types'
import type { FmAttribute, FmFilter } from '@/types'

export interface FmFilterLinkedBlockProps {
	filter: FmFilter
	getSourceLinkedGroups: <T extends FmSelectOption>(
		filter: FmFilter
	) => Promise<T[]>
	getSourceLinkedGroupAttributes: (filter: FmFilter) => FmAttribute[]
	locals?: {
		linkedGroupPlaceholder?: string
		linkedFieldPlaceholder?: string
		linkedCondition?: string
		linkedFilterTypePlaceholder?: string
	}
}

export interface FmFilterLinkedBlockEmits {
	(event: 'update', value: FmFilter): void
}
