<template>
  <div
    :id="id"
    class="relative w-full flex flex-row items-center justify-start gap-x-2 px-[12px] text-[var(--body-large-font)] text-(color: var(--on-surface)) hover:bg-[var(--surface-container-highest)] cursor-pointer"
    :class="{
      'h-[56px]': itemSize === 'large',
      'h-[48px]': itemSize === 'medium',
      'h-[40px]': itemSize === 'small',
      'cursor-pointer': !disabled && !itemDisabled,
      'cursor-default': disabled || itemDisabled,
      'pointer-events-none': disabled || itemDisabled,
      'bg-[var(--secondary-container)]': itemSelected,
      'bg-[var(--surface-container-highest)]': itemActive
    }"
  >
    <slot />

    <slot name="prepend">
      <VIcon v-if="prependIcon" class="mr-3" :icon="prependIcon" />
    </slot>
    <slot name="item" :item="item" :index="index">
      <span class="text-[var(--body-large-font)] text-(color: var(--on-surface))">{{ title }}</span>
    </slot>

    <slot name="append">
      <VIcon v-if="appendIcon" class="ml-3" :icon="appendIcon" />
    </slot>
  </div>
</template>
<script setup>
  import { VIcon } from 'vuetify/components';

  const props = defineProps({
    id: {
      type: String
    },
    item: {
      type: Object
    },
    itemSize: {
      type: String
    },
    title: {
      type: String
    },
    itemDisabled: {
      type: Boolean
    },
    itemSelected: {
      type: Boolean
    },
    itemActive: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    index: {
      type: Number
    },
    appendIcon: {
      type: [String, undefined]
    },
    prependIcon: {
      type: [String, undefined]
    }
  });
</script>
