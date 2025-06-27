<template>
	<div class="fm-datetime-filter">
		<div class="fm-datetime-filter__row">
			<div class="fm-datetime-filter__cell">
				<slot name="type-selector" />
			</div>

			<div class="fm-datetime-filter__cell">
				<FmInputDate
					v-if="simpleMode"
					:model-value="simpleModeFilterValue"
					include-time
					placeholder="Date and Time"
					persistent-placeholder
					compact
					@update:model-value="processAction('update', $event)"
				/>

				<template v-if="rangeMode">
					<FmInputDate
						:model-value="rangeModeFilterValueFrom"
						include-time
						placeholder="Date and Time from"
						persistent-placeholder
						compact
						@update:model-value="processAction('update:from', $event)"
					/>

					<FmInputDate
						:model-value="rangeModeFilterValueTo"
						include-time
						placeholder="Date and Time to"
						persistent-placeholder
						compact
						@update:model-value="processAction('update:to', $event)"
					/>
				</template>
			</div>
		</div>

		<div v-if="isFilterLinked" class="fm-datetime-filter__block">
			<slot name="linked" />
		</div>

		<div v-if="selectorMode" class="fm-datetime-filter__tree">
			<hr />

			<FmDateTree
				:data="options as string[]"
				:model-value="filterValue as string[]"
				include-time
				@update:model-value="processAction('update:tree', $event)"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { computed } from 'vue';
	import dayjs from 'dayjs';
	import isEmpty from 'lodash/isEmpty';
	import set from 'lodash/set';
	import cloneDeep from 'lodash/cloneDeep';
	import FmInputDate from '@/components/fm/InputDate/InputDate.vue';
	import FmDateTree from '@/components/fm/DateTree/DateTree.vue';
	import useFilter from '@/components/fm/Filters/FilterTypes/useFilter';
	import type { FmFilterProps, FmFilterEmits, FmFilterSlots } from '../../types';
	import { FmFilterRangeValues } from '@/types';

	const props = defineProps<FmFilterProps>();
	const emits = defineEmits<FmFilterEmits>();
	defineSlots<FmFilterSlots>();

	const { simpleMode, rangeMode, selectorMode } = useFilter(props);

	const simpleModeFilterValue = computed(() => {
		if (!simpleMode.value || isEmpty(props.filter.options?.filter_values)) {
			return '';
		}
		return dayjs((props.filter.options?.filter_values as string[])[0]).format('YYYY-MM-DD[T]HH:mm');
	});

	const rangeModeFilterValueFrom = computed(() => {
		if (
			!rangeMode.value ||
			isEmpty((props.filter.options?.filter_values as FmFilterRangeValues).min_value)
		) {
			return '';
		}
		return dayjs((props.filter.options?.filter_values as FmFilterRangeValues).min_value).format(
			'YYYY-MM-DD[T]HH:mm'
		);
	});
	const rangeModeFilterValueTo = computed(() => {
		if (
			!rangeMode.value ||
			isEmpty((props.filter.options?.filter_values as FmFilterRangeValues).max_value)
		) {
			return '';
		}
		return dayjs((props.filter.options?.filter_values as FmFilterRangeValues).max_value).format(
			'YYYY-MM-DD[T]HH:mm'
		);
	});

	function processAction(
		action: 'update' | 'update:from' | 'update:to' | 'update:tree',
		value?:
			| string
			| string[]
			| {
					min_value: number;
					max_value: number;
			  }
	) {
		const updatedFilter = cloneDeep(props.filter);

		if (action === 'update') {
			updatedFilter.options.filter_values = [value as string];
		}

		if (action === 'update:from') {
			set(updatedFilter, ['options', 'filter_values', 'min_value'], value);
		}

		if (action === 'update:to') {
			set(updatedFilter, ['options', 'filter_values', 'max_value'], value);
		}

		if (action === 'update:tree') {
			updatedFilter.options.filter_values = value as string[];
		}

		if (
			JSON.stringify(props.filter?.options?.filter_values) !==
			JSON.stringify(updatedFilter.options?.filter_values)
		) {
			emits('update', updatedFilter);
		}
	}
</script>

<style lang="scss" scoped>
	.fm-datetime-filter {
		position: relative;
		width: 100%;
		padding: 4px 24px 0 24px;

		&__row {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			column-gap: 16px;
			margin-bottom: 16px;
		}

		&__cell {
			position: relative;
			width: calc(50% - 8px);
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: stretch;
			row-gap: 16px;
		}

		&__info {
			display: flex;
			width: 100%;
			justify-content: center;
			align-items: center;
			font-size: 14px;
			font-weight: 500;
			line-height: 20px;
			color: var(--on-surface);
		}

		&__block {
			position: relative;
		}

		&__tree {
			position: relative;
			width: 100%;
			height: 270px;

			hr {
				width: 100%;
				border-bottom: 1px solid var(--outline);
			}
		}
	}
</style>
