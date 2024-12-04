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
				color="var(--on-surface)"
			/>
		</template>
	</div>
</template>

<script setup lang="ts">
	import { computed, defineEmits } from 'vue'
	import cloneDeep from 'lodash/cloneDeep'
	import FmIcon from '@/components/fm/Icon/Icon.vue'
	import type { FmBreadcrumbProps } from './types'

	const props = withDefaults(defineProps<FmBreadcrumbProps>(), {
		crumbs: () => []
	})

	const emit = defineEmits(['updateCrumbs'])

	const last = computed(() =>
		!props.crumbs.length ? 0 : props.crumbs.length - 1
	)

	const handleBreadcrumbClick = (clickedIndex: number) => {
		const newCrumbs =
			clickedIndex < last.value
				? props.crumbs.slice(0, clickedIndex + 1)
				: props.crumbs

		let newPath = cloneDeep(newCrumbs)
			.map((item) =>
				(item.path || item.title).trim().toLowerCase().replace(/%20/g, ' ')
			)
			.join('/')

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
	}
</style>
