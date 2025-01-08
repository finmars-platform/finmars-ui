import { computed, type ComputedRef } from 'vue';
import isEmpty from 'lodash/isEmpty';
import type { FmFilterProps } from '@/components/fm/Filters/types';

export default function useFilter(props: FmFilterProps) {
	const simpleMode = computed(
		() =>
			['contains', 'equal', 'not_equal', 'greater', 'greater_equal', 'less', 'less_equal'].includes(
				props.filter?.options?.filter_type
			) && !props.isFilterLinked
	);
	const selectorMode = computed(
		() =>
			['selector', 'multiselector', 'date_tree'].includes(props.filter?.options?.filter_type) &&
			!props.isFilterLinked
	);
	const rangeMode = computed(
		() =>
			['from_to', 'out_of_range'].includes(props.filter?.options?.filter_type) &&
			!props.isFilterLinked
	);
	const emptyMode = computed(
		() => props.filter?.options?.filter_type === 'empty' && !props.isFilterLinked
	);

	const displayValueIfSelect = computed(() => {
		if (!selectorMode.value || isEmpty(props.filterValue)) {
			return {
				value: '',
				tooltip: ''
			};
		}

		if (!Array.isArray(props.filterValue)) {
			return {
				value: props.filterValue || '',
				tooltip: props.filterValue || ''
			};
		}

		return props.filterValue.length === 1
			? {
					value: props.filterValue[0] || '',
					tooltip: props.filterValue[0] || ''
				}
			: {
					value: `${props.filterValue[0]} (+${props.filterValue.length - 1})`,
					tooltip: props.filterValue.join(',')
				};
	}) as ComputedRef<{ value: string; tooltip: string }>;

	return {
		simpleMode,
		selectorMode,
		rangeMode,
		emptyMode,
		displayValueIfSelect
	};
}
