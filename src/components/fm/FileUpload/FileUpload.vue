<template>
	<div class="upload-container">
		<div
			class="flex flex-row align-center flex-nowrap justify-start"
			@click="browseFile"
			style="cursor: pointer"
		>
			<FmIconButton :icon="icon" :variant="variant">
				<input
					type="file"
					ref="fileInputRef"
					@change="handleFileChange($event)"
					multiple
					hidden
				/>
			</FmIconButton>
			<span style="color: var(--on-surface)">{{ label }}</span>
		</div>
		<Teleport to="body">
			<div
				class="flex-column justify-between align-center upload-process-panel"
				v-if="files.length"
			>
				<div class="header w-full mb-4">
					<span class="text-lg" style="color: var(--on-surface)">
						Uploading {{ files.length }}
						{{ files.length === 1 ? 'item' : 'items' }}
					</span>
					<div class="header-actions">
						<FmIcon
							@click="toggleUploadPanel"
							:icon="isUploadPanelOpen ? 'mdi-chevron-down' : 'mdi-chevron-up'"
						/>
						<FmDialog @is-confirm="confirm" :title="title" :content="content" />
					</div>
				</div>
				<transition name="slide">
					<div class="body w-full scroll-variant-thin" v-if="isUploadPanelOpen">
						<FmFileUploadProcessing
							v-for="file in files"
							:key="file.id"
							:file="file"
							:indeterminate="indeterminate"
							@remove-file="removeFile"
						/>
					</div>
				</transition>
			</div>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
	import { reactive, ref } from 'vue'
	import FmIconButton from '@/components/fm/IconButton/IconButton.vue'
	import FmFileUploadProcessing from '@/components/fm/FileUpload/FileUploadProcessing.vue'
	import FmIcon from '@/components/fm/Icon/Icon.vue'
	import FmDialog from '@/components/fm/FileUpload/Dialog.vue'
	import type { FmFileUploadProps, FmUploadFile } from './types'

	withDefaults(defineProps<FmFileUploadProps>(), {
		icon: 'mdi-file-upload-outline',
		variant: 'normal',
		label: 'Upload file',
		title: 'Cancel uploading',
		content: 'Are you sure that you want to cancel uploading files?',
		indeterminate: false
	})

	const isUploadPanelOpen = ref(true)
	const fileInputRef = ref(null)
	const files = ref<FmUploadFile[]>([])
	const totalSize = ref(0)
	let fileDataList = reactive<FmUploadFile[]>([])

	const addListeners = (reader: FileReader, uniqueId: string) => {
		const file = fileDataList.find((item) => item.id === uniqueId)
		if (file) {
			const updateProgress = (event: ProgressEvent) => {
				if (event.lengthComputable) {
					totalSize.value = event.total || totalSize.value

					file.progress = parseInt(
						((event.loaded / totalSize.value) * 100).toFixed(2)
					)
				}
			}
			reader.addEventListener('loadstart', (event) => updateProgress(event))
			reader.addEventListener('load', (event) => updateProgress(event))
			reader.addEventListener('loadend', () => (file.progress = 100))
			reader.addEventListener('progress', (event) => updateProgress(event))
		}
	}

	const handleFileChange = (event: Event) => {
		const input = event.target as HTMLInputElement
		if (input?.files) {
			Array.from(input.files).forEach((file) => {
				const uniqueId = `${file.name}-${file.lastModified}` // Create a unique ID using file properties
				if (!files.value.some((f) => f.id === uniqueId)) {
					const item = {
						id: uniqueId,
						file: file,
						progress: 0
					}
					fileDataList.push(item)
					const reader = new FileReader()
					addListeners(reader, uniqueId) // Attach progress listeners
					reader.readAsDataURL(file) // Read the file as Data URL
					files.value.push(item) // Add the file to the list
				}
			})
		}
	}

	const browseFile = () => {
		if (fileInputRef.value) {
			fileInputRef.value.click()
		}
	}

	const clearAllFiles = () => {
		files.value = []
		fileDataList.splice(0, fileDataList.length)
	}

	const removeFile = (fileId: string) => {
		files.value = files.value.filter((file) => file.id !== fileId)
		const index = fileDataList.findIndex((fileData) => fileData.id === fileId)
		if (index !== -1) {
			fileDataList.splice(index, 1) // Remove the fileData reactively
		}
	}

	const toggleUploadPanel = () => {
		isUploadPanelOpen.value = !isUploadPanelOpen.value
	}

	const confirm = (action = false) => {
		if (action) {
			clearAllFiles()
		}
	}
</script>

<style scoped lang="scss">
	.upload-container {
		min-width: 560px;

		.file-upload-row {
			gap: var(--spacing-4);
		}
	}

	.body {
		max-height: 360px;
		overflow-y: auto;
	}

	.upload-process-panel {
		color: var(--on-surface);
		position: fixed;
		bottom: 0;
		right: 20px;
		width: 20%;
		min-width: 420px;
		border-top-left-radius: var(--spacing-24);
		border-top-right-radius: var(--spacing-24);
		background-color: var(--surface-container-high);
		padding: var(--spacing-24) var(--spacing-16) 0 var(--spacing-16);

		.header {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;
			gap: var(--spacing-16);

			.header-actions {
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				justify-content: space-between;
				align-items: center;
				gap: var(--spacing-8);
			}
		}
	}

	/* Transition styles */
	.slide-enter-active,
	.slide-leave-active {
		transition:
			max-height 0.2s ease,
			opacity 0.2s ease;
		overflow: hidden;
	}

	.slide-enter-from,
	.slide-leave-to {
		max-height: 0;
		opacity: 0;
	}

	.slide-enter-to,
	.slide-leave-from {
		max-height: 360px;
		opacity: 1;
	}

	:deep(.v-icon) {
		color: var(--on-surface) !important;
	}
</style>
