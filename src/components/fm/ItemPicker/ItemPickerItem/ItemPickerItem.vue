<template>
  <div
    :class="[
      'fm-item-picker-item',
      {
        'fm-item-picker-item--disabled': disabled,
        'fm-item-picker-item--selected': isSelected && !multiple
      }
    ]"
    v-on="disabled ? {} : { click: onItemClick }"
  >
    <FmCheckbox v-if="multiple" :model-value="isSelected" :disabled="disabled" />

    <span class="fm-item-picker-item__text" v-html="name" />

    <FmIconButton
      :icon="isSuggested ? 'mdi-star' : 'mdi-star-outline'"
      variant="text"
      size="small"
      :disabled="disabled"
      v-on="disabled ? {} : { click: onIconClick }"
    />

    <FmTooltip v-if="item.description" type="secondary" location="top" :disabled="disabled">
      <template #activator="{ props }">
        <VIcon
          v-bind="props"
          icon="mdi-information-outline"
          size="20"
          :color="
            isSelected && !multiple ? 'var(--on-secondary)' : 'var(--color-item-fmItemPicker)'
          "
        />
      </template>

      <span>{{ item.description }}</span>
    </FmTooltip>
  </div>
</template>

<script lang="ts" setup generic="T extends FmAttribute">
  import { computed } from 'vue';
  import type { FmAttribute } from '@/types';
  import type { FmItemPickerItemProps, FmItemPickerItemEmits } from './types';
  import FmIconButton from '../../IconButton/IconButton.vue';
  import FmCheckbox from '../../Checkbox/Checkbox.vue';
  import FmTooltip from '../../Tooltip/Tooltip.vue';
  import { VIcon } from 'vuetify/components';

  const props = withDefaults(defineProps<FmItemPickerItemProps<T>>(), {
    selected: () => [],
    suggested: () => []
  });
  const emits = defineEmits<FmItemPickerItemEmits>();

  const name = computed(() => {
    const processedName = props.item.name.split('. ');
    return processedName.slice(-1)[0];
  });

  const isSelected = computed(() => props.selected.includes(props.item.key));

  const isSuggested = computed(() => props.suggested.includes(props.item.key));

  function onItemClick(ev: MouseEvent) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    emits('update:modelValue', props.item.key);
  }

  function onIconClick(ev: MouseEvent) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    emits('update:suggested', props.item.key);
  }
</script>

<style lang="scss" scoped>
  .fm-item-picker-item {
    --fmItemPickerItem-height: 40px;
    --fmItemPickerItem-color: var(--on-surface);

    position: relative;
    width: 100%;
    height: var(--fmItemPickerItem-height);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: var(--spacing-8);
    padding: 0 var(--spacing-8) 0 var(--spacing-12);
    font: var(--body-medium-font);
    color: var(--fmItemPickerItem-color);

    &:not(.fm-item-picker-item--disabled) {
      cursor: pointer;

      &:hover {
        color: var(--on-surface);
        background-color: color-mix(in srgb, var(--on-surface) 8%, transparent);

        i {
          color: var(--on-surface-variant) !important;
        }
      }
    }

    &__text {
      flex-grow: 1;
    }

    &--disabled {
      color: color-mix(in srgb, var(--color-item-fmItemPicker) 38%, transparent);

      i.v-icon {
        color: color-mix(in srgb, var(--color-item-fmItemPicker) 38%, transparent) !important;
        caret-color: color-mix(in srgb, var(--color-item-fmItemPicker) 38%, transparent) !important;
      }
    }

    &--selected {
      background-color: var(--secondary);
      color: var(--on-secondary);
    }
  }
</style>
