<template>
	<div class="fm-numeric-filter">
		<div class="fm-numeric-filter__row">
			<div class="fm-numeric-filter__cell">
				<slot name="type-selector" />
			</div>

			<div class="fm-numeric-filter__cell">
				<FmTextField
					v-if="simpleMode"
					v-model="innerValue"
					type="text"
					outlined
					compact
					hide-details
					clearable
					@update:model-value="processAction('update', $event)"
				/>

				<template v-if="rangeMode">
					<FmTextField
						v-model="(innerValue as FmFilterRangeValues).min_value"
						class="fm-numeric-filter--margin"
						type="text"
						placeholder="From (incl)"
						outlined
						compact
						hide-details
						clearable
						@update:model-value="processAction('update:from', $event)"
					/>

					<FmTextField
						v-model="(innerValue as FmFilterRangeValues).max_value"
						type="text"
						placeholder="To (incl)"
						outlined
						compact
						hide-details
						clearable
						@update:model-value="processAction('update:to', $event)"
					/>
				</template>
			</div>
		</div>

		<div v-if="isFilterLinked" class="fm-numeric-filter__block">
			<slot name="linked" />
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { computed, nextTick, ref, watch } from 'vue'
	import cloneDeep from 'lodash/cloneDeep'
	import set from 'lodash/set'
	import { formatEnteredNumber } from '../../utils'
	import type { FmFilterRangeValues } from '@/types'
	import type { FmFilterProps, FmFilterEmits, FmFilterSlots } from '../../types'
	import useFilter from '@/components/fm/Filters/FilterTypes/useFilter'
	import FmTextField from '@/components/fm/TextField/TextField.vue'

	const props = defineProps<FmFilterProps>()
	const emits = defineEmits<FmFilterEmits>()
	defineSlots<FmFilterSlots>()

	const { simpleMode, rangeMode } = useFilter(props)

	const innerValue = ref(cloneDeep(props.filterValue))

	const currentFilterValue = computed(() => props.filter.options.filter_values)

	function processAction(
		action: 'update' | 'update:from' | 'update:to',
		value: string
	) {
		const updatedFilter = cloneDeep(props.filter)
		if (action === 'update') {
			const formattedValue = formatEnteredNumber(value)
			updatedFilter.options.filter_values = formattedValue
				? [Number(formattedValue)]
				: []
			nextTick(() => {
				innerValue.value = formattedValue
			})
		}

		if (action === 'update:from') {
			const formattedValue = formatEnteredNumber(value)
			set(
				updatedFilter,
				['options', 'filter_values', 'min_value'],
				formattedValue ? Number(formattedValue) : null
			)
			nextTick(() => {
				;(innerValue.value as FmFilterRangeValues).min_value = formattedValue
			})
		}

		if (action === 'update:to') {
			const formattedValue = formatEnteredNumber(value)
			set(
				updatedFilter,
				['options', 'filter_values', 'max_value'],
				formattedValue ? Number(formattedValue) : null
			)
			nextTick(() => {
				;(innerValue.value as FmFilterRangeValues).max_value = formattedValue
			})
		}

		if (
			JSON.stringify(currentFilterValue.value) !==
			JSON.stringify(updatedFilter.options.filter_values)
		) {
			emits('update', updatedFilter)
		}
	}

	watch(
		() => props.filterValue,
		() => {
			innerValue.value = cloneDeep(props.filterValue)
		},
		{ immediate: true }
	)
</script>

<style lang="scss" scoped>
	.fm-numeric-filter {
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

		&--margin {
			margin-bottom: 16px;
		}
	}
</style>
