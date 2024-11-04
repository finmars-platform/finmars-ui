<template>
	<div
		:class="[
			'item-picker-item',
			{ 'selected': isSelected && !multiple, 'disabled': disabled },
		]"
		v-on="disabled ? {} : { click: () => emits('select', item.id) }"
	>
		<FmCheckbox
			v-if="multiple"
			:model-value="isSelected"
			:disabled="disabled"
		/>

		<span class="text">{{ item?.label }}</span>

		<FmTooltip
			v-if="item.tooltip"
			type="secondary"
			:disabled="disabled"
		>
			<template #activator="{ props }">
				<VIcon
					v-bind="props"
					icon="mdi-information-outline"
					size="20"
					:color="isSelected && !multiple ? 'var(--on-secondary)' : 'var(--color-item-fmItemPicker)'"
				/>
			</template>

			<span>{{ item.tooltip }}</span>
		</FmTooltip>
	</div>
</template>

<script setup>
	import { VIcon } from 'vuetify/components'
	import FmCheckbox from '@/components/fm/Checkbox/Checkbox.vue'
	import FmTooltip from '@/components/fm/Tooltip/Tooltip.vue'

	const props = defineProps({
		item: {
			type: Object,
			required: true,
		},
		multiple: {
			type: Boolean,
		},
		isSelected: {
			type: Boolean,
		},
		disabled: {
			type: Boolean,
		},
	})

	const emits = defineEmits(['select'])
</script>

<style lang="scss" scoped>
	.item-picker-item {
		--height-item-fmItemPicker: 40px;
		--color-item-fmItemPicker: var(--on-surface);

		position: relative;
		width: 100%;
		height: var(--height-item-fmItemPicker);
		display: flex;
		justify-content: flex-start;
		align-items: center;
		column-gap: var(--spacing-8);
		padding: 0 var(--spacing-8) 0 var(--spacing-12);
		font-size: 14px;
		font-weight: 400;
		line-height: 20px;
		color: var(--color-item-fmItemPicker);

		&:not(.disabled) {
			cursor: pointer;

			&:hover {
				color: var(--on-surface);
				background-color: color-mix(in srgb, var(--on-surface) 8%, transparent);

				i {
					color: var(--on-surface-variant) !important;
				}
			}
		}
	}

	.text {
		flex-grow: 1;
	}

	.disabled {
		color: color-mix(in srgb, var(--color-item-fmItemPicker) 38%, transparent);

		i.v-icon {
			color: color-mix(in srgb, var(--color-item-fmItemPicker) 38%, transparent) !important;
			caret-color: color-mix(in srgb, var(--color-item-fmItemPicker) 38%, transparent) !important;
		}
	}

	.selected {
		background-color: var(--secondary);
		color: var(--on-secondary);
	}
</style>
