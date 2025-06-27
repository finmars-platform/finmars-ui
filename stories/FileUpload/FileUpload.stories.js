import { ref, watch } from 'vue';
import FmFileUpload from '@/components/fm/FileUpload/FileUpload.vue';
import FileUploadDemo from './FileUploadDemo.vue';

const meta = {
	title: 'Components/FmFileUpload',
	component: FmFileUpload,
	icon: {
		control: 'select',
		options: 'mdi-file-upload-outline'
	},
	label: {
		control: 'select',
		options: 'Upload file'
	},
	variant: {
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
	multiple: {
		control: 'select',
		options: true
	},
	indeterminate: {
		control: 'select',
		options: false
	},
	args: {
		icon: 'mdi-file-upload-outline',
		label: 'Upload file',
		variant: 'normal',
		modalTitle: 'Cancel uploading',
		modalContent: 'Are you sure that you want to cancel uploading files?',
		multiple: true,
		indeterminate: false
	}
};

export default meta;

export const General = {
	render: (args) => ({
		components: {
			FmFileUpload
		},
		setup() {
			const key = ref(1);

			watch(args, () => {
				key.value = new Date().getTime();
			});

			return {
				args,
				key
			};
		},
		template: `
			<FileUploadDemo v-bind="args" :key="key" />
		`
	})
};

export const AllVariants = {
	render: (args) => ({
		components: {
			FileUploadDemo
		},
		setup() {
			return { args };
		},
		template: `
			<FileUploadDemo />`
	})
};
