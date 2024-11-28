<template>
	<div class="fm-date-filter">
		<div class="fm-date-filter__row">
			<div class="fm-date-filter__cell">
				<slot name="type-selector" />
			</div>

			<div class="fm-date-filter__cell">
				<FmInputDate
					v-if="simpleMode"
					:model-value="(filter?.options?.filter_values as string[])[0]"
					placeholder="Date"
					persistent-placeholder
					compact
					@update:model-value="processAction('update', $event)"
				/>

				<template v-if="rangeMode">
					<FmInputDate
						:model-value="(filter?.options?.filter_values as FmFilterRangeValues).min_value as string"
						placeholder="Date from"
						persistent-placeholder
						compact
						@update:model-value="processAction('update:from', $event)"
					/>

					<FmInputDate
						:model-value="(filter?.options?.filter_values as FmFilterRangeValues).max_value as string"
						placeholder="Date to"
						persistent-placeholder
						compact
						@update:model-value="processAction('update:to', $event)"
					/>
				</template>
			</div>
		</div>

		<div v-if="isFilterLinked" class="fm-date-filter__block">
			<slot name="linked" />
		</div>
	</div>
</template>

<script lang="ts" setup>
	import cloneDeep from 'lodash/cloneDeep'
	import set from 'lodash/set'
	import FmInputDate from '@/components/fm/InputDate/InputDate.vue'
	import useFilter from '../useFilter'
	import type { FmFilterProps, FmFilterEmits, FmFilterSlots } from '../../types'
	import { FmFilterRangeValues } from '@/types'

	const props = defineProps<FmFilterProps>()
	const emits = defineEmits<FmFilterEmits>()
	defineSlots<FmFilterSlots>()

	const { simpleMode, rangeMode } = useFilter(props)

	function processAction(action: 'update' | 'update:from' | 'update:to' , value?: string | {
		min_value: number;
		max_value: number
	}) {
		const updatedFilter = cloneDeep(props.filter)

		if (action === 'update') {
			updatedFilter.options.filter_values = [value as string]
		}

		if (action === 'update:from') {
			set(updatedFilter, ['options', 'filter_values', 'min_value'], value)
		}

		if (action === 'update:to') {
			set(updatedFilter, ['options', 'filter_values', 'max_value'], value)
		}

		if (JSON.stringify(props.filter?.options?.filter_values) !== JSON.stringify(updatedFilter.options?.filter_values)) {
			emits('update', updatedFilter)
		}
	}
</script>

<style lang="scss" scoped>
	.fm-date-filter {
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
	}
</style>
