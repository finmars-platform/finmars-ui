<template>
	<!-- @vue-ignore -->
	<FmSelect
		:model-value="filter?.options.filter_type"
		:options="availableFilterTypes"
		variant="outlined"
		compact
		any-update-emits
		title-key="name"
		value-key="id"
		@update:model-value="onUpdate"
	>
		<template #selection="{ value }">
			<span>{{
				isFilterLinked ? 'Linked to' : (value as unknown[] as AvailableType[])[0].name
			}}</span>
		</template>
	</FmSelect>
</template>

<script lang="ts" setup>
	import { computed } from 'vue';
	import { FILTER_CONDITIONS } from '../../constants';
	import FmSelect from '../../../Select/Select.vue';
	import type { FmFilterTypeSelectorBlockProps, FmFilterTypeSelectorBlockEmits } from './types';
	import { FmFilterType } from '@/types';

	const props = defineProps<FmFilterTypeSelectorBlockProps>();
	const emits = defineEmits<FmFilterTypeSelectorBlockEmits>();

	type AvailableType = { id: FmFilterType; name: string };

	const availableFilterTypes = computed(() => {
		const { value_type } = props.filter;
		return FILTER_CONDITIONS.reduce((res, c) => {
			const { id, name, availableInFilters = [] } = c;
			if (availableInFilters.includes(value_type)) {
				res.push({ id, name });
			}
			return res;
		}, [] as AvailableType[]);
	});

	function onUpdate(id: FmFilterType) {
		emits('update', id);
	}
</script>
