<template>
	<div class="fm-filter-linked-block">
		<div v-if="isLoading" class="fm-filter-linked-block__loader">
			<FmProgressLinear indeterminate />
		</div>

		<div class="fm-filter-linked-block__group">
			<!-- @vue-ignore -->
			<FmSelect
				:model-value="attrsEntityType"
				:options="groups"
				:placeholder="locals?.linkedGroupPlaceholder"
				persistent-placeholder
				variant="outlined"
				compact
				:disabled="isLoading"
				@update:model-value="updateAttrsEntityType"
			/>
		</div>

		<FmMenu v-model="isMenuOpen" :disabled="isLoading">
			<template #activator="{ props }">
				<div
					v-bind="props"
					:class="[
						'fm-filter-linked-block__key',
						{
							'fm-filter-linked-block__key-placeholder': !attrKey,
							'fm-filter-linked-block__key-disabled': isLoading
						}
					]"
				>
					{{ displayAttrKey }}
				</div>
			</template>

			<FmItemPicker
				:model-value="[attrKey]"
				:attributes="attributes"
				@close="isMenuOpen = false"
				@update:model-value="selectAttr"
			/>
		</FmMenu>

		<div class="fm-filter-linked-block__row">
			<div class="fm-filter-linked-block__cell">
				{{ locals?.linkedCondition }}
			</div>

			<div class="fm-filter-linked-block__cell">
				<!-- @vue-ignore -->
				<FmSelect
					:model-value="filterType"
					:options="availableTypesByCurrentType"
					title-key="name"
					value-key="id"
					:placeholder="locals?.linkedFilterTypePlaceholder"
					persistent-placeholder
					variant="outlined"
					compact
					:disabled="isLoading"
					@update:model-value="updateFilterType"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { computed, type ComputedRef, ref, watch } from 'vue';
	import get from 'lodash/get';
	import set from 'lodash/set';
	import cloneDeep from 'lodash/cloneDeep';
	import FmSelect from '@/components/fm/Select/Select.vue';
	import FmProgressLinear from '@/components/fm/ProgressLinear/ProgressLinear.vue';
	import FmMenu from '@/components/fm/Menu/Menu.vue';
	import FmItemPicker from '@/components/fm/ItemPicker/ItemPicker/ItemPicker.vue';
	import type { FmFilterLinkedBlockProps, FmFilterLinkedBlockEmits } from './types';
	import type { FmAttribute, FmFilter, FmFilterType } from '@/types';

	const props = defineProps<FmFilterLinkedBlockProps>();
	const emits = defineEmits<FmFilterLinkedBlockEmits>();

	type LinkedGroup = { title: string; value: string };

	const AVAILABLE_FILTER_TYPES: {
		name: string;
		id: FmFilterType;
		relatedValueTypes: (number | 'field')[];
	}[] = [
		{ name: 'Contains', id: 'contains', relatedValueTypes: [10, 30] },
		{ name: 'Equal', id: 'equal', relatedValueTypes: [10, 20, 30, 40, 50, 80] },
		{ name: 'Greater than', id: 'greater', relatedValueTypes: [20, 40, 80] },
		{
			name: 'Greater or equal to',
			id: 'greater_equal',
			relatedValueTypes: [20, 40, 80]
		},
		{ name: 'Less than', id: 'less', relatedValueTypes: [20, 40, 80] },
		{
			name: 'Less or equal to',
			id: 'less_equal',
			relatedValueTypes: [20, 40, 80]
		}
	];

	const filterData = ref<FmFilter>();
	const isLoading = ref(false);
	const isMenuOpen = ref(false);
	const groups = ref<LinkedGroup[]>([]);
	const attributes = ref<FmAttribute[]>([]);

	const attrsEntityType = computed(() =>
		get(filterData.value, ['options', 'use_from_above', 'attrs_entity_type'], '')
	);
	const attrKey = computed(() => get(filterData.value, ['options', 'use_from_above', 'key'], ''));
	const displayAttrKey = computed(() => attrKey.value || props.locals!.linkedFieldPlaceholder);

	const filterType = computed(() =>
		get(filterData.value, ['options', 'filter_type'], '')
	) as ComputedRef<FmFilterType>;

	const availableTypesByCurrentType = computed(() =>
		AVAILABLE_FILTER_TYPES.reduce(
			(res, item) => {
				const { name, id, relatedValueTypes } = item;
				if (relatedValueTypes.includes(filterData.value?.value_type!)) {
					res.push({ name, id });
				}
				return res;
			},
			[] as { name: string; id: FmFilterType }[]
		)
	);

	async function getGroups() {
		try {
			isLoading.value = true;
			if (props.getSourceLinkedGroups && typeof props.getSourceLinkedGroups === 'function') {
				groups.value = await props.getSourceLinkedGroups(filterData.value!);
			}
		} finally {
			isLoading.value = false;
		}
	}

	async function getGroupAttributes() {
		try {
			isLoading.value = true;
			if (
				props.getSourceLinkedGroupAttributes &&
				typeof props.getSourceLinkedGroupAttributes === 'function'
			) {
				attributes.value = await props.getSourceLinkedGroupAttributes(filterData.value!);
			}
		} finally {
			isLoading.value = false;
		}
	}

	async function updateAttrsEntityType(value: string) {
		set(filterData.value!, ['options', 'use_from_above', 'attrs_entity_type'], value);
		emits('update', filterData.value!);
		await getGroupAttributes();
		isMenuOpen.value = true;
	}

	function selectAttr(attrs: string[]) {
		set(filterData.value!, ['options', 'use_from_above', 'key'], attrs[0]);
		emits('update', filterData.value!);
	}

	function updateFilterType(type: FmFilterType) {
		set(filterData.value!, ['options', 'filter_type'], type);
		emits('update', filterData.value!);
	}

	watch(
		() => props.filter,
		() => {
			filterData.value = cloneDeep(props.filter);
		},
		{ immediate: true }
	);

	getGroups();
</script>

<style lang="scss" scoped>
	.fm-filter-linked-block {
		position: relative;
		width: 100%;

		&__group {
			position: absolute;
			top: -56px;
			right: 0;
			width: calc(50% - 8px);
			height: 40px;
			border-radius: 4px;
			background-color: #fff;
		}

		&__key {
			position: relative;
			width: 100%;
			height: 40px;
			border-radius: 4px;
			background-color: var(--surface);
			border: 1px solid color-mix(in srgb, var(--on-surface-variant) 38%, transparent);
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 0 16px;
			font-size: 16px;
			font-weight: 500;
			color: var(--on-surface);
			margin-bottom: 16px;

			&-placeholder {
				color: color-mix(in srgb, var(--on-surface) 50%, transparent);
			}

			&-disabled {
				opacity: 0.7;
			}

			&:not(.fm-filter-linked-block__key-disabled) {
				cursor: pointer;
			}
		}

		&__row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			column-gap: 16px;
			margin-bottom: 16px;
		}

		&__cell {
			position: relative;
			width: calc(50% - 8px);
			display: flex;
			justify-content: flex-start;
			align-items: center;
			font-size: 16px;
			font-weight: 500;
			color: var(--on-surface);
		}

		&__loader {
			position: absolute;
			left: -24px;
			top: -124px;
			width: calc(100% + 48px);
		}
	}
</style>
