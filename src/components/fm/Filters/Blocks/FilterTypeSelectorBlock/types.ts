import type { FmFilter, FmFilterType } from '@/types'

export interface FmFilterTypeSelectorBlockProps {
	filter: FmFilter
	isFilterLinked?: boolean
}

export interface FmFilterTypeSelectorBlockEmits {
	(event: 'update', value: FmFilterType): void
}
