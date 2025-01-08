<template>
	<div class="fm-filter-editor">
		<div class="fm-filter-editor__header" v-html="name" />

		<div class="fm-filter-editor__content">
			<component
				v-if="currentComponent"
				:is="currentComponent"
				:filter="filterData"
				:filter-value="filterValue"
				:options="options"
				:is-filter-linked="isFilterLinked"
				@update="filterUpdate"
			>
				<template #type-selector>
					<FmFilterTypeSelectorBlock
						:filter="filterData!"
						:is-filter-linked="isFilterLinked"
						@update="updateFilterType"
					/>
				</template>

				<template #linked>
					<FmFilterLinkedBlock
						:filter="filterData!"
						:get-source-linked-groups="getSourceLinkedGroups"
						:get-source-linked-group-attributes="getSourceLinkedGroupAttributes"
						:locals="locals"
						@update="filterUpdate"
					/>
				</template>

				<template #option-list>
					<FmFilterOptionListBlock
						v-if="!isEmpty(options) && !isFilterLinked"
						:options="options"
						:selected="selectedOptionList"
						:multiple="filterData!.options?.filter_type === 'multiselector'"
						@update="onSelectedOptionListUpdate"
					/>
				</template>
			</component>
		</div>

		<div class="fm-filter-editor__control">
			<div v-if="isLoading" class="fm-filter-editor__loader">
				<FmProgressLinear indeterminate />
			</div>

			<FmCheckbox
				:model-value="filterData?.options.enabled"
				label="Enable filter"
				@update:model-value="updateEnabledFlag"
			/>

			<div class="fm-filter-editor__btns">
				<FmButton type="secondary" rounded @click.stop.prevent="emits('cancel')"> Cancel </FmButton>

				<FmButton rounded :disabled="!isDirty" @click.stop.prevent="apply"> Apply </FmButton>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { computed, ref, toValue, watch } from 'vue';
	import cloneDeep from 'lodash/cloneDeep';
	import hasIn from 'lodash/hasIn';
	import isEmpty from 'lodash/isEmpty';
	import FmButton from '../../Button/Button.vue';
	import FmCheckbox from '../../Checkbox/Checkbox.vue';
	import FmProgressLinear from '../../ProgressLinear/ProgressLinear.vue';
	import FmFilterTypeSelectorBlock from '../Blocks/FilterTypeSelectorBlock/FilterTypeSelectorBlock.vue';
	import FmFilterLinkedBlock from '../Blocks/FilterLinkedBlock/FilterLinkedBlock.vue';
	import FmFilterOptionListBlock from '../Blocks/FilterOptionListBlock/FilterOptionListBlock.vue';
	import { SELECTORS_BOOLEAN_OPTIONS } from '../constants';
	import type { FmFilter, FmFilterType } from '@/types';
	import type { FmFilterEditorProps, FmFilterEditorEmits } from './types';
	import type { FmSelectOption } from '@/components/fm/Select/types';

	import FmTextFilter from '../FilterTypes/TextFilter/TextFilter.vue';
	import FmNumericFilter from '../FilterTypes/NumericFilter/NumericFilter.vue';
	import FmClassifierFilter from '../FilterTypes/ClassifierFilter/ClassifierFilter.vue';
	import FmDateFilter from '../FilterTypes/DateFilter/DateFilter.vue';
	import FmLogicFilter from '../FilterTypes/LogicFilter/LogicFilter.vue';
	import FmDatetimeFilter from '../FilterTypes/DatetimeFilter/DatetimeFilter.vue';

	const props = withDefaults(defineProps<FmFilterEditorProps>(), {
		locals: {
			// @ts-ignore
			linkedGroupPlaceholder: 'Select report',
			linkedFieldPlaceholder: 'Select field',
			linkedCondition: 'Link condition',
			linkedFilterTypePlaceholder: 'Select filter type'
		}
	});
	const emits = defineEmits<FmFilterEditorEmits>();

	const filterValueTypeToComponent: Record<number | 'field', any> = {
		10: FmTextFilter,
		20: FmNumericFilter,
		30: FmClassifierFilter,
		40: FmDateFilter,
		50: FmLogicFilter,
		80: FmDatetimeFilter,
		field: null
	};

	const filterData = ref<FmFilter | undefined>(cloneDeep(props.value));
	const options = ref<FmSelectOption[]>([]);
	const selectedOptionList = ref<FmSelectOption[]>([]);

	const isDirty = ref(false);
	const isLoading = ref(false);

	const name = computed(() => {
		if (!filterData.value) {
			return '';
		}

		const processedName = filterData.value.name.split('. ');
		let result = processedName[0];
		for (const part of processedName.slice(1)) {
			result += `&nbsp;&rarr;&nbsp;${part}`;
		}
		return result;
	});

	const currentComponent = computed(() => {
		if (!filterData.value) {
			return null;
		}

		return filterValueTypeToComponent[filterData.value!.value_type];
	});

	const isFilterLinked = computed(() => hasIn(filterData.value, ['options', 'use_from_above']));

	const filterValue = computed(() => {
		if (!filterData.value) {
			return '';
		}

		const { filter_type, filter_values } = filterData.value?.options;
		if (['selector', 'multiselector', 'date_tree'].includes(filter_type)) {
			return toValue(filter_values) as unknown[];
		}

		if (['from_to', 'out_of_range'].includes(filter_type)) {
			return toValue(filter_values) as {
				max_value: number | string;
				min_value: number | string;
			};
		}

		return (toValue(filter_values) as unknown[])[0] || '';
	});

	function updateFilterType(type: FmFilterType) {
		if (type === 'use_from_above') {
			filterData.value!.options.use_from_above = {
				attrs_entity_type: '',
				key: ''
			};
			filterData.value!.options.filter_type = 'equal';
		} else {
			filterData.value!.options.filter_type = type;
			delete filterData.value!.options.use_from_above;
		}

		isDirty.value = true;
		filterData.value!.options.filter_values = ['from_to', 'out_of_range'].includes(type)
			? { min_value: '', max_value: '' }
			: [];

		initSelectedOptionList();
	}

	function updateEnabledFlag(val: boolean) {
		isDirty.value = true;
		filterData.value!.options.enabled = val;
	}

	function filterUpdate(updatedFilter: FmFilter) {
		isDirty.value = true;
		filterData.value = updatedFilter;
		initSelectedOptionList();
	}

	function apply() {
		if (!isDirty.value) {
			return;
		}
		emits('update:modelValue', filterData.value!);
		emits('cancel');
	}

	async function getOptions() {
		if (filterData.value?.value_type === 50) {
			options.value = cloneDeep(SELECTORS_BOOLEAN_OPTIONS);
			return;
		}

		if (!props.getFilterOptions || typeof props.getFilterOptions !== 'function') {
			return;
		}

		try {
			isLoading.value = true;
			options.value = await props.getFilterOptions(filterData.value!);
		} finally {
			isLoading.value = false;
		}
	}

	function initSelectedOptionList() {
		if (Array.isArray(filterValue.value)) {
			const filteredOptions = (options.value || []).filter((o) =>
				((filterValue.value as Array<string | number | boolean>) || []).includes(o.value!)
			);
			selectedOptionList.value = cloneDeep(filteredOptions);
		} else {
			const option = (options.value || []).find((o) => o.value! === filterValue.value);
			option ? (selectedOptionList.value = [option]) : (selectedOptionList.value = []);
		}
	}

	function onSelectedOptionListUpdate(value: FmSelectOption[]) {
		selectedOptionList.value = value;
		filterData.value!.options.filter_values = value.map((o) => o.value) as string[];
		isDirty.value = true;
	}

	getOptions();

	watch(
		() => props.value,
		() => {
			filterData.value = cloneDeep(props.value);
			[10, 50].includes(props.value?.value_type as number) && initSelectedOptionList();
		},
		{ immediate: true }
	);

	watch(
		() => options.value,
		() => {
			[10, 50].includes(props.value?.value_type as number) && initSelectedOptionList();
		}
	);
</script>

<style lang="scss" scoped>
	.fm-filter-editor {
		--fmFilterEditor-background-color: var(--surface-container-high);
		--fmFilterEditor-color: var(--on-surface);
		--fmFilterEditor-border-radius: 28px;

		position: relative;
		width: 100%;
		min-height: 200px;
		max-height: 560px;
		background-color: var(--fmFilterEditor-background-color);
		padding: 24px 0;
		color: var(--fmFilterEditor-color);

		&__header {
			padding: 0 24px;
			margin-bottom: 16px;
			font-size: 16px;
			font-weight: 500;
			line-height: 24px;
		}

		&__control {
			position: relative;
			display: flex;
			width: 100%;
			height: 60px;
			padding: 24px 24px 0 24px;
			justify-content: space-between;
			align-items: center;
			border-top: 1px solid var(--outline-variant);
		}

		&__btns {
			display: flex;
			justify-content: center;
			align-items: center;
			column-gap: 16px;

			button {
				text-transform: none;
			}
		}

		&__loader {
			position: absolute;
			left: 0;
			top: -2px;
			width: 100%;
		}
	}
</style>
