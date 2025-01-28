<template>
  <div class="fm-year-month-picker">
    <div :class="['fm-year-month-picker__block', 'fm-year-month-picker__block-center']" />

    <div class="fm-year-month-picker__body">
      <!-- @vue-ignore -->
      <div class="fm-year-month-picker__col" @scroll="onYearColScrollDebounced">
        <div
          v-for="y in years"
          :key="y"
          :id="`y-${id}-${y}`"
          :class="[
            'fm-year-month-picker__cell',
            {
              'fm-year-month-picker__cell--active': y === year,
              'fm-year-month-picker__cell--show-min': y === yearsWithBlur.min,
              'fm-year-month-picker__cell--show-max': y === yearsWithBlur.max
            }
          ]"
          @click.stop.prevent="select('year', y)"
        >
          {{ y }}
        </div>
      </div>
      <!-- @vue-ignore -->
      <div class="fm-year-month-picker__col" @scroll="onMonthColScrollDebounced">
        <div
          v-for="m in months"
          :key="m.value"
          :id="`m-${id}-${m.value}`"
          :class="[
            'fm-year-month-picker__cell',
            {
              'fm-year-month-picker__cell--active': m.value === month,
              'fm-year-month-picker__cell--show-min': m.value === monthsWithBlur.min,
              'fm-year-month-picker__cell--show-max': m.value === monthsWithBlur.max
            }
          ]"
          @click.stop.prevent="select('month', m.value)"
        >
          {{ m.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, watch } from 'vue';
  import debounce from 'lodash/debounce';
  import { getRandomString } from '@/utils';
  import { getMonths, getYearList } from './utils';
  import type { FmYearMonthPickerProps, FmYearMonthPickerEmits } from './types';

  const id = getRandomString(4);
  const itemHeight = 48;

  const props = withDefaults(defineProps<FmYearMonthPickerProps>(), {
    minYear: 1970,
    maxYear: 2020
  });

  const emits = defineEmits<FmYearMonthPickerEmits>();

  const year = ref(props.year);
  const month = ref(props.month);

  const months = getMonths().map((m, index) => ({
    title: m,
    value: index
  }));
  const years = computed(() => getYearList(props.minYear, props.maxYear));

  const cssItemHeight = computed(() => `${itemHeight}px`);

  const yearsWithBlur = computed(() => {
    const currentYearIndex = years.value.findIndex((y) => y === year.value);
    const minYearIndex = currentYearIndex - 2;
    const maxYearIndex = currentYearIndex + 2;
    return {
      min: minYearIndex < 0 ? null : years.value[minYearIndex],
      max: maxYearIndex > years.value.length - 1 ? null : years.value[maxYearIndex]
    };
  });
  const monthsWithBlur = computed(() => {
    const currentMonthIndex = months.findIndex((m) => m.value === month.value);
    const minMonthIndex = currentMonthIndex - 2;
    const maxMonthIndex = currentMonthIndex + 2;
    return {
      min: minMonthIndex < 0 ? null : months[minMonthIndex].value,
      max: maxMonthIndex > months.length - 1 ? null : months[maxMonthIndex].value
    };
  });

  // const yearValIndex = computed(() => years.value.findIndex((y) => y === year.value));
  // const monthValIndex = computed(() => months.findIndex((m) => m.value === month.value));
  // const cssYearOffset = computed(() => `${itemHeight * (-yearValIndex.value + 2)}px`);
  // const cssMonthOffset = computed(() => `${itemHeight * (-monthValIndex.value + 2)}px`);

  // function onYearColScroll(ev: WheelEvent) {
  //   let diff = 0;
  //
  //   if (ev.deltaY > itemHeight / 2 && yearValIndex.value < years.value.length - 1) {
  //     diff = 1;
  //   } else if (ev.deltaY < -itemHeight / 2 && yearValIndex.value > 0) {
  //     diff = -1;
  //   }
  //
  //   if (diff !== 0) {
  //     year.value = years.value[yearValIndex.value + diff];
  //     emits('update:year', year.value);
  //   }
  // }
  //
  // function onMonthColScroll(ev: WheelEvent) {
  //   let diff = 0;
  //
  //   if (ev.deltaY > itemHeight / 2 && monthValIndex.value < months.length - 1) {
  //     diff = 1;
  //   } else if (ev.deltaY < -itemHeight / 2 && monthValIndex.value > 0) {
  //     diff = -1;
  //   }
  //
  //   if (diff !== 0) {
  //     month.value = months[monthValIndex.value + diff].value;
  //     emits('update:month', month.value);
  //   }
  // }

  const onYearColScrollDebounced = debounce(onYearColScroll, 300);
  const onMonthColScrollDebounced = debounce(onMonthColScroll, 300);

  function scrollToElement(field: 'year' | 'month', val: number) {
    const cellId = `${field === 'year' ? 'y' : 'm'}-${id}-${val}`;
    const cellEl = document.getElementById(cellId);
    cellEl && cellEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  function select(field: 'year' | 'month', val: number) {
    switch (field) {
      case 'year':
        year.value = val;
        emits('update:year', year.value);
        break;
      case 'month':
        month.value = val;
        emits('update:month', month.value);
        break;
    }

    scrollToElement(field, val);
  }

  function onYearColScroll(ev: UIEvent) {
    // @ts-ignore
    const selectedItemIndex = Math.round(ev.target?.scrollTop / itemHeight);
    const selectedItem = years.value[selectedItemIndex];
    select('year', selectedItem);
  }

  function onMonthColScroll(ev: UIEvent) {
    // @ts-ignore
    const selectedItemIndex = Math.round(ev.target?.scrollTop / itemHeight);
    const selectedItem = months[selectedItemIndex];
    select('month', selectedItem.value);
  }

  onMounted(() => {
    scrollToElement('year', year.value);
    scrollToElement('month', month.value);
  });

  watch(
    () => props.year,
    (val, oldVal) => {
      if (val !== oldVal && val !== year.value) {
        year.value = val;
      }
    },
    { immediate: true }
  );

  watch(
    () => props.month,
    (val, oldVal) => {
      if (val !== oldVal && val !== month.value) {
        month.value = val;
      }
    },
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  .fm-year-month-picker {
    --fmYearMonthPicker-item-height: v-bind(cssItemHeight);
    --fmYearMonthPicker-font: var(--body-large-font);
    --fmYearMonthPicker-color: var(--on-surface);
    --fmYearMonthPicker-bg-active: var(--secondary);
    --fmYearMonthPicker-color-active: var(--on-secondary);

    position: relative;
    width: 100%;
    height: calc(var(--fmYearMonthPicker-item-height) * 5);

    &__block {
      position: absolute;
      left: var(--fmRimePicker-padding);
      width: 100%;
      height: var(--fmYearMonthPicker-item-height);

      &-center {
        top: calc(50% - calc(var(--fmYearMonthPicker-item-height) / 2));
        background-color: var(--fmYearMonthPicker-bg-active);
      }
    }

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
      padding-top: calc(var(--fmYearMonthPicker-item-height) * 2);
      padding-bottom: calc(var(--fmYearMonthPicker-item-height) * 2);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      scrollbar-width: none;
      scroll-behavior: smooth;
      overflow-y: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &__cell {
      position: relative;
      width: 100%;
      min-height: var(--fmYearMonthPicker-item-height);
      height: var(--fmYearMonthPicker-item-height);
      display: flex;
      justify-content: center;
      align-items: center;
      font: var(--fmYearMonthPicker-font);
      color: var(--fmYearMonthPicker-color);
      cursor: pointer;

      &--active {
        color: var(--fmYearMonthPicker-color-active);
        font-weight: 500;
      }

      &--show-min {
        color: transparent;
        background-clip: text;
        background-image: linear-gradient(to top, var(--fmYearMonthPicker-color), transparent);
      }

      &--show-max {
        color: transparent;
        background-clip: text;
        background-image: linear-gradient(to bottom, var(--fmYearMonthPicker-color), transparent);
      }
    }
  }
</style>
