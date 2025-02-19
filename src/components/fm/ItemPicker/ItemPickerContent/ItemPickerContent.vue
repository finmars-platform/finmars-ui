<template>
  <div :class="['fm-item-picker-content', 'scroll-variant-thin']">
    <template v-for="item in sortedAttributes" :key="item.key">
      <FmItemPickerGroup
        v-if="item.itemType === 'group'"
        :level="0"
        :value="item"
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
        :item="item as unknown as FmAttribute"
        :multiple="multiple"
        :selected="selected"
        :suggested="suggested"
        :disabled="mode === 'add' && initialSelected.includes((item as unknown as FmAttribute).key)"
        @update:model-value="emits('update:modelValue', $event)"
        @update:suggested="emits('update:suggested', $event)"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import type {
    FmItemPickerContentProps,
    FmItemPickerContentEmits,
    FmAttributeGroup
  } from './types';
  import FmItemPickerItem from '../ItemPickerItem/ItemPickerItem.vue';
  import FmItemPickerGroup from '../ItemPickerGroup/ItemPickerGroup.vue';
  import type { FmAttribute } from '@/types';

  const props = withDefaults(defineProps<FmItemPickerContentProps>(), {
    category: '',
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
      if (isItemGroup(a) && isItemGroup(b)) {
        return a.name > b.name ? 1 : -1;
      }

      if (isItemGroup(a)) {
        return -1;
      }

      if (isItemGroup(b)) {
        return 1;
      }

      if (!(isItemGroup(a) && isItemGroup(b))) {
        const processedNameA = (a.name as unknown as string).split('. ');
        const processedNameB = (b.name as unknown as string).split('. ');
        return processedNameA.pop()! > processedNameB.pop()! ? 1 : -1;
      }

      return 1;
    })
  );

  function isItemGroup(item: FmAttributeGroup | FmAttribute) {
    const { itemType = '' } = item;
    return itemType === 'group';
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
