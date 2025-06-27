<template>
  <VMenu
    v-bind="vMenuProps"
    v-model="innerValue"
    @update:model-value="emits('update:modelValue', $event)"
  >
    <template #activator="{ isActive, props, targetRef }">
      <slot name="activator" :props="props" :is-active="isActive" :target-ref="targetRef" />
    </template>

    <template #default>
      <div
        tabindex="0"
        :id="`${vMenuProps.id}-content`"
        class="relative w-full rounded py-2 !bg-[var(--surface-container)] shadow-[0_2px_6px_2px_rgba(0,0,0,0.15),0_1px_2px_0_rgba(0,0,0,0.3)] overflow-y-auto focus-visible:outline-none scroll-variant-thin"
        :style="menuContentStyles"
        @keydown.down="onKeydown($event, 'down')"
        @keydown.up="onKeydown($event, 'up')"
        @keydown.esc="onKeydown($event, 'esc')"
        @keydown.enter="onKeydown($event, 'enter')"
        @keydown.tab="onKeydown($event, 'tab')"
      >
        <slot>
          <FmMenuItem
            v-for="(item, index) in items"
            :key="index"
            :id="`${vMenuProps.id}-${index}`"
            :index="index"
            :item="item"
            :title="item.title"
            :item-disabled="item.disabled"
            :item-selected="item.isSelected"
            :item-active="item.isActive"
            :item-size="itemSize"
            :disabled="disabled"
            v-on="disabled ? {} : { click: (ev) => onItemClick(ev, { item, index }) }"
          >
            <template #item>
              <slot name="item" :item="item" :index="index" />
            </template>

            <template #prepend>
              <slot name="item-prepend" :item="item" :index="index" />
            </template>

            <template #append>
              <slot name="item-append" :item="item" :index="index" />
            </template>
          </FmMenuItem>
        </slot>

        <div
          v-if="loading"
          class="absolute inset flex justify-center items-center bg-[rgba(0, 0, 0, 0.3)]"
        >
          <FmProgressCircular indeterminate />
        </div>
      </div>
    </template>
  </VMenu>
</template>

<script setup>
  import { computed, ref, watch } from 'vue';
  import { VMenu } from 'vuetify/components';
  import { getRandomString } from '@/utils';
  import FmMenuItem from './MenuItem.vue';
  import FmProgressCircular from '../ProgressCircular/ProgressCircular.vue';

  const props = defineProps({
    modelValue: {
      type: Boolean
    },
    id: {
      type: String
    },
    items: {
      type: Array, // { title: string; [key: string]: any }[]
      default: () => []
    },
    itemSize: {
      type: String,
      validator(value) {
        return ['small', 'medium', 'large'].includes(value);
      },
      default: 'large'
    },
    activator: {
      type: [String, Object]
    },
    attach: {
      type: [String, Object, Boolean],
      default: false
    },
    closeOnBack: {
      type: Boolean
    },
    closeOnContentClick: {
      type: Boolean,
      default: true
    },
    contentClass: {
      type: String
    },
    height: {
      type: [String, Number]
    },
    minHeight: {
      type: [String, Number]
    },
    maxHeight: {
      type: [String, Number]
    },
    width: {
      type: [String, Number]
    },
    minWidth: {
      type: [String, Number]
    },
    maxWidth: {
      type: [String, Number]
    },
    offset: {
      type: [String, Number, Array]
    },
    loading: {
      type: Boolean
    },
    location: {
      type: String,
      validator(value) {
        return [
          'top',
          'bottom',
          'start',
          'end',
          'left',
          'right',
          'center',
          'center center',
          'top start | center',
          'top end | center',
          'bottom start | center',
          'bottom end | center',
          'start top | center',
          'end top | center',
          'left top | center',
          'right top | center',
          'start bottom | center',
          'end bottom | center',
          'left bottom | center',
          'right bottom | center'
        ].includes(value);
      }
    },
    locationStrategy: {
      type: [String, Function],
      validator(value) {
        if (typeof value === 'string') {
          return ['static', 'connected'].includes(value);
        }

        return true;
      },
      default: 'connected'
    },
    openDelay: {
      type: [String, Number],
      default: 300
    },
    openOnClick: {
      type: Boolean,
      default: true
    },
    openOnFocus: {
      type: Boolean
    },
    openOnHover: {
      type: Boolean,
      default: false
    },
    origin: {
      type: String,
      validator(value) {
        return [
          'top',
          'bottom',
          'start',
          'end',
          'left',
          'right',
          'center',
          'center center',
          'top start | center',
          'top end | center',
          'bottom start | center',
          'bottom end | center',
          'start top | center',
          'end top | center',
          'left top | center',
          'right top | center',
          'start bottom | center',
          'end bottom | center',
          'left bottom | center',
          'right bottom | center',
          'auto',
          'overlap'
        ].includes(value);
      },
      default: 'auto'
    },
    persistent: {
      type: Boolean,
      default: false
    },
    scrollStrategy: {
      type: [String, Function],
      validator(value) {
        if (typeof value === 'string') {
          return ['close', 'block', 'none', 'reposition'].includes(value);
        }

        return true;
      },
      default: 'reposition'
    },
    zIndex: {
      type: [String, Number],
      default: 2000
    },
    disabled: {
      type: Boolean
    }
  });

  const emits = defineEmits(['update:modelValue', 'click:item', 'menu:keydown']);

  const innerValue = ref(props.modelValue);

  const vMenuProps = computed(() => ({
    id: props.id || getRandomString(4),
    activator: props.activator,
    attach: props.attach,
    contentClass: props.contentClass,
    height: props.height,
    minHeight: props.minHeight,
    maxHeight: props.maxHeight,
    width: props.width,
    minWidth: props.minWidth,
    maxWidth: props.maxWidth,
    offset: props.offset,
    location: props.location,
    locationStrategy: props.locationStrategy,
    openDelay: props.openDelay,
    origin: props.origin,
    scrollStrategy: props.scrollStrategy,
    zIndex: props.zIndex,
    closeOnBack: props.closeOnBack,
    closeOnContentClick: props.closeOnContentClick,
    openOnClick: props.openOnClick,
    openOnFocus: props.openOnFocus,
    openOnHover: props.openOnHover,
    persistent: props.persistent,
    disabled: props.disabled
  }));

  const menuContentStyles = computed(() => ({
    ...(props.height && {
      height: props.height === 'auto' ? props.height : `${props.height}px`
    }),
    ...(props.maxHeight && { maxHeight: `${props.maxHeight}px` }),
    ...(props.minHeight && { minHeight: `${props.minHeight}px` })
  }));

  function onItemClick(ev, { item, index }) {
    ev.stopPropagation();
    ev.preventDefault();

    emits('click:item', { item, index });

    if (props.closeOnContentClick) {
      innerValue.value = false;
      emits('update:modelValue', false);
    }
  }

  function onKeydown(event, key) {
    event.preventDefault();
    event.stopImmediatePropagation();
    emits('menu:keydown', { event, key });
  }

  watch(
    () => props.modelValue,
    (val) => {
      if (val !== innerValue.value) {
        innerValue.value = val;
      }
    },
    { immediate: true }
  );
</script>
