<template>
	<div class="grid grid-cols-4">
		<FmFileUpload
			icon="mdi-file-upload-outline"
			variant="normal"
			label="Upload file"
			title="Cancel uploading"
			content="Are you sure that you want to cancel uploading files?"
			:indeterminate="false"
		/>
		<FmFileUpload
			icon="mdi-upload"
			variant="large"
			label="Shoose files"
			title="Cancel process"
			content="Are you sure that you want to cancel?"
			:indeterminate="true"
		/>
	</div>
</template>

<script setup>
	import FmFileUpload from '@/components/fm/FileUpload/FileUpload.vue'
</script>
