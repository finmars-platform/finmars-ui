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

export interface FmAttribute {
	key: string
	name: string // composed `${field1}. ${field2}. ...`
	description?: string

	[key: string]: unknown
}

export type FmFilterType =
	| 'contains'
	| 'equal'
	| 'not_equal'
	| 'greater'
	| 'greater_equal'
	| 'less'
	| 'less_equal'
	| 'from_to'
	| 'out_of_range'
	| 'empty'
	| 'selector'
	| 'multiselector'
	| 'date_tree'
	| 'use_from_above'

export type FmFilterRangeValues = {
	max_value: number | string
	min_value: number | string
}

export interface FmFilter {
	content_type?: string // composed value {field1}.{field2}.{field3}.{...
	key: string // composed value {field1}.{field2}.{field3}.{...
	layout_name?: string
	name: string
	value_type: number | 'field' // 10 - string, 20 - number, 30 - classifier/enumeration, 40 - date as string (YYYY-MM-DD), 50 - boolean, 80 - date as string (YYYY-MM-DD HH:mm:ss)
	options: {
		enabled: boolean
		exclude_empty_cells?: boolean
		filter_type: FmFilterType
		filter_values: string[] | number[] | boolean[] | FmFilterRangeValues // FmFilterRangeValues for 'from_to' and 'out_of_range' filters
		use_from_above?: {
			// for linked filter ?
			attrs_entity_type?: string
			key?: string // composed value {field1}.{field2}.{field3}.{...
		}
	}
}
