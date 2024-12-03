<template>
	<div class="breadcrumbs">
		<template v-for="(crumb, index) in crumbs" :key="crumb">
			<div
				@click="handleBreadcrumbClick(index)"
				:class="[
					'breadcrumbs-items',
					{
						disabled: index === last
					}
				]"
			>
				{{ crumb.title }}
			</div>
			<FmIcon
				v-if="index !== last"
				:size="22"
				icon="mdi-chevron-right"
				class="breadcrumbs-arrow"
			/>
		</template>
	</div>
</template>

<script setup lang="ts">
	import { defineEmits, ref, watch } from 'vue'
	import FmIcon from '@/components/fm/Icon/Icon.vue'
	import type { FmBreadcrumbItem, FmBreadcrumbProps } from './types'

	const props = withDefaults(defineProps<FmBreadcrumbProps>(), {
		crumbs: () => [] as FmBreadcrumbItem[]
	})

	const emit = defineEmits(['updateCrumbs'])
	const last = ref(0)

	watch(
		() => props.crumbs,
		(newVal) => {
			last.value = newVal.length - 1
		},
		{ immediate: true }
	)

	const handleBreadcrumbClick = (clickedIndex: number) => {
		let newCrumbs: FmBreadcrumbItem[]
		let newPath: string = ''

		if (clickedIndex < last.value) {
			newCrumbs = props.crumbs.slice(0, clickedIndex + 1).map((item) => item)
			newPath = props.crumbs
				.slice(0, clickedIndex + 1)
				.map((item) =>
					(item.path || item.title).trim().toLowerCase().replace(/%20/g, ' ')
				)
				.join('/')
		} else {
			newCrumbs = props.crumbs.map((item) => item)
			newPath = props.crumbs
				.map((item) =>
					(item.path || item.title).trim().toLowerCase().replace(/%20/g, ' ')
				)
				.join('/')
		}

		if (newPath && !newPath.startsWith('/')) {
			newPath = '/' + newPath
		}
		emit('updateCrumbs', newCrumbs, newPath)
	}
</script>

<style scoped lang="scss">
	.breadcrumbs {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		text-align: left;
		gap: var(--spacing-4);
		color: var(--primary);
		min-height: var(--spacing-48);
		border-bottom: 1px solid var(--outline-variant);
		padding: 2px;

		.breadcrumbs-items {
			cursor: pointer;
			display: inline-flex;
			align-items: center;

			&.disabled {
				cursor: auto;
				pointer-events: none;
				color: var(--on-surface);
			}

			&:hover {
				color: var(--on-surface);
			}
		}

		:deep(.breadcrumbs-arrow) {
			color: var(--on-surface) !important;
		}
	}
</style>
