<template>
  <div class="fm-time-picker">
    <div :class="['fm-time-picker__block', 'fm-time-picker__block-center']" />

    <div class="fm-time-picker__body">
      <!-- @vue-ignore -->
      <div
        class="fm-time-picker__col fm-time-picker__col-right"
        @scroll="onHoursColScrollDebounced"
      >
        <div
          v-for="hour in hours"
          :key="hour"
          :id="`h-${id}-${hour}`"
          :class="[
            'fm-time-picker__cell',
            {
              'fm-time-picker__cell--active': hour === hoursVal,
              'fm-time-picker__cell--show-min': hour === hoursWithBlur.min,
              'fm-time-picker__cell--show-max': hour === hoursWithBlur.max
            }
          ]"
          @click.stop.prevent="select('hours', hour)"
        >
          {{ hour }}
        </div>
      </div>
      <!-- @vue-ignore -->
      <div
        class="fm-time-picker__col fm-time-picker__col-left"
        @scroll="onMinutesColScrollDebounced"
      >
        <div
          v-for="min in filteredMinutes"
          :key="min"
          :id="`m-${id}-${min}`"
          :class="[
            'fm-time-picker__cell',
            {
              'fm-time-picker__cell--active': min === minutesVal,
              'fm-time-picker__cell--show-min': min === minutesWithBlur.min,
              'fm-time-picker__cell--show-max': min === minutesWithBlur.max
            }
          ]"
          @click.stop.prevent="select('minutes', min)"
        >
          {{ min }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
  import debounce from 'lodash/debounce';
  import { getRandomString } from '@/utils';
  import type { Nullable } from '@/types';
  import type { FmTimePickerProps, FmTimePickerEmits } from './types';

  const id = getRandomString(4);

  const hours = Array.from({ length: 24 }).map((_, i) => `${i}`.padStart(2, '0'));
  const minutes = Array.from({ length: 60 }).map((_, i) => `${i}`.padStart(2, '0'));

  const props = withDefaults(defineProps<FmTimePickerProps>(), {
    modelValue: '00:00',
    minutesStep: 1,
    size: 288
  });

  const emits = defineEmits<FmTimePickerEmits>();

  const value = ref<Nullable<string>>(props.modelValue);

  const onHoursColScrollDebounced = debounce(onHoursColScroll, 300);
  const onMinutesColScrollDebounced = debounce(onMinutesColScroll, 300);

  const filteredMinutes = computed(() =>
    minutes.filter((m) => Number(m) % props.minutesStep === 0)
  );

  const hoursVal = computed(() => (value.value || '00:00').split(':')[0]);
  const minutesVal = computed(() => (value.value || '00:00').split(':')[1]);

  const hoursWithBlur = computed(() => {
    const currentHourIndex = hours.findIndex((h) => h === hoursVal.value);
    const minHourIndex = currentHourIndex - 2;
    const maxHourIndex = currentHourIndex + 2;
    return {
      min: minHourIndex < 0 ? null : hours[minHourIndex],
      max: maxHourIndex > hours.length - 1 ? null : hours[maxHourIndex]
    };
  });
  const minutesWithBlur = computed(() => {
    const currentMinutesIndex = filteredMinutes.value.findIndex((m) => m === minutesVal.value);
    const minMinutesIndex = currentMinutesIndex - 2;
    const maxMinutesIndex = currentMinutesIndex + 2;
    return {
      min: minMinutesIndex < 0 ? null : filteredMinutes.value[minMinutesIndex],
      max:
        maxMinutesIndex > filteredMinutes.value.length - 1
          ? null
          : filteredMinutes.value[maxMinutesIndex]
    };
  });

  const cssSize = computed(() => `${props.size}px`);
  const cssBorderRadius = computed(() => `${Math.floor(props.size / 10)}px`);
  const cssPadding = computed(() => `${Math.floor((props.size / 10 / 7) * 6)}px`);
  const cellSize = computed(() => {
    const blockHeight = props.size - Math.floor((props.size / 10 / 7) * 6) * 2;
    return Math.floor(blockHeight / 5);
  });
  const cssCellSize = computed(() => `${cellSize.value}px`);

  function scrollToElement(field: 'hours' | 'minutes', val: string) {
    const cellId = `${field === 'hours' ? 'h' : 'm'}-${id}-${val}`;
    const cellEl = document.getElementById(cellId);
    cellEl && cellEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  function select(field: 'hours' | 'minutes', val: string) {
    let newTimeValue = `${hoursVal.value}:${minutesVal.value}`;
    switch (field) {
      case 'hours':
        newTimeValue = `${val}:${minutesVal.value}`;
        break;
      case 'minutes':
        newTimeValue = `${hoursVal.value}:${val}`;
        break;
    }
    scrollToElement(field, val);

    value.value = newTimeValue;
    emits('update:modelValue', newTimeValue);
  }

  function onHoursColScroll(ev: UIEvent) {
    // @ts-ignore
    const selectedItemIndex = Math.round(ev.target?.scrollTop / cellSize.value);
    const selectedItem = hours[selectedItemIndex];
    select('hours', selectedItem);
  }

  function onMinutesColScroll(ev: UIEvent) {
    // @ts-ignore
    const selectedItemIndex = Math.round(ev.target?.scrollTop / cellSize.value);
    const selectedItem = filteredMinutes.value[selectedItemIndex];
    select('minutes', selectedItem);
  }

  watch(
    () => props.modelValue,
    (val, oldVal) => {
      if (val !== oldVal && val !== value.value) {
        value.value = val;
      }
    },
    { immediate: true }
  );

  onBeforeMount(() => {
    if (![1, 2, 5, 10, 15, 20, 30].includes(props.minutesStep)) {
      throw new Error(
        `[FmTimePicker] The value of props 'minutes-step' cannot be ${props.minutesStep}. It must be one of the following: 1, 2, 5, 10, 15, 20 or 30.`
      );
    }
  });

  onMounted(() => {
    const [hours, minutes] = value.value ? value.value.split(':') : ['0', '0'];
    scrollToElement('hours', hours);
    scrollToElement('minutes', minutes);
  });
</script>

<style lang="scss" scoped>
  .fm-time-picker {
    --fmTimePicker-size: v-bind(cssSize);
    --fmTimePicker-color: var(--on-surface);
    --fmTimePicker-background: var(--surface-container-high);
    --fmTimePicker-padding: v-bind(cssPadding);
    --fmTimePicker-border-radius: v-bind(cssBorderRadius);
    --fmTimePicker-item-size: v-bind(cssCellSize);
    --fmTimePicker-font: var(--body-large-font);
    --fmTimePicker-bg-active: var(--secondary);
    --fmTimePicker-color-active: var(--on-secondary);

    position: relative;
    width: var(--fmTimePicker-size);
    min-width: var(--fmTimePicker-size);
    height: var(--fmTimePicker-size);
    min-height: var(--fmTimePicker-size);
    padding: var(--fmTimePicker-padding);
    background-color: var(--fmTimePicker-background);
    border-radius: var(--fmTimePicker-border-radius);
    box-shadow:
      0 2px 6px 2px rgba(0, 0, 0, 0.15),
      0 1px 2px 0 rgba(0, 0, 0, 0.3);

    &__body {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: stretch;
      margin: 0 auto;
      background-color: transparent;
    }

    &__col {
      position: relative;
      width: 50%;
      height: 100%;
      padding-top: calc(var(--fmTimePicker-item-size) * 2);
      padding-bottom: calc(var(--fmTimePicker-item-size) * 2);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      scrollbar-width: none;
      scroll-behavior: smooth;
      overflow-y: auto;

      &-right {
        align-items: flex-end;
      }

      &-left {
        align-items: flex-start;
      }

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &__cell {
      position: relative;
      width: var(--fmTimePicker-item-size);
      min-width: var(--fmTimePicker-item-size);
      height: var(--fmTimePicker-item-size);
      min-height: var(--fmTimePicker-item-size);
      display: flex;
      justify-content: center;
      align-items: center;
      font: var(--fmTimePicker-font);
      color: var(--fmTimePicker-color);
      cursor: pointer;

      &--active {
        color: var(--fmTimePicker-color-active);
        font-weight: 500;
      }

      &--show-min {
        color: transparent;
        background-clip: text;
        background-image: linear-gradient(to top, var(--fmTimePicker-color), transparent);
      }

      &--show-max {
        color: transparent;
        background-clip: text;
        background-image: linear-gradient(to bottom, var(--fmTimePicker-color), transparent);
      }
    }

    &__block {
      position: absolute;
      left: var(--fmTimePicker-padding);
      width: calc(100% - calc(var(--fmTimePicker-padding) * 2));
      height: var(--fmTimePicker-item-size);

      &-center {
        top: calc(50% - calc(var(--fmTimePicker-item-size) / 2));
        background-color: var(--fmTimePicker-bg-active);
      }
    }
  }
</style>
