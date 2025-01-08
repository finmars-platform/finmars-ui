export type DateTreeItemSelectedStatus = 'selected' | 'unselected' | 'partially';

export type DateTreeItem = {
	title: string;
	value: number;
	level: number;
	selectedStatus: DateTreeItemSelectedStatus;
	isOpened?: boolean;
	children?: Array<DateTreeItem>;
};

export interface FmDateTreeProps {
	modelValue: string[];
	data: string[];
	includeTime?: boolean;
}

export interface FmDateTreeEmits {
	(event: 'update:modelValue', value: string[]): void;
}

export interface FmDateTreeItemProps {
	item: DateTreeItem;
}

export interface FmDateTreeItemEmits {
	(event: 'click', value: MouseEvent): void;
	(event: 'select', value: DateTreeItem): void;
}
