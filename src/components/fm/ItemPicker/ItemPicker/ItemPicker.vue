<template>
  <div class="fm-item-picker" @keydown="onKeydown">
    <div class="fm-item-picker__header">
      <FmTextField
        v-model="searchText"
        :placeholder="locals.searchPlaceholder"
        autofocus
        prepend-icon="mdi-magnify"
        hide-details
        clearable
      />
    </div>

    <div
      :class="[
        'fm-item-picker__body',
        {
          'fm-item-picker--multiple': multiple,
          'fm-item-picker--no-result': !isEmpty(searchText) && !filteredAttributes.length
        }
      ]"
    >
      <div v-if="!isEmpty(searchText) && !filteredAttributes.length" class="fm-item-picker--empty">
        {{ locals.noResultText }}
      </div>

      <template v-else>
        <div class="fm-item-picker__list">
          <FmItemPickerList
            :categories="categories"
            :current-category="selectedCategory"
            :selected-category-name="locals.selectedLabel!"
            :selected-count="multiple ? size(selectedItems) : 0"
            @select:category="selectedCategory = $event"
          />
        </div>

        <div class="fm-item-picker__content">
          <FmItemPickerSearchResult
            v-if="
              selectedCategory === locals.searchResultCategoryLabel && filteredAttributes.length
            "
            :search-text="searchText ?? ''"
            :items="filteredAttributes"
            :initial-selected-items="initialSelectedItems"
            :selected-items="selectedItems"
            :multiple="multiple"
            :mode="mode"
            @select="select"
          />

          <FmItemPickerContent
            v-else
            :multiple="multiple"
            :mode="mode"
            :category="selectedCategory"
            :attributes="currentCategoryAttrs"
            :suggested="suggested!"
            :selected="selectedItems"
            :initial-selected="initialSelectedItems"
            :locals="{
              suggested: locals.suggestedLabel!,
              selected: locals.selectedLabel!
            }"
            @update:model-value="select"
            @update:suggested="emits('update:suggested', $event)"
          />
        </div>
      </template>
    </div>

    <div v-if="multiple" class="fm-item-picker__actions">
      <FmButton type="secondary" rounded @click="emits('close')">
        {{ locals.cancelBtn }}
      </FmButton>

      <FmButton rounded :disabled="addBtnDisabled" @click="updateValue">
        {{ mode === 'add' ? locals.addBtn : locals.updateBtn }}
      </FmButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ComputedRef, ref, watch } from 'vue';
  import cloneDeep from 'lodash/cloneDeep';
  import set from 'lodash/set';
  import isEmpty from 'lodash/isEmpty';
  import size from 'lodash/size';
  import has from 'lodash/has';
  import type { FmItemPickerProps, FmItemPickerEmits } from './types';
  import { prepareSpecialGroup } from '../utils';
  import FmTextField from '../../TextField/TextField.vue';
  import FmButton from '../../Button/Button.vue';
  import FmItemPickerList from '../ItemPickerList/ItemPickerList.vue';
  import FmItemPickerSearchResult from '../ItemPickerSearchResult/ItemPickerSearchResult.vue';
  import FmItemPickerContent from '../ItemPickerContent/ItemPickerContent.vue';
  import type { FmAttribute } from '@/types';
  import type { FmAttributeGroup } from '@/components/fm/ItemPicker/ItemPickerContent/types';

  interface FmAttributeList {
    [key: string]: FmAttribute | FmAttributeList;
  }

  const props = withDefaults(defineProps<FmItemPickerProps>(), {
    mode: 'add',
    width: 700,
    height: 420,
    locals: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      searchPlaceholder: 'Search',
      noResultText: 'No results',
      suggestedLabel: 'Suggested',
      selectedLabel: 'Selected',
      searchResultCategoryLabel: 'All categories',
      cancelBtn: 'Cancel',
      addBtn: 'Add',
      updateBtn: 'Update'
    }
  });
  const emits = defineEmits<FmItemPickerEmits>();

  const searchText = ref('');

  const initialSelectedItems = ref(cloneDeep(props.modelValue) || []);
  const selectedItems = ref(cloneDeep(props.modelValue));

  const widthValue = computed(() => {
    if (['auto', '100%'].includes(props.width as string)) {
      return props.width;
    }

    return `${props.width}px`;
  });
  const heightValue = computed(() => {
    if (['auto', '100%'].includes(props.height as string)) {
      return props.height;
    }

    return `${props.height}px`;
  });

  const filteredAttributes = computed(() =>
    (props.attributes || []).filter((a) => {
      if (!searchText.value) {
        return true;
      }

      const processedName = a.name.split('. ');
      const name = processedName.pop();
      return name ? name.toLocaleLowerCase().includes(searchText.value.toLocaleLowerCase()) : true;
    })
  );

  const suggestedItemOnTree = computed(() =>
    prepareSpecialGroup(props.suggested, props.attributes)
  );

  const selectedItemOnTree = computed(() =>
    prepareSpecialGroup(selectedItems.value, props.attributes)
  );

  const otherItemsOnTree = computed(() =>
    (filteredAttributes.value || []).reduce(
      (acc, attr) => {
        const { name, key } = attr;
        const processedName = name.split('. ');
        set(acc, [...processedName.slice(0, -1), key], attr);
        return acc;
      },
      {} as Record<string, FmAttribute & { shortName?: string }>
    )
  );

  const categories = computed(() => {
    const value = [];
    if (!isEmpty(props.suggested) && !searchText.value) {
      value.push(props.locals.suggestedLabel);
    }

    if (!isEmpty(selectedItems.value) && !searchText.value) {
      value.push(props.locals.selectedLabel);
    }

    if (searchText.value) {
      value.push(props.locals.searchResultCategoryLabel);
    }

    const otherItemsCategories = Object.keys(otherItemsOnTree.value).sort((a, b) =>
      a > b ? 1 : -1
    );

    return [...value, ...otherItemsCategories];
  }) as ComputedRef<string[]>;

  const itemTree = computed(() => ({
    ...(categories.value.includes(props.locals!.suggestedLabel!) && {
      [props.locals!.suggestedLabel!]: suggestedItemOnTree.value
    }),
    ...(categories.value.includes(props.locals!.selectedLabel!) && {
      [props.locals!.selectedLabel!]: selectedItemOnTree.value
    }),
    ...otherItemsOnTree.value
  })) as ComputedRef<Record<string, FmAttribute | FmAttributeList>>;

  const processedItemTree = computed(() =>
    Object.keys(itemTree.value).reduce(
      (res, name) => {
        const isGroup = isItemGroup(itemTree.value[name]);
        if (isGroup) {
          res[name] = {
            name,
            key: `${name}-0`,
            itemType: 'group',
            content: processGroup(itemTree.value[name] as FmAttributeList, 0)
          };
        }

        return res;
      },
      {} as Record<string, FmAttributeGroup>
    )
  );

  const selectedCategory = ref<string>('');

  const currentCategoryAttrs = computed(() => {
    if (!selectedCategory.value) {
      return undefined;
    }

    return processedItemTree.value[selectedCategory.value]?.content;
  }) as ComputedRef<Record<string, FmAttributeGroup> | undefined>;

  const addBtnDisabled = computed(() => false);

  function isItemGroup(item: FmAttributeList | FmAttribute) {
    return !(has(item, 'key') && has(item, 'value_type'));
  }

  function processGroup(
    group: FmAttributeList,
    level: number
  ): Record<string, FmAttributeGroup | FmAttribute> {
    return Object.keys(group).reduce(
      (res, key) => {
        const isGroup = isItemGroup(group[key]);
        if (isGroup) {
          res[key] = {
            name: key,
            key: `${key}-${level + 1}`,
            itemType: 'group',
            content: processGroup(group[key] as FmAttributeList, level + 1)
          };
        } else {
          res[key] = group[key] as FmAttribute;
        }

        return res;
      },
      {} as Record<string, FmAttributeGroup | FmAttribute>
    );
  }

  function onKeydown(ev: KeyboardEvent) {
    // ev.preventDefault()
    ev.stopImmediatePropagation();
    const { code } = ev;
    // @ts-ignore
    const isDesiredKey = [
      'ArrowDown',
      'ArrowUp',
      'ArrowLeft',
      'ArrowRight',
      'Enter',
      'Space'
    ].includes(code);
  }

  function updateValue() {
    emits('update:modelValue', selectedItems.value);
    emits('close');
  }

  function select(attrKey: string) {
    if (!props.multiple) {
      selectedItems.value = [attrKey];
      updateValue();
      return;
    }

    const attrIndex = selectedItems.value.findIndex((key) => key === attrKey);
    if (attrIndex === -1) {
      selectedItems.value.push(attrKey);
    } else {
      selectedItems.value.splice(attrIndex, 1);
    }
  }

  watch(
    () => searchText.value,
    () => {
      const currentCategoryIndex = categories.value.indexOf(selectedCategory.value);
      selectedCategory.value =
        currentCategoryIndex !== -1
          ? (categories.value[currentCategoryIndex] as string)
          : (categories.value[0] as string);
    },
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  .fm-item-picker {
    --fmItemPicker-color: var(--on-surface);
    --fmItemPicker-background-color: var(--surface-container-high);
    --fmItemPicker-height: v-bind(heightValue);
    --fmItemPicker-list-width: 212px;
    --fmItemPicker-actions-heigh: 88px;
    --fmItemPicker-border-radius: 28px;

    position: relative;
    width: v-bind(widthValue);
    min-height: var(--fmItemPicker-height);
    height: var(--fmItemPicker-height);
    border-radius: var(--fmItemPicker-border-radius);
    background-color: var(--fmItemPicker-background-color);
    color: var(--fmItemPicker-color);
    overflow: hidden;
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.3),
      0 4px 8px 3px rgba(0, 0, 0, 0.15);

    &__header {
      position: relative;

      :deep(.fm-text-field) {
        --backgroundColor-fmTextField: var(--surface-container-high);
      }
    }

    &__body {
      position: relative;
      width: 100%;
      height: calc(100% - 60px);
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      padding-bottom: var(--spacing-8);

      &.fm-item-picker--multiple {
        height: calc(100% - 56px - var(--fmItemPicker-actions-heigh));
      }

      &.fm-item-picker--no-result {
        justify-content: center;
      }
    }

    &__list {
      position: relative;
      width: var(--fmItemPicker-list-width);
      padding-right: var(--spacing-4);
      overflow: hidden;
    }

    &__content {
      position: relative;
      width: calc(100% - var(--fmItemPicker-list-width));
      overflow-x: hidden;
      overflow-y: auto;
    }

    &--empty {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--spacing-16);
      font: var(--body-large-font);
      color: var(--fmItemPicker-color);
    }

    &__actions {
      position: relative;
      width: 100%;
      height: var(--fmItemPicker-actions-heigh);
      display: flex;
      justify-content: flex-end;
      align-items: center;
      column-gap: var(--spacing-16);
      padding: 0 24px;
      border-top: 1px solid var(--outline-variant);
    }
  }
</style>
