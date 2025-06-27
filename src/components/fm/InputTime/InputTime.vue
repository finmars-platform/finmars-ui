<template>
  <FmMenu
    v-model="isMenuOpen"
    offset="4"
    :close-on-content-click="false"
    :disabled="disabled"
    scroll-strategy="block"
  >
    <template #activator="{ props }">
      <FmButton v-bind="props" type="secondary" rounded>
        {{ modelValue || placeholder || '-- : --' }}
      </FmButton>
    </template>

    <FmTimePicker
      :model-value="modelValue"
      :minutes-step="minutesStep"
      :size="size"
      @update:model-value="update"
    />
  </FmMenu>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import FmButton from '../Button/Button.vue';
  import FmTimePicker from '../TimePicker/TimePicker.vue';
  import FmMenu from '../Menu/Menu.vue';
  import type { FmInputTimeProps, FmInputTimeEmits } from './types';

  defineProps<FmInputTimeProps>();
  const emits = defineEmits<FmInputTimeEmits>();

  const isMenuOpen = ref(false);

  function update(value: string) {
    emits('update:modelValue', value);
  }
</script>

<style lang="scss">
  .v-overlay-container {
    .v-overlay.v-menu {
      .v-overlay__content {
        border-radius: 28px !important;

        & > div {
          padding: 0 !important;
          border-radius: 28px !important;
        }
      }
    }
  }
</style>
