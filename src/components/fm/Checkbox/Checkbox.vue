<template>
  <VCheckbox
    :label="label"
    :modelValue="modelValue"
    :value="value"
    :color="color"
    :disabled="disabled"
    :base-color="baseColor"
    :indeterminate="indeterminate"
    density="compact"
    class="fm-checkbox"
    @update:modelValue="(newVal) => emit('update:modelValue', newVal)"
    hide-details
  />
</template>

<script setup>
  import { VCheckbox } from 'vuetify/components';
  import { computed } from 'vue';

  const props = defineProps({
    modelValue: {
      type: Boolean
    },
    label: {
      type: String
    },
    indeterminate: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    error: {
      type: Boolean
    },
    value: {
      default: true
    }
  });

  const emit = defineEmits(['update:modelValue']);

  const color = computed(() => {
    if (props.error) {
      return 'var(--backgroundColor-error-checkbox)';
    } else if (props.disabled) {
      return undefined;
    } else {
      return 'var(--backgroundColor-checkbox)';
    }
  });

  const baseColor = computed(() => {
    if (props.error) {
      return 'var(--backgroundColor-error-checkbox)';
    } else if (props.disabled) {
      return undefined;
    } else {
      return 'var(--borderColor-checkbox)';
    }
  });
</script>

<style lang="scss" scoped>
  .fm-checkbox {
    --fmCheckbox-size: 28px;
    --backgroundColor-checkbox: var(--primary);
    --backgroundColor-error-checkbox: var(--error);
    --borderColor-checkbox: var(--secondary);
    --fmCheckbox-color: var(--on-surface);

    min-width: var(--fmCheckbox-size);

    :deep(.v-input__control) {
      min-width: var(--fmCheckbox-size);

      .v-checkbox-btn {
        min-height: 28px;

        .v-label {
          font-size: 14px;
          color: var(--fmCheckbox-color);
        }
      }

      .v-selection-control {
        .v-selection-control__wrapper {
          min-width: var(--fmCheckbox-size);
        }
      }
    }
  }
</style>
