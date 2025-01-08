<template>
	<div :class="['fm-item-picker-content', 'scroll-variant-thin']">
		<template v-for="item in sortedAttributes" :key="item.key">
			<FmItemPickerGroup
				v-if="isItemGroup(item)"
				:level="0"
				:items="item as FmAttributeGroup"
				:mode="mode"
				:multiple="multiple"
				:selected="selected"
				:suggested="suggested"
				:initial-selected="initialSelected"
				@update:model-value="emits('update:modelValue', $event)"
				@update:suggested="emits('update:suggested', $event)"
			/>

			<FmItemPickerItem
				v-else
				:item="item as FmAttribute"
				:multiple="multiple"
				:selected="selected"
				:suggested="suggested"
				:disabled="mode === 'add' && initialSelected.includes((item as FmAttribute).key)"
				@update:model-value="emits('update:modelValue', $event)"
				@update:suggested="emits('update:suggested', $event)"
			/>
		</template>
	</div>
</template>

<script lang="ts" setup>
	import { computed } from 'vue';
	import has from 'lodash/has';
	import type {
		FmItemPickerContentProps,
		FmItemPickerContentEmits,
		FmAttributeGroup
	} from './types';
	import FmItemPickerItem from '../ItemPickerItem/ItemPickerItem.vue';
	import FmItemPickerGroup from '../ItemPickerGroup/ItemPickerGroup.vue';
	import type { FmAttribute } from '@/types';

	const props = withDefaults(defineProps<FmItemPickerContentProps>(), {
		suggested: () => [],
		selected: () => [],
		initialSelected: () => [],
		locals: {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			suggested: 'Suggested',
			selected: 'Selected'
		}
	});
	const emits = defineEmits<FmItemPickerContentEmits>();

	const sortedAttributes = computed(() =>
		Object.values(props.attributes || {}).sort((a, b) => {
			if (isItemGroup(a)) {
				return -1;
			}

			if (isItemGroup(b)) {
				return 1;
			}

			if (!(isItemGroup(a) && isItemGroup(b))) {
				const processedNameA = (a.name as unknown as string).split('. ');
				const processedNameB = (b.name as unknown as string).split('. ');
				return processedNameA.slice(-1) > processedNameB.slice(-1) ? 1 : -1;
			}

			return 1;
		})
	);

	function isItemGroup(item: FmAttributeGroup | FmAttribute) {
		const isItemSelected =
			'key' in item && (props.selected || []).includes((item as FmAttribute).key);
		const isItemSuggested =
			'key' in item && (props.suggested || []).includes((item as FmAttribute).key);
		if (isItemSelected || isItemSuggested) {
			return false;
		}

		return !has(item, 'value_type');
	}
</script>

<style lang="scss">
	.fm-item-picker-content {
		position: relative;
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
</style>
