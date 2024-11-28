import type { VNode } from 'vue'
import type { FmComponentIcon, PlaceLocation } from '@/types'

export interface FmChipProps {
	value?: string
	tooltip?: string | { value: string; location: PlaceLocation }
	type?: 'standard' | 'outlined'
	compact?: boolean
	prependIcon?: FmComponentIcon | string
	appendIcon?: FmComponentIcon | string
	closable?: boolean
	rounded?: boolean
	elevated?: boolean
	dragged?: boolean
	readonly?: boolean
	disabled?: boolean
}

export interface FmChipEmits {
	(event: 'click', value: MouseEvent): void
	(event: 'click:prepend', value: MouseEvent): void
	(event: 'click:append', value: MouseEvent): void
	(event: 'click:close', value: MouseEvent): void
	(event: 'keydown', value: KeyboardEvent): void
}

export interface FmChipSlots {
	'prepend-icon': () => VNode
	'append-icon': () => VNode
}
