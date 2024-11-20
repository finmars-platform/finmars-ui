import { ref, watch } from 'vue'
import FmFileUpload from '@/components/fm/FmFileUpload/FmFileUpload.vue'
import FileUploadDemo from './FileUploadDemo.vue'

const meta = {
	title: 'Components/FmTabs',
	component: FmFileUpload,
	icon: {
		control: 'select',
		options: 'mdi-file-upload-outline'
	},
	variant: {
		control: 'select',
		options: 'Upload file'
	},
	label: {
		control: 'select',
		options: ['normal', 'small']
	},
	modalTitle: {
		control: 'select',
		options: 'Cancel uploading'
	},
	modalContent: {
		control: 'select',
		options: 'Are you sure that you want to cancel uploading files?'
	},
	indeterminate: {
		control: 'select',
		options: false
	}
}

export default meta

export const General = {
	render: (args) => ({
		components: {
			FmFileUpload
		},
		setup() {
			const key = ref(1)

			watch(args, () => {
				key.value = new Date().getTime()
			})

			return {
				args,
				key
			}
		},
		template: `
        <FileUploadDemo :key="key"/>
    `
	})
}

export const AllVariants = {
	render: (args) => ({
		components: {
			FileUploadDemo
		},
		setup() {
			return { args }
		},
		template: `
        <FileUploadDemo/>`
	})
}
