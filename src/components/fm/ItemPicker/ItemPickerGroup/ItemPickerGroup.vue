<template>
  <div class="fm-item-picker-group-wrapper">
    <div class="fm-item-picker-group" @click.stop.prevent="isOpen = !isOpen">
      <FmIcon
        :icon="isOpen ? 'mdi-menu-down' : 'mdi-menu-right'"
        size="20"
        color="var(--fmItemPickerGroup-color)"
      />

      <span class="fm-item-picker-group__text">{{ value.name }}</span>
    </div>

    <transition>
      <div v-if="isOpen" class="fm-item-picker-group__body">
        <template v-for="item in value.content" :key="item.key">
          <FmItemPickerGroup
            v-if="item.itemType === 'group'"
            :level="level + 1"
            :value="item as FmAttributeGroup"
            :mode="mode"
            :multiple="multiple"
            :selected="selected"
            :initial-selected="initialSelected"
            :suggested="suggested"
            @update:model-value="emits('update:modelValue', $event)"
            @update:suggested="emits('update:suggested', $event)"
          />

          <FmItemPickerItem
            v-else
            :item="item as FmAttribute"
            :selected="selected"
            :suggested="suggested"
            :multiple="multiple"
            :disabled="mode === 'add' && initialSelected.includes((item as FmAttribute).key)"
            @update:model-value="emits('update:modelValue', $event)"
            @update:suggested="emits('update:suggested', $event)"
          />
        </template>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { FmItemPickerGroupProps, FmItemPickerGroupEmits } from './types';
  import FmIcon from '../../Icon/Icon.vue';
  import FmItemPickerItem from '../ItemPickerItem/ItemPickerItem.vue';
  import FmItemPickerGroup from './ItemPickerGroup.vue';
  import type { FmAttribute } from '@/types';
  import type { FmAttributeGroup } from '@/components/fm/ItemPicker/ItemPickerContent/types';

  withDefaults(defineProps<FmItemPickerGroupProps>(), {
    mode: 'add',
    suggested: () => [],
    selected: () => [],
    initialSelected: () => []
  });
  const emits = defineEmits<FmItemPickerGroupEmits>();

  const isOpen = ref(false);
</script>

<style lang="scss" scoped>
  .fm-item-picker-group {
    --fmItemPickerGroup-height: 40px;
    --fmItemPickerGroup-color: var(--on-surface);

    position: relative;
    width: 100%;
    height: var(--fmItemPickerGroup-height);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: var(--spacing-8);
    padding: 0 var(--spacing-8) 0 var(--spacing-12);
    font: var(--body-medium-font);
    color: var(--fmItemPickerGroup-color);
    cursor: pointer;

    &:hover {
      background-color: color-mix(in srgb, var(--fmItemPickerGroup-color) 8%, transparent);
    }

    &__text {
      flex-grow: 1;
    }

    &__body {
      position: relative;
      width: 100%;
      padding-left: 28px;
    }

    &-wrapper {
      position: relative;
      width: 100%;
    }
  }
</style>
