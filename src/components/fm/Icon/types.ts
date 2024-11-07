import { VNode } from 'vue'

export interface FmIconProps {
	color?: string;
	disabled?: boolean;
	icon?: string | Function;
	size?: string | number;
	start?: boolean;
	end?: boolean;
	tag?: string;
}

export interface FmIconSlots {
	default: () => VNode;
}
