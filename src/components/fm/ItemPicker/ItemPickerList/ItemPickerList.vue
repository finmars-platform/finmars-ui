<template>
	<div :class="['fm-item-picker-list', 'scroll-variant-thin']">
		<div
			v-for="cat in categories"
			:key="cat"
			:class="[
				'fm-item-picker-list__item',
				{
					'fm-item-picker-list__item--selected': cat === currentCategory
				}
			]"
			@click.stop.prevent="emits('select:category', cat)"
		>
			<span>
				{{
					cat === selectedCategoryName
						? `${selectedCategoryName} (${selectedCount})`
						: cat
				}}
			</span>

			<FmIcon
				icon="mdi-menu-right"
				:color="
					cat === currentCategory
						? 'var(--on-secondary)'
						: 'var(--on-surface-variant)'
				"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import type { FmItemPickerListProps, FmItemPickerListEmits } from './types'
	import FmIcon from '../../Icon/Icon.vue'

	defineProps<FmItemPickerListProps>()
	const emits = defineEmits<FmItemPickerListEmits>()
</script>

<style lang="scss" scoped>
	.fm-item-picker-list {
		position: relative;
		width: 100%;
		height: 100%;
		overflow-y: auto;

		&__item {
			display: flex;
			width: 100%;
			height: 40px;
			padding: 0 12px;
			justify-content: space-between;
			align-items: center;
			column-gap: var(--spacing-8);
			font-size: 14px;
			font-weight: 400;
			color: var(--on-surface);

			&--selected {
				background-color: var(--secondary);
				color: var(--on-secondary);
			}

			&:hover {
				cursor: pointer;
				color: var(--on-surface);
				background-color: color-mix(in srgb, var(--on-surface) 8%, transparent);

				i {
					color: var(--on-surface-variant) !important;
				}
			}
		}
	}
</style>
