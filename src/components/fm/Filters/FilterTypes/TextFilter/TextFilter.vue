<template>
	<div class="fm-text-filter">
		<div class="fm-text-filter__row">
			<div class="fm-text-filter__cell">
				<slot name="type-selector" />
			</div>

			<div class="fm-text-filter__cell">
				<template v-if="simpleMode">
					<FmTextField
						:model-value="filterValue"
						outlined
						compact
						hide-details
						clearable
						@click:clear="processAction('delete')"
						@update:model-value="processAction('update', $event)"
					/>
				</template>

				<template v-if="selectorMode">
					<FmSelect
						:model-value="filterValue"
						:options="options"
						variant="outlined"
						compact
						:multiple="filter?.options?.filter_type === 'multiselector'"
						@update:model-value="processAction('update', $event)"
					>
						<template #selection>
							<FmChip
								compact
								:value="displayValueIfSelect.value"
								:tooltip="displayValueIfSelect.tooltip"
								rounded
								closable
								@click:close="processAction('delete')"
							/>
						</template>
					</FmSelect>
				</template>
			</div>
		</div>

		<div v-if="isFilterLinked" class="fm-text-filter__block">
			<slot name="linked" />
		</div>

		<div v-if="!emptyMode" class="fm-text-filter__block">
			<slot name="option-list" />
		</div>
	</div>
</template>

<script lang="ts" setup>
	import cloneDeep from 'lodash/cloneDeep'
	import FmChip from '@/components/fm/Chip/Chip.vue'
	import FmSelect from '@/components/fm/Select/Select.vue'
	import FmTextField from '@/components/fm/TextField/TextField.vue'
	import useFilter from '../useFilter'
	import type { FmFilterProps, FmFilterEmits, FmFilterSlots } from '@/components/fm/Filters/types'
	import type { FmSelectOption } from '@/components/fm/Select/types'

	const props = withDefaults(defineProps<FmFilterProps>(), {
		options: () => [] as FmSelectOption[]
	})
	const emits = defineEmits<FmFilterEmits>()
	defineSlots<FmFilterSlots>()

	const { simpleMode, selectorMode, emptyMode, displayValueIfSelect } = useFilter(props)

	function processAction(action: 'update' | 'delete', value?: any ) {
		const updatedFilter = cloneDeep(props.filter)

		if (action === 'delete') {
			updatedFilter.options.filter_values = []
		} else {
			updatedFilter.options.filter_values = Array.isArray(value) ? (value as string[]) : [value as string]
		}

		emits('update', updatedFilter)
	}
</script>

<style lang="scss" scoped>
	.fm-text-filter {
		position: relative;
		width: 100%;
		padding: 4px 24px 0 24px;

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
