<template>
  <div ref="wrapElement" v-resize="checkAbilityToShowRightBtnDebounced" class="fm-filter-toolbar">
    <div
      ref="toolbarElement"
      v-mutate.child.immediate="onToolbarElementChange"
      :class="['fm-filter-toolbar__body', { 'fm-filter-toolbar__body--expandable': expandable }]"
    >
      <FmIconButton
        :icon="areLinkedFiltersShowed ? 'mdi-link' : 'mdi-link-off'"
        :variant="areLinkedFiltersShowed ? 'flat' : 'text'"
        @click.prevent.stop="toggleDisplaying"
      />

      <template v-if="areLinkedFiltersShowed && !isEmpty(linkedFilters)">
        <FmChip
          v-for="linkedFilter in linkedFilters"
          :key="linkedFilter.key"
          :id="`${id}-${linkedFilter.key}`"
          prepend-icon="mdi-link"
          closable
          :type="linkedFilter.options.enabled ? 'standard' : 'outlined'"
          :value="linkedFilter.name"
          :tooltip="getFilterTooltip(linkedFilter)"
          @click="editFilter($event, linkedFilter)"
          @click:close="deleteFilter(linkedFilter.key)"
        />
      </template>

      <template v-if="!isEmpty(notLinkedFilters)">
        <FmChip
          v-for="filter in notLinkedFilters"
          :key="filter.key"
          :id="`${id}-${filter.key}`"
          closable
          :type="filter.options.enabled ? 'standard' : 'outlined'"
          :value="filter.name"
          :tooltip="getFilterTooltip(filter)"
          @click="editFilter($event, filter)"
          @click:close="deleteFilter(filter.key)"
        />
      </template>

      <FmButton
        type="secondary"
        rounded
        class="fm-filter-toolbar__add-btn"
        @init="addBtnElement = $event"
      >
        Add filter

        <FmMenu
          v-model="isAddFilterModalOpen"
          activator="parent"
          :close-on-content-click="false"
          scroll-strategy="block"
          :disabled="disabled"
        >
          <FmItemPicker
            :model-value="selectedAttrs"
            :attributes="attributes"
            :suggested="suggestedAttrs"
            @close="isAddFilterModalOpen = false"
            @update:model-value="updateFilter"
            @update:suggested="updateSuggestedAttrs"
          />
        </FmMenu>
      </FmButton>
    </div>

    <div
      v-if="showScrollBtns && showScrollLeftBtn"
      class="fm-filter-toolbar__btn-left"
      @click.prevent.stop="shiftRight"
    >
      <FmIcon v-ripple.center.circle icon="mdi-chevron-left" size="24" color="var(--primary)" />
    </div>

    <div
      v-if="showScrollBtns && showScrollRightBtn"
      class="fm-filter-toolbar__btn-right"
      @click.prevent.stop="shiftLeft"
    >
      <FmIcon v-ripple.center.circle icon="mdi-chevron-right" size="24" color="var(--primary)" />
    </div>

    <FmMenu
      v-model="filterEditModalSettings.open"
      :activator="toolbarElement!"
      :target="[filterEditModalSettings.x, filterEditModalSettings.y]"
      :close-on-content-click="false"
      scroll-strategy="block"
      width="500"
    >
      <FmFilterEditor
        :value="selectedFilter!"
        :get-filter-options="getFilterOptions"
        :get-source-linked-groups="getSourceLinkedGroups"
        :get-source-linked-group-attributes="getSourceLinkedGroupAttributes"
        @cancel="filterEditModalSettings.open = false"
        @update:model-value="onFilterUpdate"
      />
    </FmMenu>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, watch } from 'vue';
  import get from 'lodash/get';
  import isEmpty from 'lodash/isEmpty';
  import cloneDeep from 'lodash/cloneDeep';
  import difference from 'lodash/difference';
  import debounce from 'lodash/debounce';
  import omit from 'lodash/omit';
  import { Mutate, Resize, Ripple } from 'vuetify/directives';
  import { getRandomString } from '@/utils';
  import FmChip from '../../Chip/Chip.vue';
  import FmButton from '../../Button/Button.vue';
  import FmIcon from '../../Icon/Icon.vue';
  import FmIconButton from '../../IconButton/IconButton.vue';
  import FmMenu from '../../Menu/Menu.vue';
  import FmItemPicker from '../../ItemPicker/ItemPicker/ItemPicker.vue';
  import FmFilterEditor from '../FilterEditor/FilterEditor.vue';
  import { FmFilter, FmFilterRangeValues } from '@/types';
  import type { FmtFilterToolbarProps, FmtFilterToolbarEmits } from './types';

  const vMutate = Mutate;
  const vResize = Resize;
  const vRipple = Ripple;

  const props = withDefaults(defineProps<FmtFilterToolbarProps>(), {
    id: getRandomString(3),
    value: () => [],
    attributes: () => [],
    suggestedAttrs: () => []
  });
  const emits = defineEmits<FmtFilterToolbarEmits>();

  const areLinkedFiltersShowed = ref(props.showLinkedFilters);
  const isAddFilterModalOpen = ref(false);
  const filterEditModalSettings = ref({
    open: false,
    x: 0,
    y: 0
  });

  const wrapElement = ref<HTMLDivElement | null>(null);
  const toolbarElement = ref<HTMLDivElement | null>(null);
  const addBtnElement = ref<HTMLElement | null>(null);
  const showScrollBtns = ref(false);

  const newFilters = ref<FmFilter[]>([]);

  const childElements = ref<HTMLCollection | null>(null);
  const currentChildIndex = ref(0);
  const toolbarOffsetX = ref(0);

  const selectedAttrs = computed(() => props.value.map((f) => f.key).sort());

  const linkedFilters = computed(() =>
    (props.value || []).filter((f) => !isEmpty(get(f, ['options', 'use_from_above'])))
  );
  const notLinkedFilters = computed(() =>
    (props.value || []).filter((f) => isEmpty(get(f, ['options', 'use_from_above'])))
  );

  const toolbarOffsetXValue = computed(() => `${toolbarOffsetX.value}px`);
  const showScrollLeftBtn = computed(() => currentChildIndex.value !== 0);
  const showScrollRightBtn = ref(true);

  const selectedFilter = ref<FmFilter | null>(null);

  function toggleDisplaying() {
    areLinkedFiltersShowed.value = !areLinkedFiltersShowed.value;
  }

  function getFilterTooltip(filter: FmFilter): string {
    const { filter_type, filter_values } = filter.options;
    if (!['from_to', 'out_of_range'].includes(filter_type)) {
      return `${filter.name}: ${(filter_values as string[])?.join(', ')}`;
    }

    return `${filter.name}: ${(filter_values as FmFilterRangeValues).min_value} - ${(filter_values as FmFilterRangeValues).max_value}`;
  }

  async function updateFilter(attrKeys: string[]) {
    const sortedAttrKeys = cloneDeep(attrKeys).sort();
    const newAttrKeys = difference(sortedAttrKeys, selectedAttrs.value);
    newFilters.value = [];
    for (const key of newAttrKeys) {
      const attr = props.attributes.find((a) => a.key === key);
      if (attr) {
        newFilters.value.push({
          isNew: true,
          content_type: (attr.content_type ?? '') as string,
          key: attr.key,
          name: attr.name,
          layout_name: attr.layout_name,
          value_type: attr.value_type as number | 'field',
          options: {
            enabled: true,
            filter_type: 'equal',
            filter_values: []
          }
        });
      }
    }

    if (!isEmpty(newFilters.value)) {
      const newFilter = newFilters.value[0];
      editFilter({ element: addBtnElement.value! }, newFilter);
    }
  }

  function updateSuggestedAttrs(attrs: string) {
    emits('update:suggested', attrs);
  }

  function onToolbarElementChange() {
    showScrollBtns.value =
      toolbarElement.value!.offsetWidth > wrapElement.value!.offsetWidth - 2 * 40;

    childElements.value = toolbarElement.value!.children;
    checkAbilityToShowRightBtn();
  }

  function shiftLeft() {
    const el = childElements.value![currentChildIndex.value] as HTMLElement;
    toolbarOffsetX.value -= el.offsetWidth + 16;
    currentChildIndex.value += 1;
    checkAbilityToShowRightBtn();
  }

  function shiftRight() {
    if (currentChildIndex.value === 1) {
      toolbarOffsetX.value = 0;
      currentChildIndex.value = 0;
    } else {
      currentChildIndex.value -= 1;
      const el = childElements.value![currentChildIndex.value] as HTMLElement;
      toolbarOffsetX.value += el.offsetWidth + 16;
    }
    checkAbilityToShowRightBtn();
  }

  function checkAbilityToShowRightBtn() {
    const rectWrapElement = wrapElement.value?.getBoundingClientRect();
    if (rectWrapElement) {
      showScrollRightBtn.value = !(
        rectWrapElement.x + rectWrapElement.width >
        toolbarElement.value!.offsetWidth + toolbarOffsetX.value
      );
    }
  }

  const checkAbilityToShowRightBtnDebounced = debounce(checkAbilityToShowRightBtn, 300);

  function editFilter({ element }: { event?: MouseEvent; element: HTMLElement }, filter: FmFilter) {
    const chipElRect = element.getBoundingClientRect();
    selectedFilter.value = cloneDeep(filter);
    filterEditModalSettings.value = {
      open: true,
      x: chipElRect.x,
      y: chipElRect.y + chipElRect.height + 2
    };
  }

  function deleteFilter(key: string) {
    const value = cloneDeep(props.value);
    const ind = value.findIndex((f) => f.key === key);
    if (ind > -1) {
      filterEditModalSettings.value = {
        open: false,
        x: 0,
        y: 0
      };

      value.splice(ind, 1);
      emits('update:modelValue', value);
    }
  }

  function onFilterUpdate(updatedFilter: FmFilter) {
    const updatedValue = cloneDeep(props.value);
    if (updatedFilter.isNew) {
      updatedValue.push(omit(updatedFilter, 'isNew'));
    } else {
      const updatedFilterIndex = updatedValue.findIndex((f) => f.key === updatedFilter.key);
      if (updatedFilterIndex > -1) {
        updatedValue[updatedFilterIndex] = updatedFilter;
        emits('update:modelValue', updatedValue);
      }
    }

    emits('update:modelValue', updatedValue);
    newFilters.value = [];
  }

  onMounted(() => {
    childElements.value = toolbarElement.value!.children;
  });

  watch(
    () => filterEditModalSettings.value.open,
    (val, oVal) => {
      if (val !== oVal && !val) {
        filterEditModalSettings.value.x = 0;
        filterEditModalSettings.value.y = 0;
        selectedFilter.value = null;
      }
    }
  );

  defineExpose({
    filterAddBtn: addBtnElement,
    editFilter
  });
</script>

<style lang="scss">
  .v-overlay-container {
    .v-overlay.v-menu {
      .v-overlay__content {
        border-radius: 28px;

        & > div {
          padding: 0 !important;
          margin-top: 4px;
          border-radius: 28px !important;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .fm-filter-toolbar {
    --fmFilterToolbar-background-color: var(--surface);

    position: relative;
    width: 100%;
    padding: 8px 20px;
    background-color: var(--fmFilterToolbar-background-color);
    overflow: hidden;

    &__body {
      position: relative;
      width: max-content;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      column-gap: 16px;
      transition: all 0.2s ease-in-out;
      left: v-bind(toolbarOffsetXValue);

      :deep(.v-btn--variant-text) {
        .v-icon {
          color: var(--on-surface-variant) !important;
        }
      }

      :deep(.v-btn--variant-flat) {
        background-color: var(--secondary-container) !important;

        .v-icon {
          color: var(--primary) !important;
        }
      }

      &--expandable {
        width: 100%;
        flex-wrap: wrap;
        row-gap: 16px;
      }
    }

    &__add-btn {
      text-transform: none;
      padding: 0 12px;
    }

    &__btn-left,
    &__btn-right {
      position: absolute;
      top: 8px;
      height: 40px;
      width: 180px;
      z-index: 1;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    &__btn-left {
      left: 0;
      padding-left: 12px;
      justify-content: flex-start;
      background: linear-gradient(
        to right,
        var(--fmFilterToolbar-background-color) 20%,
        transparent
      );
    }

    &__btn-right {
      right: 0;
      padding-right: 12px;
      justify-content: flex-end;
      background: linear-gradient(
        to left,
        var(--fmFilterToolbar-background-color) 20%,
        transparent
      );
    }
  }
</style>
