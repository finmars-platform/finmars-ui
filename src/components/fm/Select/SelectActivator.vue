<template>
  <div
    ref="activatorEl"
    :tabindex="disabled ? -1 : 0"
    :class="[
      'fm-select-activator',
      {
        'fm-select-activator--standard': variant === 'standard',
        'fm-select-activator--outlined': variant === 'outlined',
        'fm-select-activator--focused': isFocused || focused,
        'fm-select-activator--errored': error,
        'fm-select-activator--disabled': disabled
      }
    ]"
    @focus="onFocus"
    @blur="onBlur"
    @keydown.down="onKeydown($event, 'down')"
    @keydown.up="onKeydown($event, 'up')"
    @keydown.esc="onKeydown($event, 'esc')"
    @keydown.enter="onKeydown($event, 'enter')"
    @keydown.tab="onKeydown($event, 'tab')"
  >
    <FmIcon
      v-if="prependIcon"
      :icon="prependIcon"
      color="var(--color-fmSelectActivator)"
      @click="emits('click:prependIcon', $event)"
    />

    <div
      :class="[
        'fm-select-activator__body',
        {
          'fm-select-activator__body--shorter': (clearable && value) || prependIcon,
          'fm-select-activator__body--shortest': clearable && value && prependIcon,
          'fm-select-activator__body--labeled': isLabelShifted
        }
      ]"
    >
      <div
        v-if="label"
        ref="labelEl"
        class="truncate"
        :class="[
          'fm-select-activator__label',
          { 'fm-select-activator__label--shifted': isLabelShifted }
        ]"
      >
        {{ label }}
      </div>

      <div
        v-if="isFocused || value || (persistentPlaceholder && placeholder)"
        class="fm-select-activator__content"
      >
        <div v-if="showPlaceholder" class="truncate" :class="['fm-select-activator__placeholder']">
          {{ placeholder }}
        </div>

        <div
          v-if="value"
          class="truncate"
          :class="['fm-select-activator__value', { 'fm-select-activator__value--chips': chip }]"
        >
          <slot>
            {{ value }}
          </slot>
        </div>
      </div>
    </div>

    <FmIcon
      v-if="clearable && value"
      :icon="clearIcon || 'mdi-close-circle-outline'"
      color="var(--color-fmSelectActivator)"
      @click.stop.prevent="emits('click:clear', $event)"
    />

    <FmIcon
      class="fm-select-activator__icon"
      :icon="isDropdownOpened ? 'mdi-menu-up' : 'mdi-menu-down'"
      color="var(--color-fmSelectActivator)"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import FmIcon from '@/components/fm/Icon/Icon.vue';
  import type {
    FmSelectActivatorProps,
    FmSelectActivatorEmits,
    FmSelectActivatorSlots
  } from './types';

  const props = withDefaults(defineProps<FmSelectActivatorProps>(), {
    variant: 'standard'
  });
  const emits = defineEmits<FmSelectActivatorEmits>();
  defineSlots<FmSelectActivatorSlots>();

  const activatorEl = ref<HTMLDivElement | null>(null);
  const labelEl = ref<HTMLDivElement | null>(null);
  const isFocused = ref(false);

  const widthValue = computed(() => (props.width ? `${props.width}px` : '100%'));
  const heightValue = computed(() => (props.compact ? '40px' : '56px'));
  const isLabelShifted = computed(
    () => isFocused.value || props.persistentPlaceholder || props.value
  );
  const showPlaceholder = computed(
    () =>
      (props.placeholder && !props.value && isFocused.value) ||
      (props.persistentPlaceholder && !props.value)
  );
  const labelElWidth = computed(() => (props.label ? `${labelEl.value?.offsetWidth}px` : 0));

  function onFocus(ev: FocusEvent) {
    if (props.disabled) {
      return;
    }

    isFocused.value = true;
    emits('focus', ev);
  }

  function onBlur(ev: FocusEvent) {
    if (props.disabled) {
      return;
    }

    isFocused.value = false;
    emits('blur', ev);
  }

  function onKeydown(event: KeyboardEvent, key: 'down' | 'up' | 'esc' | 'enter' | 'tab') {
    event.preventDefault();
    event.stopImmediatePropagation();
    emits('keydown', { event, key });
  }

  onMounted(() => {
    activatorEl.value && emits('init', activatorEl.value);
  });
</script>

<style lang="scss" scoped>
  .fm-select-activator {
    --height-fmSelectActivator: v-bind(heightValue);
    --backgroundColor-standard-fmSelectActivator: var(--surface-container-highest);
    --backgroundColor-outlined-fmSelectActivator: var(--surface);
    --color-fmSelectActivator: var(--on-surface);
    --color-placeholder-fmSelectActivator: var(--on-surface-variant);
    --color-focused-fmSelectActivator: var(--primary);
    --color-errored-fmSelectActivator: var(--error);

    position: relative;
    width: v-bind(widthValue);
    min-height: var(--height-fmSelectActivator);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 12px;
    column-gap: 4px;

    &:focus-visible {
      outline: none;
    }

    &:not(.fm-select-activator--disabled):hover {
      cursor: pointer;

      &.fm-select-activator--standard {
        background-color: color-mix(
          in srgb,
          var(--backgroundColor-standard-fmSelectActivator) 90%,
          transparent
        );
      }

      &.fm-select-activator--outlined {
        background-color: color-mix(
          in srgb,
          var(--backgroundColor-outlined-fmSelectActivator) 90%,
          transparent
        );
      }
    }

    &--disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    &--standard {
      background-color: var(--backgroundColor-standard-fmSelectActivator);
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;

      &:after {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        bottom: 0;
        border-top: 1px solid var(--color-fmSelectActivator);
      }
    }

    &--outlined {
      background-color: var(--backgroundColor-outlined-fmSelectActivator);
      border-radius: 4px;
      outline: 1px solid color-mix(in srgb, var(--color-fmSelectActivator) 38%, transparent);

      .fm-select-activator__label--shifted {
        position: absolute;
        padding: 0 4px;
        background-color: var(--backgroundColor-outlined-fmSelectActivator);
        top: -8px;
        z-index: 1;
      }

      .fm-select-activator__body--labeled {
        &:before {
          content: '';
          position: absolute;
          left: 0;
          width: v-bind(labelElWidth);
          height: 16px;
          background-color: var(--backgroundColor-outlined-fmSelectActivator);
          top: -8px;
        }
      }
    }

    &__body {
      position: relative;
      width: calc(100% - 28px);
      min-height: var(--height-fmSelectActivator);
      padding: 8px 0 4px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      &.fm-select-activator__body--shorter {
        width: calc(100% - 56px);
      }

      &.fm-select-activator__body--shortest {
        width: calc(100% - 84px);
      }
    }

    &__label {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      color: var(--color-placeholder-fmSelectActivator);
      opacity: 0.8;
      transition: 0.2s ease;

      &--shifted {
        font-size: 12px;
        line-height: 16px;
      }
    }

    &__placeholder {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      color: var(--color-placeholder-fmSelectActivator);
      opacity: 0.8;
      transition: 0.2s ease;
    }

    &__content {
      position: relative;
      width: 100%;
      min-height: 24px;
    }

    &--focused {
      &.fm-select-activator--standard {
        &:after {
          border-top: 2px solid var(--color-focused-fmSelectActivator);
        }
      }

      &.fm-select-activator--outlined {
        outline: 2px solid var(--color-focused-fmSelectActivator);
      }

      .fm-select-activator__label {
        color: var(--color-focused-fmSelectActivator);
        opacity: 0.8;
      }
    }

    &--errored {
      &.fm-select-activator--standard {
        &:after {
          border-top: 1px solid var(--color-errored-fmSelectActivator);
        }
      }

      &.fm-select-activator--focused.fm-selection-activator--standard {
        &:after {
          border-top: 2px solid var(--color-errored-fmSelectActivator);
        }
      }

      &.fm-select-activator--outlined {
        outline: 1px solid var(--color-errored-fmSelectActivator);
      }

      &.fm-select-activator--focused.fm-selection-activator--outlined {
        outline: 2px solid var(--color-errored-fmSelectActivator);
      }

      .fm-select-activator__label {
        color: var(--color-errored-fmSelectActivator);
        opacity: 0.8;
      }
    }

    &__value {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: var(--color-fmSelectActivator);

      &--chips {
        flex-wrap: wrap;
        gap: 4px;
      }
    }
  }
</style>
