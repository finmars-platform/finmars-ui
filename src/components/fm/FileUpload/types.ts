export interface FmUploadFile {
	id: string
	file: File | null
	progress: number
}

export interface FmDialogOptions {
	title?: string
	content?: string
}

export interface FmFileUploadProps extends FmDialogOptions {
	icon?: string
	variant?: 'normal' | 'large'
	label?: string
	indeterminate: boolean
}
