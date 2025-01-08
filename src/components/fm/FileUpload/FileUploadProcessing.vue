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

			<FmIcon v-else :size="16" icon="mdi-check-circle-outline" class="progress-done" />
		</div>

		<div class="progress-linear-content">
			<div>
				<FmProgressLinear :model-value="file.progress" />
				<span class="progress-end-dot"></span>
			</div>
			<span class="progress-percent">{{ file.progress }}%</span>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { formatFileSize } from '@/utils';
	import FmIcon from '@/components/fm/Icon/Icon.vue';
	import FmProgressLinear from '@/components/fm/ProgressLinear/ProgressLinear.vue';
	import { FmUploadFile } from './types';

	const props = defineProps<{ file: FmUploadFile; indeterminate: boolean }>();
	const emits = defineEmits(['removeFile']);

	const removeFile = () => {
		emits('removeFile', props.file.id);
	};
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
			padding-bottom: var(--spacing-16);

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
