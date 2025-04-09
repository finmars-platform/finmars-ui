<template>
  <div class="fm-transfer-list">
    <h4 class="fm-transfer-list__title">{{ title }}</h4>

    <div class="fm-transfer-list__body">
      <div class="fm-transfer-list__part">
        <h4 class="fm-transfer-list__part-title">
          {{ locals?.available }}
        </h4>

        <div class="fm-transfer-list__part-body">
          <FmTextField
            class="fm-transfer-list__search"
            v-model="searchText.available"
            compact
            clearable
            :placeholder="locals.placeholder"
            hide-details
            @click:clear="searchText.available = ''"
            @click.stop.prevent
          />

          <div class="fm-transfer-list__part-content">
            <div
              v-for="(item, index) in availableOptionsFiltered"
              :key="index"
              :class="[
                'fm-transfer-list__part-item',
                {
                  'fm-transfer-list__part-item--highlighted': isOptionsHighlighted(
                    'available',
                    item
                  )
                }
              ]"
              @click.stop.prevent="onItemClick('available', item)"
            >
              {{ getOptionTitle(item) }}
            </div>
          </div>
        </div>
      </div>

      <div class="fm-transfer-list__actions">
        <FmIconButton
          icon="mdi-chevron-right"
          variant="text"
          :disabled="isEmpty(highlightedOptions.available)"
          @click.stop.prevent="onBtnClick('right')"
        />
        <FmIconButton
          icon="mdi-chevron-double-right"
          variant="text"
          :disabled="isEmpty(options)"
          @click.stop.prevent="onBtnClick('doubleRight')"
        />
        <FmIconButton
          icon="mdi-chevron-left"
          variant="text"
          :disabled="isEmpty(highlightedOptions.selected)"
          @click.stop.prevent="onBtnClick('left')"
        />
        <FmIconButton
          icon="mdi-chevron-double-left"
          variant="text"
          :disabled="isEmpty(selectedOptions)"
          @click.stop.prevent="onBtnClick('doubleLeft')"
        />
      </div>

      <div class="fm-transfer-list__part">
        <h4 class="fm-transfer-list__part-title">
          {{ locals?.selected }}
        </h4>

        <div class="fm-transfer-list__part-body">
          <FmTextField
            class="fm-transfer-list__search"
            v-model="searchText.selected"
            compact
            clearable
            :placeholder="locals.placeholder"
            hide-details
            @click:clear="searchText.selected = ''"
            @click.stop.prevent
          />

          <div class="fm-transfer-list__part-content">
            <div
              v-for="(item, index) in selectedOptionsFiltered"
              :key="index"
              :class="[
                'fm-transfer-list__part-item',
                {
                  'fm-transfer-list__part-item--highlighted': isOptionsHighlighted('selected', item)
                }
              ]"
              @click.stop.prevent="onItemClick('selected', item)"
            >
              {{ getOptionTitle(item) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fm-transfer-list__control">
      <FmButton rounded type="secondary" @click.stop.prevent="end">
        {{ locals.cancelBtn }}
      </FmButton>
      <FmButton rounded :disabled="!isDirty" @click.stop.prevent="save">
        {{ locals.saveBtn }}
      </FmButton>
    </div>
  </div>
</template>

<script lang="ts" setup generic="T extends any, K extends string & keyof T">
  import { computed, ref, type Ref, watch } from 'vue';
  import cloneDeep from 'lodash/cloneDeep';
  import isEmpty from 'lodash/isEmpty';
  import FmButton from '../Button/Button.vue';
  import FmIconButton from '../IconButton/IconButton.vue';
  import FmTextField from '../TextField/TextField.vue';
  import type { FmTransferListProps, FmTransferListEmits } from './types';

  const props = withDefaults(defineProps<FmTransferListProps<T, K>>(), {
    width: '620',
    height: '360',
    optionTitleKey: 'title',
    optionValueKey: 'value',
    locals: {
      // @ts-ignore
      available: 'Available',
      selected: 'Selected',
      placeholder: 'Search for ...',
      cancelBtn: 'Close',
      saveBtn: 'Save'
    }
  });
  const emits = defineEmits<FmTransferListEmits<T>>();

  const isDirty = ref(false);

  const searchText = ref({
    available: '',
    selected: ''
  });

  const highlightedOptions = ref({
    available: [],
    selected: []
  }) as Ref<{
    available: Array<T | T[K]>;
    selected: Array<T | T[K]>;
  }>;

  const selectedOptions = ref([]) as Ref<T[]>;
  const selectedOptionsFiltered = computed(() =>
    selectedOptions.value.filter((o) =>
      getOptionTitle(o).toLowerCase().includes(searchText.value.selected.toLowerCase())
    )
  );
  const selectedOptionsValues = computed(() => selectedOptions.value.map((o) => getOptionValue(o)));

  const availableOptions = computed(() =>
    (props.options || []).filter((o) => !selectedOptionsValues.value.includes(getOptionValue(o)))
  );
  const availableOptionsFiltered = computed(() =>
    availableOptions.value.filter((o) =>
      getOptionTitle(o).toLowerCase().includes(searchText.value.available.toLowerCase())
    )
  );

  const widthValue = computed(() => {
    if (typeof props.width === 'string') {
      return ['auto', '100%'].includes(props.width) ? props.width : `${props.width}px`;
    }
    return `${props.width}px`;
  });

  const heightValue = computed(() => {
    if (typeof props.height === 'string') {
      return ['auto', '100%'].includes(props.height) ? props.height : `${props.height}px`;
    }
    return `${props.height}px`;
  });

  function getOptionTitle(item: T): string {
    if (!props.optionAsObject && typeof item !== 'object') {
      return item as string;
    }

    return item[props.optionTitleKey as K] as string;
  }

  function getOptionValue(item: T) {
    if (!props.optionAsObject && typeof item !== 'object') {
      return item;
    }

    return item[props.optionValueKey as K];
  }

  function isOptionsHighlighted(part: 'available' | 'selected', item: T) {
    const value = getOptionValue(item);
    return highlightedOptions.value[part].includes(value);
  }

  function onItemClick(part: 'available' | 'selected', item: T) {
    const value = getOptionValue(item);
    const index = highlightedOptions.value[part].findIndex((v) => v === value);
    if (index === -1) {
      highlightedOptions.value[part].push(value);
    } else {
      highlightedOptions.value[part].splice(index, 1);
    }
  }

  function onBtnClick(btn: 'left' | 'doubleLeft' | 'right' | 'doubleRight') {
    isDirty.value = true;
    switch (btn) {
      case 'left':
        highlightedOptions.value.available = [];
        highlightedOptions.value.selected.forEach((val) => {
          const index = selectedOptions.value.findIndex((o) => getOptionValue(o) === val);
          if (index !== -1) {
            selectedOptions.value.splice(index, 1);
          }
        });
        highlightedOptions.value.selected = [];
        break;
      case 'doubleLeft':
        clear(false);
        break;
      case 'right':
        highlightedOptions.value.selected = [];
        highlightedOptions.value.available.forEach((val) => {
          if (!selectedOptionsValues.value.includes(val)) {
            const option = availableOptions.value.find((o) => getOptionValue(o) === val);
            option && selectedOptions.value.push(option);
          }
        });
        highlightedOptions.value.available = [];
        break;
      case 'doubleRight':
        selectedOptions.value = cloneDeep(props.options);
        highlightedOptions.value.selected = [];
        highlightedOptions.value.available = [];
        break;
    }
  }

  function clear(touchDirty = true) {
    touchDirty && (isDirty.value = false);
    searchText.value = {
      available: '',
      selected: ''
    };
    selectedOptions.value = [];
    highlightedOptions.value = {
      available: [],
      selected: []
    };
  }

  function end() {
    emits('end');
    clear();
  }

  function save() {
    emits('change', selectedOptions.value);
    end();
  }

  watch(
    () => props.selected,
    () => {
      selectedOptions.value = cloneDeep(props.selected || []);
    },
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  .fm-transfer-list {
    --fmTransferList-width: v-bind(widthValue);
    --fmTransferList-height: v-bind(heightValue);
    --fmTransferList-bgColor: var(--surface-container);
    --fmTransferList-color: var(--on-surface);

    position: relative;
    width: var(--fmTransferList-width);
    height: var(--fmTransferList-height);
    border-radius: 4px;
    padding: 16px;
    background-color: var(--fmTransferList-bgColor);
    color: var(--fmTransferList-color);

    &__title {
      font-size: 14px;
      font-weight: 600;
      line-height: 18px;
      text-align: center;
      margin-bottom: 8px;
    }

    &__body {
      display: flex;
      justify-content: center;
      align-items: stretch;
      height: calc(100% - 80px);
    }

    &__search {
      --backgroundColor-fmTextField: var(--surface-container);
    }

    &__part {
      display: flex;
      flex-direction: column;
      width: 45%;

      &-title {
        font-size: 14px;
        font-weight: 500;
        line-height: 18px;
        text-align: center;
        margin-bottom: 8px;
      }

      &-body {
        position: relative;
        width: 100%;
        height: calc(100% - 26px);
        border-radius: 4px;
        border: 1px solid var(--outline);
      }

      &-content {
        position: relative;
        width: 100%;
        height: calc(100% - 40px);
        overflow-y: auto;
      }

      &-item {
        position: relative;
        width: 100%;
        height: 32px;
        padding: 0 8px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;
        cursor: pointer;
        margin-bottom: 2px;

        &--highlighted {
          background-color: var(--secondary-container);
        }
      }
    }

    &__actions {
      display: flex;
      width: 10%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &__control {
      display: flex;
      column-gap: 16px;
      justify-content: flex-end;
      align-items: center;
      padding-top: 16px;
    }
  }
</style>
