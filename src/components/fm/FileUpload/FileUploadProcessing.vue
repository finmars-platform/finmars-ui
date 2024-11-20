<template>
	<div class="processing-item-content" v-if="file.file">
		<div class="item-info-content">
			<div class="title-wrap">
				<span class="file-name">{{ file.file.name }}</span>
				<span class="file-size">{{ formatFileSize(file.file.size) }}</span>
			</div>
			<FmIcon
				v-if="file.progress < 100"
				@click="removeFile"
				:size="16"
				icon="mdi-close"
				class="progress-close"
			/>
			<FmIcon
				v-else
				:size="16"
				icon="mdi-check-circle-outline"
				class="progress-done"
			/>
		</div>
		<div class="progress-linear-content">
			<div>
				<VProgressLinear
					v-model="file.progress"
					v-bind="vProgressLinearProps"
				/>
				<span class="progress-end-dot"></span>
			</div>
			<span class="progress-percent">{{ file.progress }}%</span>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	import { VProgressLinear } from 'vuetify/components'
	import FmIcon from '@/components/fm/Icon/Icon.vue'
	import { FmUploadFile } from './types'

	const props = defineProps<{ file: FmUploadFile; indeterminate: boolean }>()
	const emits = defineEmits(['removeFile'])

	const vProgressLinearProps = computed(() => {
		const { indeterminate, file } = props

		return {
			rounded: true,
			roundedBar: true,
			color: 'var(--primary)',
			bgColor: 'var(--primary-container)',
			bufferColor: 'var(--primary-container)',
			bgOpacity: 1,
			indeterminate: indeterminate && file.progress !== 100
		}
	})

	const removeFile = () => {
		emits('removeFile', props.file.id)
	}

	const formatFileSize = (size: number) => {
		const units = ['B', 'KB', 'MB', 'GB']
		let unitIndex = 0
		while (size >= 1024 && unitIndex < units.length - 1) {
			size /= 1024
			unitIndex++
		}
		return `${size.toFixed(1)} ${units[unitIndex]}`
	}
</script>

<style scoped lang="scss">
	.body {
		max-height: 360px;
		overflow-y: auto;
	}

	.processing-item-content {
		margin-right: var(--spacing-8);

		.item-info-content {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: var(--spacing-4);

			.title-wrap {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: var(--spacing-8);
				width: calc(100% - var(--spacing-48));

				.file-name {
					width: inherit;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: var(--spacing-12);
					color: var(--on-surface);
				}

				.file-size {
					font-size: var(--spacing-12);
					color: var(--on-surface);
				}
			}

			.progress-close {
				margin-left: var(--spacing-8);
			}

			.progress-done {
				margin-left: var(--spacing-8);
				color: var(--primary) !important;
			}
		}

		.progress-linear-content {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: var(--spacing-16);
			padding-bottom: var(--spacing-8);

			.progress-end-dot {
				position: absolute;
				top: 0;
				right: 0;
				width: var(--spacing-4);
				height: var(--spacing-4);
				border-radius: 50%;
				background-color: var(--primary);
			}

			.progress-percent {
				font-size: var(--spacing-12);
				color: var(--on-surface);
			}
		}

		.progress-linear-content div {
			width: 100%;
			position: relative;
		}

		span {
			white-space: nowrap;
		}
	}
</style>
