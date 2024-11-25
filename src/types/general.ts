export interface FmComponentIcon {
	icon: string
	size?: number | string
	color?: string
}

export type PlaceLocation =
	| 'top'
	| 'bottom'
	| 'start'
	| 'end'
	| 'left'
	| 'right'
	| 'center'
	| 'center center'
	| 'top start | center'
	| 'top end | center'
	| 'bottom start | center'
	| 'bottom end | center'
	| 'start top | center'
	| 'end top | center'
	| 'left top | center'
	| 'right top | center'
	| 'start bottom | center'
	| 'end bottom | center'
	| 'left bottom | center'
	| 'right bottom | center'
