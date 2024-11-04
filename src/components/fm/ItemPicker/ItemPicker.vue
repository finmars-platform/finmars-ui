<template>
	<div
		class="fm-item-picker"
		@keydown.down.stop.prevent="onKeydown('down')"
		@keydown.up.stop.prevent="onKeydown('up')"
		@keydown.left.stop.prevent="onKeydown('left')"
		@keydown.right.stop.prevent="onKeydown('right')"
		@keydown.enter.stop.prevent="onKeydown('enter')"
	>
		<div class="toolbar">
			<FmTextField
				v-model="searchText"
				:placeholder="fieldsTitles.searchPlaceholder"
				prepend-icon="mdi-magnify"
				hide-details
				clearable
			/>
		</div>

		<div
			:class="[
				'body',
				{
					'body--multiple': multiple,
					'body--no-result': !isEmpty(searchText) && !allDataFlattenedFiltered.length,
				}
			]"
		>
			<div
				v-if="!isEmpty(dataRestoredFromFlattenedData)"
				:class="['list', 'scroll-variant-thin']"
			>
				<div
					v-for="category in dataRestoredFromFlattenedData"
					:key="category.id"
					:class="[
						'item',
						{ 'item--selected': category.id === focusedItems[0] },
					]"
					@click="focusedItems[0] = category.id"
				>
					<span>{{ category.label }}</span>
					<VIcon
						icon="mdi-menu-right"
						:color="category.id === focusedItems[0] ? 'var(--on-secondary)' : 'var(--on-surface-variant)'"
					/>
				</div>
			</div>

			<div :class="['content', 'scroll-variant-thin']">
				<FmItemPickerSearchResult
					v-if="currentCategory && currentCategory.id === 'search-result' && allDataFlattenedFiltered.length"
					:search-text="searchText"
					:items="allDataFlattenedFiltered"
					:all-items="allDataFlattenedById"
					:multiple="multiple"
					:mode="mode"
					:initial-selected-items-ids="initialSelectedItemsIds"
					:selected-items-ids="selectedItemsIds"
					@select="select"
				/>

				<template v-else>
					<div
						v-if="!currentCategory?.children || !currentCategory?.children.length"
						class="empty"
					>
						{{ fieldsTitles.noResultText }}
					</div>

					<template v-else>
						<template
							v-for="item in currentCategory?.children"
							:key="item.id"
						>
							<FmItemPickerItem
								v-if="!item.children"
								:item="item"
								:multiple="multiple"
								:is-selected="selectedItemsIds.includes(item.id)"
								:disabled="mode === 'add' && initialSelectedItemsIds.includes(item.id)"
								@select="select"
							/>

							<FmItemPickerGroup
								v-else
								:group="item"
								:multiple="multiple"
								:mode="mode"
								:initial-selected-items-ids="initialSelectedItemsIds"
								:selected-items-ids="selectedItemsIds"
								@select="select"
							/>
						</template>
					</template>
				</template>
			</div>
		</div>

		<div v-if="multiple" class="actions">
			<FmButton
				type="secondary"
				rounded
				@click="emits('close')"
			>
				{{ fieldsTitles.cancelBtn }}
			</FmButton>

			<FmButton
				rounded
				:disabled="addBtnDisabled"
				@click="updateValue"
			>
				{{ mode === 'add' ? fieldsTitles.addBtn : fieldsTitles.updateBtn }}
			</FmButton>
		</div>
	</div>
</template>

<script setup>
	import { watch } from 'vue'
	import { VIcon } from 'vuetify/components'
	import isEmpty from 'lodash/isEmpty'
	import useItemPicker from './useItemPicker'
	import FmTextField from '@/components/fm/TextField/TextField.vue'
	import FmButton from '@/components/fm/Button/Button.vue'
	import FmItemPickerSearchResult from './ItemPickerSearchResult.vue'
	import FmItemPickerGroup from './ItemPickerGroup.vue'
	import FmItemPickerItem from './ItemPickerItem.vue'

	/*
		Items typing

		interface Item {
			id: string | number;
			label: string;
			tooltip?: string;
			disabled?: boolean;
			children?: Item[];
			[key: string]: any;
		}
	 */

	const props = defineProps({
		modelValue: {
			type: Array,
			default: () => []
		},
		categories: {
			type: Array,
			default: () => [] // Item[];
		},
		suggested: {
			type: Array,
			default: () => []
		},
		mode: {
			type: String,
			default: 'add',
			validator(value) {
				return ['add', 'update'].includes(value)
			}
		},
		multiple: {
			type: Boolean
		},
		width: {
			type: [String, Number],
			default: 700,
		},
		height: {
			type: [String, Number],
			default: 380
		},
		fieldsTitles: {
			type: Object,
			default: () => ({
				searchPlaceholder: 'Search',
				noResultText: 'No results',
				allCategoriesLabel: 'All categories',
				suggestedLabel: 'Suggested',
				selectedLabel: 'Selected',
				cancelBtn: 'Cancel',
				addBtn: 'Add',
				updateBtn: 'Update'
			})
		}
	})

	const emits = defineEmits([
		'close',
		'update:modelValue'
	])

	const {
		searchText,
		focusedItems,
		widthValue,
		heightValue,
		initialSelectedItemsIds,
		selectedItemsIds,
		addBtnDisabled,
		allDataFlattenedById,
		allDataFlattenedFiltered,
		dataRestoredFromFlattenedData,
		currentCategory,
		select,
		updateValue,
	} = useItemPicker(props, emits)

	function onKeydown(key) {
		// TODO implement later
	}

	watch(
		() => isEmpty(searchText.value),
		(val, oldVal) => {
			if (!oldVal && val) {
				focusedItems.value[0] = dataRestoredFromFlattenedData.value[0]?.id
			} else if (oldVal && !val) {
				focusedItems.value[0] = 'search-result'
			}
		}, {
			immediate: true
		}
	)
</script>

<style lang="scss" scoped>
	.fm-item-picker {
		--color-fmItemPicker: var(--on-surface);
		--backgroundColor-fmItemPicker: var(--surface-container-high);
		--height-fmItemPicker: v-bind(heightValue);
		--width-list-fmItemPicker: 212px;
		--heigh-actions-fmItemPicker: 88px;

		position: relative;
		width: v-bind(widthValue);
		height: var(--height-fmItemPicker);
		border-radius: 28px;
		background-color: var(--backgroundColor-fmItemPicker);
		color: var(--color-fmItemPicker);
		overflow: hidden;
	}

	.toolbar {
		position: relative;
		padding-top: 4px;

		:deep(.fm-text-field) {
			--backgroundColor-fmTextField: var(--surface-container-high);
		}
	}

	.body {
		position: relative;
		width: 100%;
		height: calc(100% - 60px);
		display: flex;
		justify-content: flex-start;
		align-items: stretch;
		padding-bottom: var(--spacing-8);

		&--multiple {
			height: calc(100% - 60px - var(--heigh-actions-fmItemPicker));
		}

		&--no-result {
			justify-content: center;
		}
	}

	.list {
		position: relative;
		width: var(--width-list-fmItemPicker);
		padding-right: var(--spacing-4);
		overflow-x: hidden;
		overflow-y: auto;
	}

	.content {
		position: relative;
		width: calc(100% - var(--width-list-fmItemPicker));
		overflow-x: hidden;
		overflow-y: auto;
	}

	.empty {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--spacing-16);
		font-size: 16px;
		font-weight: 400;
		color: var(--color-fmItemPicker);
	}

	.actions {
		position: relative;
		width: 100%;
		height: var(--heigh-actions-fmItemPicker);
		display: flex;
		justify-content: flex-end;
		align-items: center;
		column-gap: var(--spacing-16);
		padding: 0 24px;
		border-top: 1px solid var(--outline-variant);
	}

	.item {
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
</style>
