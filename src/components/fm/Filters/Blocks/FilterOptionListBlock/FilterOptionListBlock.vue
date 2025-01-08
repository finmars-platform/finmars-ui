<template>
	<div class="fm-filter-option-list-block">
		<div class="fm-filter-option-list-block__header">
			<hr />
			<span>{{ locals.and }}</span>
			<hr />
		</div>

		<FmTextField
			v-model="searchText"
			:placeholder="locals.search"
			compact
			prepend-icon="mdi-magnify"
			hide-details
			class="fm-filter-option-list-block__search"
		/>

		<div
			:class="[
				'fm-filter-option-list-block__option',
				{ 'fm-filter-option-list-block__option--disabled': !multiple }
			]"
		>
			<FmCheckbox
				:model-value="selectedStatus === 'all'"
				:indeterminate="selectedStatus === 'indeterminate'"
				:label="locals.selectAll"
				:disabled="!multiple"
				@click.stop.prevent="onAllCheckClick"
			/>
		</div>

		<div :class="['fm-filter-option-list-block__body', 'scroll-variant-thin']">
			<div
				v-for="(option, index) in filteredOptions"
				:key="index"
				:class="[
					'fm-filter-option-list-block__option',
					{
						'fm-filter-option-list-block__option--selected': isOptionSelected(option)
					}
				]"
				@click.stop.prevent="onOptionClick(option)"
			>
				<FmCheckbox :model-value="isOptionSelected(option)" :label="option.title" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup generic="T extends FmSelectOption">
	import { computed, ref } from 'vue';
	import size from 'lodash/size';
	import FmCheckbox from '../../../Checkbox/Checkbox.vue';
	import FmTextField from '../../../TextField/TextField.vue';
	import type { FmSelectOption } from '@/components/fm/Select/types';
	import type { FmFilterOptionListBlockProps, FmFilterOptionListBlockEmits } from './types';
	import cloneDeep from 'lodash/cloneDeep';

	const props = withDefaults(defineProps<FmFilterOptionListBlockProps<T>>(), {
		locals: {
			// @ts-ignore
			and: 'AND',
			search: 'Search',
			selectAll: 'Select all'
		}
	});
	const emits = defineEmits<FmFilterOptionListBlockEmits<T>>();

	const searchText = ref('');

	const filteredOptions = computed(() =>
		(props.options || []).filter((o) =>
			o.title?.toLowerCase().includes(searchText.value.toLowerCase())
		)
	);

	const selectedStatus = computed(() => {
		if (size(props.options) === size(props.selected)) {
			return 'all';
		}

		if (!size(props.selected)) {
			return 'none';
		}

		return 'indeterminate';
	});

	function isOptionSelected(option: T): boolean {
		return props.selected.some((o) => o.value === option.value);
	}

	function onOptionClick(option: T) {
		if (props.multiple) {
			const updatedSelectedOptions = cloneDeep(props.selected);
			const optionIndex = updatedSelectedOptions.findIndex((o) => o.value === option.value);
			if (optionIndex === -1) {
				updatedSelectedOptions.push(option);
			} else {
				updatedSelectedOptions.splice(optionIndex, 1);
			}
			emits('update', updatedSelectedOptions);
			return;
		}

		emits('update', [option]);
	}

	function onAllCheckClick() {
		if (!props.multiple) {
			return;
		}

		emits('update', selectedStatus.value === 'all' ? [] : cloneDeep(props.options));
	}
</script>

<style lang="scss" scoped>
	.fm-filter-option-list-block {
		position: relative;
		width: 100%;

		&__header {
			position: relative;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			column-gap: 8px;
			font-size: 14px;
			font-weight: 500;
			line-height: 20px;
			color: var(--on-surface);

			hr {
				flex-grow: 1;
				border-bottom: 1px solid var(--outline);
			}
		}

		&__search {
			--backgroundColor-fmTextField: transparent;

			margin-bottom: 10px;
		}

		&__body {
			position: relative;
			max-height: 160px;
			overflow-y: auto;
		}

		&__option {
			display: flex;
			width: 100%;
			height: 40px;
			justify-content: flex-start;
			align-items: center;
			padding: 0 8px;

			:deep(.v-checkbox) {
				.v-checkbox-btn {
					column-gap: 8px;

					.v-label {
						color: var(--on-surface);
					}
				}
			}

			&--disabled {
				pointer-events: none;
			}

			&:hover {
				background-color: var(--surface-container-highest);
			}
		}
	}
</style>
