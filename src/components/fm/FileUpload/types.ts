export interface FmUploadFile {
	id: string;
	file: File | null;
	progress: number;
}

export interface FmDialogOptions {
	dialogTitle?: string;
	dialogContent?: string;
}

export interface FmFileUploadProps extends FmDialogOptions {
	icon?: string;
	variant?: 'normal' | 'large';
	label?: string;
	multiple: boolean;
	indeterminate: boolean;
}
