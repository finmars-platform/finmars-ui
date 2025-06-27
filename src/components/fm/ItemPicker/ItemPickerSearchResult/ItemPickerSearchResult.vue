<template>
	<div :class="['fm-item-picker-search-result', 'scroll-variant-thin']">
		<div
			v-for="item in items"
			:key="item.key"
			:class="[
				'fm-item-picker-search-result__item',
				{
					'fm-item-picker-search-result__item--disabled': isItemDisabled(item),
					'fm-item-picker-search-result__item--selected': !multiple && isItemSelected(item)
				}
			]"
			v-on="isItemDisabled(item) ? {} : { click: () => emits('select', item.key) }"
		>
			<FmCheckbox
				v-if="multiple"
				:model-value="isItemSelected(item)"
				:disabled="isItemDisabled(item)"
			/>

			<span class="fm-item-picker-search-result__item-text" v-fm-html="getItemName(item)" />
		</div>
	</div>
</template>

<script lang="ts" setup generic="T extends FmAttribute">
	import FmCheckbox from '../../Checkbox/Checkbox.vue';
	import FmHtml from '@/directives/fm/Html';
	import type { FmAttribute } from '@/types';
	import type { FmItemPickerSearchResultProps, FmItemPickerSearchResultEmits } from './types';

	const vFmHtml = FmHtml;

	const props = withDefaults(defineProps<FmItemPickerSearchResultProps<T>>(), {
		searchText: '',
		initialSelectedItems: () => [],
		selectedItems: () => [],
		mode: 'add'
	});
	const emits = defineEmits<FmItemPickerSearchResultEmits>();

	function isItemDisabled(item: T) {
		return props.mode === 'add' && props.initialSelectedItems.includes(item.key);
	}

	function isItemSelected(item: T) {
		return props.selectedItems.includes(item.key);
	}

	function getItemName(item: T) {
		const processedName = item.name.split('. ');
		const name = processedName.slice(-1)[0];
		const index = name.toLocaleLowerCase().indexOf(props.searchText.toLocaleLowerCase());
		const part1 = name.slice(0, index);
		const part2 = name.slice(index, index + props.searchText.length);
		const part3 = name.slice(index + props.searchText.length);
		let result = `<span>${processedName[0]}`;
		for (const p of processedName.slice(0, -1)) {
			result += `&nbsp;&rarr;&nbsp;${p}`;
		}
		return `${result}&nbsp;&rarr;&nbsp;${part1}<span class="fm-item-picker-search-result__item-text--highlight">${part2}</span>${part3}`;
	}
</script>

<style lang="scss" scoped>
	.fm-item-picker-search-result {
		--fmItemPickerSearchResilt-item-height: 40px;
		--fmItemPickerSearchResilt-item-color: var(--on-surface);

		position: relative;
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;

		&__item {
			position: relative;
			width: 100%;
			height: var(--fmItemPickerSearchResilt-item-height);
			display: flex;
			justify-content: flex-start;
			align-items: center;
			column-gap: var(--spacing-8);
			padding: 0 var(--spacing-8) 0 var(--spacing-12);
			font-size: 14px;
			font-weight: 400;
			line-height: 20px;
			color: var(--fmItemPickerSearchResilt-item-color);

			&:not(.fm-item-picker-search-result__item--disabled) {
				cursor: pointer;

				&:hover {
					color: var(--on-surface);
					background-color: color-mix(in srgb, var(--on-surface) 8%, transparent);
				}
			}

			&-text {
				flex-grow: 1;

				:deep(.fm-item-picker-search-result__item-text--highlight) {
					font-weight: 700;
					color: var(--primary);
				}
			}

			&--disabled {
				color: color-mix(in srgb, var(--fmItemPickerSearchResilt-item-color) 38%, transparent);

				.fm-item-picker-search-result__item-text {
					:deep(.fm-item-picker-search-result__item-text--highlight) {
						font-weight: 700;
						color: color-mix(in srgb, var(--primary) 38%, transparent);
					}
				}
			}

			&--selected {
				background-color: var(--secondary);
				color: var(--on-secondary);
			}
		}
	}
</style>
