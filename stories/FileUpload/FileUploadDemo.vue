<template>
	<div class="grid grid-cols-4">
		<FmFileUpload
			icon="mdi-file-upload-outline"
			variant="normal"
			label="Upload file(single)"
			dialogTitle="Cancel uploading"
			dialogContent="Are you sure that you want to cancel uploading files?"
			:multiple="false"
			:indeterminate="false"
			@update-files="getBrowsedFiles"
		/>
		<FmFileUpload
			icon="mdi-file-upload-outline"
			variant="normal"
			label="Upload files(multiple)"
			dialogTitle="Cancel uploading"
			dialogContent="Are you sure that you want to cancel uploading files?"
			:multiple="true"
			:indeterminate="false"
			@update-files="getBrowsedFiles"
		/>
		<FmFileUpload
			icon="mdi-upload"
			variant="large"
			label="Upload files(indeterminate)"
			dialogTitle="Cancel process"
			dialogContent="Are you sure that you want to cancel?"
			:indeterminate="true"
			@update-files="getBrowsedFiles"
		/>
	</div>
</template>

<script setup>
	import FmFileUpload from '@/components/fm/FileUpload/FileUpload.vue';

	const getBrowsedFiles = (files) => {
		console.log('Uploaded files array:', files);
	};
</script>
