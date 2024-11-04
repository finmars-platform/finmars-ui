<template>
	<div :class="['item-picker-search-result', 'scroll-variant-thin']">
		<div
			v-for="item in items"
			:key="item.id"
			:class="[
				'item',
				{ 'disabled': isItemDisabled(item), 'selected': !multiple && isItemSelected(item) },
			]"
			v-on="isItemDisabled(item) ? {} : { click: () => emits('select', item.id) }"
		>
			<FmCheckbox
				v-if="multiple"
				:model-value="isItemSelected(item)"
				:disabled="isItemDisabled(item)"
			/>

			<span class="text" v-html="getItemLabel(item)" />
		</div>
	</div>
</template>

<script setup>
	import get from 'lodash/get'
	import FmCheckbox from '@/components/fm/Checkbox/Checkbox.vue'

	const props = defineProps({
		searchText: {
			type: String,
		},
		items: {
			type: Array,
			required: true,
			default: () => [],
		},
		allItems: {
			type: Object,
			default: () => ({}),
		},
		multiple: {
			type: Boolean,
		},
		mode: {
			type: String,
			default: 'add',
			validator(value) {
				return ['add', 'update'].includes(value)
			},
		},
		initialSelectedItemsIds: {
			type: Array,
			default: () => [],
		},
		selectedItemsIds: {
			type: Array,
			default: () => [],
		},
	})

	const emits = defineEmits(['select'])

	function isItemDisabled(item) {
		return props.mode === 'add' && props.initialSelectedItemsIds.includes(item.id)
	}

	function isItemSelected(item) {
		return props.selectedItemsIds.includes(item.id)
	}

	function getItemLabel(item) {
		const { compositeId } = item
		const extractedIds = compositeId.split('.')
		let result = '<span>'

		extractedIds.forEach((id, index) => {
			const label = get(props.allItems, [id, 'label'], '')

			if (index === (extractedIds.length - 1)) {
				const index = label.toLocaleLowerCase().indexOf(props.searchText.toLocaleLowerCase())
				const part1 = label.slice(0, index)
				const part2 = label.slice(index, index + props.searchText.length)
				const part3 = label.slice(index + props.searchText.length)
				result += `${part1}<b>${part2}</b>${part3}`
			} else {
				result += `${label}&nbsp;&rarr;&nbsp;`
			}
		})

		return result
	}
</script>

<style lang="scss" scoped>
	.item-picker-search-result {
		--height-item-fmItemPicker: 40px;
		--color-item-fmItemPicker: var(--on-surface);

		position: relative;
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.item {
		position: relative;
		width: 100%;
		height: var(--height-item-fmItemPicker);
		display: flex;
		justify-content: flex-start;
		align-items: center;
		column-gap: var(--spacing-8);
		padding: 0 var(--spacing-8) 0 var(--spacing-12);
		font-size: 14px;
		font-weight: 400;
		line-height: 20px;
		color: var(--color-item-fmItemPicker);

		&:not(.disabled) {
			cursor: pointer;

			&:hover {
				color: var(--on-surface);
				background-color: color-mix(in srgb, var(--on-surface) 8%, transparent);
			}
		}
	}

	.text {
		flex-grow: 1;
	}

	.disabled {
		color: color-mix(in srgb, var(--color-item-fmItemPicker) 38%, transparent);
	}

	.selected {
		background-color: var(--secondary);
		color: var(--on-secondary);
	}
</style>
