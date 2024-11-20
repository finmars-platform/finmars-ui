<template>
	<div class="mr-2" v-if="file.file">
		<div class="flex align-center justify-between pb-1">
			<div class="flex align-center justify-between gap-2 w-full title-wrap">
				<span class="file-name text-sm">{{ file.file.name }}</span>
				<span class="text-sm" style="color: var(--on-surface)">{{
					formatFileSize(file.file.size)
				}}</span>
			</div>
			<FmIcon
				v-if="file.progress < 100"
				@click="removeFile"
				:size="16"
				icon="mdi-close"
				class="ml-2"
			/>
			<FmIcon
				v-else
				:size="16"
				icon="mdi-check-circle-outline"
				class="ml-2 done"
			/>
		</div>
		<div class="flex align-center justify-between gap-4 pb-4">
			<div class="w-full relative">
				<VProgressLinear
					v-model="file.progress"
					v-bind="vProgressLinearProps"
				/>
				<span class="absolute progress-end-dot"></span>
			</div>
			<span class="text-sm" style="color: var(--on-surface)"
				>{{ file.progress }}%</span
			>
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

	const vProgressLinearProps = computed(() => ({
		rounded: true,
		roundedBar: true,
		color: 'var(--primary)',
		bgColor: 'var(--primary-container)',
		bufferColor: 'var(--primary-container)',
		bgOpacity: 1,
		indeterminate: props.indeterminate ? props.indeterminate : false
	}))

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

		.progress-end-dot {
			top: 0;
			right: 0;
			width: 4px;
			height: 4px;
			border-radius: 50%;
			background-color: var(--primary);
		}

		span {
			white-space: nowrap;
		}

		.title-wrap {
			width: calc(100% - 40px);

			.file-name {
				width: inherit;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				display: block;
				color: var(--on-surface);
			}
		}

		.done {
			color: var(--primary) !important;
		}
	}
</style>
