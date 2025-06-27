<template>
  <div
    :tabindex="disabled ? -1 : 0"
    ref="chipEl"
    :id="id"
    :class="[
      'fm-chip',
      {
        'fm-chip--standard': type === 'standard',
        'fm-chip--outlined': type === 'outlined',
        'fm-chip--closable': closable,
        'fm-chip--with-prepend': prependIcon,
        'fm-chip--with-append': appendIcon,
        'fm-chip--rounded': rounded,
        'fm-chip--elevated': elevated,
        'fm-chip--dragged': dragged,
        'fm-chip--readonly': readonly,
        'fm-chip--disabled': disabled
      }
    ]"
    v-on="disabled || readonly ? {} : { click: onClick, keydown: onKeyDown }"
  >
    <slot name="prepend-icon">
      <FmIcon
        v-if="prependIconValue"
        v-bind="prependIconValue"
        v-ripple.center.circle
        tabindex="-1"
        v-on="disabled || readonly ? {} : { click: onPrependClick }"
      />
    </slot>

    <div class="fm-chip__content">
      {{ value }}

      <FmTooltip
        type="secondary"
        activator="parent"
        :location="tooltipProps.location"
        :disabled="!tooltip"
      >
        {{ tooltipProps.tooltip }}
      </FmTooltip>
    </div>

    <slot name="append-icon">
      <FmIcon
        v-if="appendIconValue"
        v-bind="appendIconValue"
        v-ripple.center.circle
        tabindex="-1"
        v-on="disabled || readonly ? {} : { click: onAppendClick }"
      />
    </slot>

    <FmIcon
      v-if="closable"
      v-bind="getIconProps('mdi-close')"
      v-ripple.center.circle
      tabindex="-1"
      v-on="disabled || readonly ? {} : { click: onCloseClick }"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { Ripple } from 'vuetify/directives';
  import FmIcon from '../Icon/Icon.vue';
  import FmTooltip from '../Tooltip/Tooltip.vue';
  import type { FmComponentIcon } from '@/types';
  import type { FmChipProps, FmChipEmits, FmChipSlots } from './types';

  const vRipple = Ripple;
  const columnGap = 6;

  const props = withDefaults(defineProps<FmChipProps>(), {
    type: 'standard'
  });
  const emits = defineEmits<FmChipEmits>();
  defineSlots<FmChipSlots>();

  const chipEl = ref<HTMLDivElement | null>(null);

  const heightValue = computed(() => (props.compact ? '24px' : '32px'));

  const columnGapValue = computed(() => `${columnGap}px`);

  const prependIconValue = computed(() => getIconProps(props.prependIcon));

  const appendIconValue = computed(() => getIconProps(props.appendIcon));

  const contentWidthGap = computed(() => {
    let res = 0;
    if (props.closable) {
      res = res + 16 + columnGap;
    }
    if (prependIconValue.value) {
      res = res + Number(prependIconValue.value.size!) + columnGap;
    }
    if (appendIconValue.value) {
      res = res + Number(appendIconValue.value.size!) + columnGap;
    }

    return res;
  });

  const tooltipProps = computed(() => {
    return typeof props.tooltip === 'string'
      ? {
          tooltip: props.tooltip,
          location: 'top'
        }
      : {
          tooltip: props.tooltip?.value,
          location: props.tooltip?.location || 'top'
        };
  });

  function getIconProps(data?: FmComponentIcon | string): FmComponentIcon | false {
    if (!data) {
      return false;
    }

    if (typeof data === 'string') {
      return {
        icon: data,
        size: 16,
        color:
          props.type === 'standard'
            ? 'var(--fmChip-standard-color)'
            : 'var(--fmChip-outlined-color)'
      };
    }

    if (!data.icon) {
      return false;
    }

    return {
      icon: data.icon,
      size: data.size || 16,
      color:
        data.color ||
        (props.type === 'standard'
          ? 'var(--fmChip-standard-color)'
          : 'var(--fmChip-outlined-color)')
    };
  }

  function onClick(ev: MouseEvent) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    emits('click', { event: ev, element: chipEl.value! });
  }

  function onKeyDown(ev: KeyboardEvent) {
    // ev.preventDefault()
    ev.stopImmediatePropagation();
    emits('keydown', ev);
  }

  function onPrependClick(ev: MouseEvent) {
    if (props.disabled || props.readonly) {
      return;
    }

    ev.preventDefault();
    ev.stopImmediatePropagation();
    emits('click:prepend', ev);
  }

  function onAppendClick(ev: MouseEvent) {
    if (props.disabled || props.readonly) {
      return;
    }

    ev.preventDefault();
    ev.stopImmediatePropagation();
    emits('click:append', ev);
  }

  function onCloseClick(ev: MouseEvent) {
    if (props.disabled || props.readonly) {
      return;
    }

    ev.preventDefault();
    ev.stopImmediatePropagation();
    emits('click:close', ev);
  }
</script>

<style lang="scss" scoped>
  .fm-chip {
    --fmChip-height: v-bind(heightValue);
    --fmChip-column-gap: v-bind(columnGapValue);
    --fmChip-outlined-borderColor: var(--outline);
    --fmChip-outlined-bgColor: var(--surface);
    --fmChip-outlined-color: var(--on-surface-variant);
    --fmChip-standard-bgColor: var(--secondary-container);
    --fmChip-standard-bgColor-dragged: rgba(29, 25, 43, 0.12);
    --fmChip-standard-color: var(--on-secondary-container);
    --fmChip-content-width-gap: v-bind(contentWidthGap);

    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: var(--fmChip-column-gap);
    padding: 0 12px;
    font: var(--body-medium-font);
    height: var(--fmChip-height);
    max-width: 100%;
    width: min-content;
    transition: all 0.2s ease;

    &:not(.fm-chip--rounded) {
      border-radius: 8px;
    }

    &:not(.fm-chip--readonly),
    &:not(.fm-chip--disabled) {
      cursor: pointer;
    }

    &.fm-chip--standard {
      color: var(--fmChip-standard-color);
      background-color: var(--fmChip-standard-bgColor);

      &:focus-visible {
        background-color: color-mix(in srgb, var(--fmChip-standard-bgColor), var(--on-surface) 20%);
        outline: none;
      }

      &.fm-chip--dragged {
        background-color: var(--fmChip-standard-bgColor-dragged);
      }

      &:hover {
        background-color: color-mix(in srgb, var(--fmChip-standard-bgColor), var(--on-surface) 10%);
      }

      &:active {
        background-color: color-mix(in srgb, var(--fmChip-standard-bgColor), var(--on-surface) 30%);
        outline: none;
      }
    }

    &.fm-chip--outlined {
      color: var(--fmChip-outlined-color);
      background-color: var(--fmChip-outlined-bgColor);
      border: 1px solid var(--fmChip-outlined-borderColor);

      &:hover {
        background-color: color-mix(in srgb, var(--fmChip-outlined-bgColor), var(--on-surface) 10%);
      }

      &:focus-visible {
        background-color: color-mix(in srgb, var(--fmChip-outlined-bgColor), var(--on-surface) 20%);
        outline: none;
      }

      &:active {
        background-color: color-mix(in srgb, var(--fmChip-outlined-bgColor), var(--on-surface) 30%);
        outline: none;
      }

      &.fm-chip--dragged {
        background-color: var(--fmChip-outlined-bgColor-dragged);
      }
    }

    &.fm-chip--rounded {
      border-radius: var(--fmChip-height);
    }

    &.fm-chip--closable,
    &.fm-chip--with-append {
      padding-right: 8px;
    }

    &.fm-chip--with-prepend:not(.fm-chip--rounded) {
      padding-left: 8px;
    }

    &.fm-chip--with-prepend.fm-chip--rounded {
      padding-left: 4px;
    }

    &.fm-chip--elevated {
      box-shadow:
        0 1px 3px 1px rgba(0, 0, 0, 0.15),
        0 1px 2px 0 rgba(0, 0, 0, 0.3);
    }

    &.fm-chip--readonly {
      pointer-events: none;
    }

    &.fm-chip--disabled {
      pointer-events: none;
      opacity: 0.38;
    }

    .fm-chip__content {
      max-width: calc(100% - var(--fmChip-content-width-gap));
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &[title]:hover:after {
        content: attr(title);
        position: absolute;
        bottom: calc(100% + 4px);
        left: 0;
        font: var(--body-small-font);
        padding: 4px 6px;
        border-radius: 4px;
        background-color: var(--inverse-surface);
        color: var(--inverse-on-surface);
      }
    }
  }
</style>
