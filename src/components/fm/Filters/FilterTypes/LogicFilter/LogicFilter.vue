<template>
	<div class="fm-logic-filter">
		<div class="fm-logic-filter__row">
			<div class="fm-logic-filter__cell">
				<slot name="type-selector" />
			</div>

			<div class="fm-logic-filter__cell">
				<FmSelect
					:model-value="innerValue"
					:options="SELECTORS_BOOLEAN_OPTIONS"
					variant="outlined"
					compact
					:multiple="isFilterTypeMultiselector"
					:chip="isFilterTypeMultiselector"
					@update:model-value="updateValue"
				/>
			</div>
		</div>

		<div v-if="isFilterLinked" class="fm-logic-filter__block">
			<slot name="linked" />
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { computed } from 'vue'
	import get from 'lodash/get'
	import cloneDeep from 'lodash/cloneDeep'
	import FmSelect from '@/components/fm/Select/Select.vue'
	import { SELECTORS_BOOLEAN_OPTIONS } from '../../constants'
	import type { FmFilterProps, FmFilterEmits, FmFilterSlots } from '../../types'

	const props = defineProps<FmFilterProps>()
	const emits = defineEmits<FmFilterEmits>()
	defineSlots<FmFilterSlots>()

	const isFilterTypeMultiselector = computed(() => props.filter?.options?.filter_type === 'multiselector')

	const innerValue = computed(() => {
		if (isFilterTypeMultiselector) {
			return get(props.filter, ['options', 'filter_values'], [])
		}

		return get(props.filter, ['options', 'filter_values', 0])
	})

	function updateValue(value: boolean | boolean[]) {
		const updatedFilter = cloneDeep(props.filter)
		updatedFilter.options.filter_values = isFilterTypeMultiselector ? (value as boolean[]) : [value as boolean]
		emits('update', updatedFilter)
	}
</script>

<style lang="scss" scoped>
	.fm-logic-filter {
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
	}
</style>
