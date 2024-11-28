<template>
	<FilterToolbar
		class="mb-4"
		:value="value"
		:attributes="attributes"
		:suggested-attrs="suggestedAttrs"
		:get-filter-options="getFilterMockOptions"
		:get-source-linked-groups="getSourceLinkedMockGroups"
		:get-source-linked-group-attributes="getSourceLinkedMockGroupAttributes"
		@update:model-value="value = $event"
		@update:suggested="updateSuggested"
	/>

	<div class="mb-4">
		<h4 class="text-[16px] font-bold mb-2">FILTERS:</h4>
		<div class="relative p-4 rounded-[8px] h-[300px] w-[720px] bg-[#222]">
			<div
				class="relative whitespace-pre-wrap font-sans text-[15px] h-full w-full text-[#fff] overflow-y-auto scroll-variant-thin"
			>
				{{ JSON.stringify(value, null, 4) }}
			</div>
		</div>
	</div>

	<div class="mb-4">
		<h4 class="text-[16px] font-bold mb-2">SUGGESTED:</h4>
		<div class="relative p-4 rounded-[8px] h-[300px] w-[720px] bg-[#222]">
			<div
				class="relative whitespace-pre-wrap font-sans text-[15px] h-full w-full text-[#fff] overflow-y-auto scroll-variant-thin"
			>
				{{ JSON.stringify(suggestedAttrs, null, 4) }}
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import cloneDeep from 'lodash/cloneDeep'
	import {
		getFilterMockOptions,
		mockData,
		presetFilters,
		getSourceLinkedMockGroups,
		getSourceLinkedMockGroupAttributes
	} from '../_Data/filters-mock-data'
	import FilterToolbar from '@/components/fm/Filters/FilterToolbar/FilterToolbar.vue'

	const attributes = ref(cloneDeep(mockData.attributes))
	const suggestedAttrs = ref(cloneDeep(mockData.favoriteAttributes))
	const value = ref(cloneDeep(presetFilters))

	function updateSuggested(attr) {
		const attrIndex = suggestedAttrs.value.findIndex((a) => a === attr)
		if (attrIndex === -1) {
			suggestedAttrs.value.push(attr)
		} else {
			suggestedAttrs.value.splice(attrIndex, 1)
		}
	}
</script>
