<template>
  <div class="fm-pagination">
    <div class="fm-pagination__info">
      <span v-if="withInfo" class="fm-pagination__info-text">
        {{ infoText }}
      </span>
    </div>

    <div class="fm-pagination__actions">
      <FmButton
        type="secondary"
        class="btn mr-1"
        :disabled="currentPage === 1 || disabled"
        @click="onCLickControlButton('first')"
      >
        <VIcon icon="mdi-page-first" size="24" color="var(--iconColor-fmPagination)" />
      </FmButton>

      <FmButton
        type="secondary"
        class="btn mr-1"
        :disabled="currentPage === 1 || disabled"
        @click="onCLickControlButton('prev')"
      >
        <VIcon icon="mdi-chevron-left" size="24" color="var(--iconColor-fmPagination)" />
      </FmButton>

      <span class="fm-pagination__actions-text">
        {{ locals?.page }}
      </span>

      <FmButton type="secondary" class="btn mx-2" :disabled="disabled">
        {{ currentPage }}

        <FmMenu
          activator="parent"
          :items="pages"
          item-size="small"
          content-class="fm-pagination-menu"
          :disabled="disabled"
        >
          <div class="fm-pagination__menu scroll-variant-thin">
            <div
              v-for="item in pages"
              :key="item"
              class="fm-pagination__menu-item"
              @click="changePage(item)"
            >
              {{ item }}
            </div>
          </div>
        </FmMenu>

        <template #append>
          <VIcon icon="mdi-menu-down" size="16" color="var(--iconColor-fmPagination)" />
        </template>
      </FmButton>

      <span class="fm-pagination__actions-text"> {{ locals?.of }}&nbsp;{{ totalPages }} </span>

      <FmButton
        type="secondary"
        class="btn ml-1"
        :disabled="currentPage === totalPages || disabled"
        @click="onCLickControlButton('next')"
      >
        <VIcon icon="mdi-chevron-right" size="24" color="var(--iconColor-fmPagination)" />
      </FmButton>

      <FmButton
        type="secondary"
        class="btn ml-1"
        :disabled="currentPage === totalPages || disabled"
        @click="onCLickControlButton('last')"
      >
        <VIcon icon="mdi-page-last" size="24" color="var(--iconColor-fmPagination)" />
      </FmButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { VIcon } from 'vuetify/components';
  import FmButton from '../Button/Button.vue';
  import FmMenu from '../Menu/Menu.vue';
  import type { FmPaginationProps, FmPaginationEmits } from './types';

  const props = withDefaults(defineProps<FmPaginationProps>(), {
    modelValue: 1,
    itemsPerPage: 10,
    totalItems: 0,
    withInfo: true,
    locals: {
      // @ts-ignore
      of: 'of',
      entities: 'entities',
      page: 'Page'
    }
  });

  const emits = defineEmits<FmPaginationEmits>();

  const currentPage = ref(props.modelValue);

  const totalPages = computed(() => {
    if (!props.itemsPerPage) {
      return 0;
    }

    return Math.ceil(props.totalItems / props.itemsPerPage);
  });

  const pages = computed(() => {
    if (!totalPages.value) {
      return [];
    }

    return Array(totalPages.value)
      .fill(0)
      .map((_, index) => index + 1);
  });

  const infoText = computed(() => {
    const from = (currentPage.value - 1) * props.itemsPerPage + 1;
    const to = currentPage.value * props.itemsPerPage;

    return `${from}-${to <= props.totalItems ? to : props.totalItems} ${props.locals?.of} ${props.totalItems ?? 0} ${props.locals?.entities}`;
  });

  function changePage(val: number) {
    currentPage.value = val;
    emits('update:modelValue', currentPage.value);
  }

  function onCLickControlButton(button: 'first' | 'last' | 'prev' | 'next') {
    switch (button) {
      case 'first':
        changePage(1);
        emits('first', 1);
        break;
      case 'last':
        changePage(totalPages.value);
        emits('last', totalPages.value);
        break;
      case 'prev':
        if (currentPage.value > 1) {
          changePage(currentPage.value - 1);
          emits('prev', currentPage.value);
        }
        break;
      case 'next':
        if (currentPage.value < totalPages.value) {
          changePage(currentPage.value + 1);
          emits('next', currentPage.value);
        }
        break;
    }
  }

  watch(
    [() => props.totalItems, () => props.itemsPerPage, () => props.modelValue],
    ([totalItems, itemsPerPage, modelValue], [totalItemsOld, itemsPerPageOld, modelValueOld]) => {
      const isTotalValueChanged = totalItemsOld !== totalItems;
      const isPerPageValueChanged = itemsPerPageOld !== itemsPerPage;
      const isValueChanged = modelValueOld !== modelValue;

      if (
        ((isTotalValueChanged && totalItemsOld !== 0) ||
          (isPerPageValueChanged && itemsPerPageOld !== 0)) &&
        !isValueChanged &&
        currentPage.value !== 1
      ) {
        currentPage.value = 1;
        emits('update:modelValue', 1);
      }

      if (
        isValueChanged &&
        currentPage.value !== modelValue &&
        modelValue > 0 &&
        modelValue <= totalPages.value
      ) {
        currentPage.value = modelValue;
      }
    }
  );
</script>

<style lang="scss" scoped>
  .fm-pagination {
    --height-fmPagination: 64px;
    --backgroundColor-fmPagination: var(--surface);
    --color-fmPagination: var(--on-surface);
    --iconColor-fmPagination: var(--primary);
    --itemColorHover-fmPagination: var(--surface-container-highest);

    display: flex;
    width: 100%;
    height: var(--height-fmPagination);
    padding: 0 16px;
    justify-content: space-between;
    align-items: center;
    background-color: var(--backgroundColor-fmPagination);

    &__info {
      position: relative;
      width: max-content;

      &-text {
        font: var(--label-large-font);
        color: var(--color-fmPagination);
      }
    }

    &__actions {
      display: flex;
      width: max-content;
      justify-content: center;
      align-items: center;

      &-text {
        font: var(--label-large-font);
        color: var(--color-fmPagination);
      }
    }

    &__menu {
      --itemColorHover-fmPagination: var(--surface-container-highest);

      position: relative;
      width: 40px;
      max-height: 160px;
      padding: 4px 0;
      border-radius: 4px;
      overflow-y: auto;

      &-item {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 32px;
        font: var(--label-large-font);
        cursor: pointer;

        &:hover {
          background-color: var(--itemColorHover-fmPagination);
        }
      }
    }
  }

  .btn {
    min-width: 0 !important;
    padding: 0 4px !important;
  }
</style>
