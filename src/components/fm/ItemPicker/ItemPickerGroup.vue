<template>
	<div class="item-picker-group-wrapper">
		<div
			class="item-picker-group"
			@click="isOpen = !isOpen"
		>
			<VIcon
				:icon="isOpen ? 'mdi-menu-down' : 'mdi-menu-right'"
				size="20"
				color="var(--color-item-fmItemPicker)"
			/>

			<span class="text">{{ group.label }}</span>
		</div>

		<transition>
			<div
				v-if="isOpen"
				class="body"
			>
				<template
					v-for="item in group.children"
					:key="item.id"
				>
					<FmItemPickerItem
						v-if="!item.children"
						:item="item"
						:multiple="multiple"
						:is-selected="selectedItemsIds.includes(item.id)"
						:disabled="mode === 'add' && initialSelectedItemsIds.includes(item.id)"
						@select="emits('select', $event)"
					/>

					<FmItemPickerGroup
						v-else
						:group="item"
						:multiple="multiple"
						:mode="mode"
						:initial-selected-items-ids="initialSelectedItemsIds"
						:selected-items-ids="selectedItemsIds"
						@select="emits('select', item.id)"
					/>
				</template>
			</div>
		</transition>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { VIcon } from 'vuetify/components'
	import FmItemPickerGroup from './ItemPickerGroup.vue'
	import FmItemPickerItem from './ItemPickerItem.vue'

	const props = defineProps({
		group: {
			type: Object,
			required: true,
		},
		multiple: {
			type: Boolean,
		},
		mode: {
			type: String,
			default: 'add',
			validator(value) {
				return ['add', 'update'].includes(value)
			},
		},
		initialSelectedItemsIds: {
			type: Array,
			default: () => [],
		},
		selectedItemsIds: {
			type: Array,
			default: () => [],
		},
	})

	const emits = defineEmits(['select'])

	const isOpen = ref(false)
</script>

<style lang="scss" scoped>
	.item-picker-group-wrapper {
		position: relative;
		width: 100%;
	}

	.item-picker-group {
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
		cursor: pointer;

		&:hover {
			background-color: color-mix(in srgb, var(--on-surface) 8%, transparent);
		}
	}

	.text {
		flex-grow: 1;
	}

	.body {
		position: relative;
		width: 100%;
		padding-left: 28px;
	}
</style>
