<template>
  <VTextField
    ref="vtf"
    v-bind="vTextFieldProps"
    v-maska="props.mask"
    class="fm-text-field"
    @click:clear="emits('click:clear', $event)"
    @click:control="onClickControl"
    @click:prepend-inner="onPrependClick"
    @focusin="emits('focus', $event)"
    @focusout="onBlur"
    @mousedown:control="emits('mousedown:control', $event)"
    @keydown.enter="onKeydownEnter"
    @update:model-value="onUpdate"
  >
    <template v-if="slots['append-inner']" #append-inner="{ isActive, isFocused, controlRef }">
      <VIcon v-if="showErrorIcon" icon="mdi-alert-circle" size="20" color="var(--error)" />

      <slot
        v-else
        name="append-inner"
        :is-active="isActive"
        :is-focused="isFocused"
        :control-ref="controlRef"
      />
    </template>

    <template v-if="slots['label']" #label="{ isActive, isFocused, controlRef }">
      <slot name="label" :is-active="isActive" :is-focused="isFocused" :control-ref="controlRef" />
    </template>

    <template v-if="slots['message']" #message="{ message }">
      <slot name="message" :message="message" />
    </template>

    <template #default>
      <slot />
    </template>
  </VTextField>
</template>

<script setup>
  import { computed, onMounted, ref, watch, useSlots } from 'vue';
  import { vMaska } from 'maska/vue';
  import { VIcon, VTextField } from 'vuetify/components';

  const props = defineProps({
    modelValue: {
      type: [String, Number]
    },
    type: {
      type: String,
      default: 'text'
    },
    active: {
      type: Boolean
    },
    autofocus: {
      type: Boolean
    },
    bgColor: {
      type: String
    },
    color: {
      type: String
    },
    id: {
      type: String
    },
    name: {
      type: [String, undefined]
    },
    compact: {
      type: Boolean
    },
    width: {
      type: [String, Number, undefined]
    },
    label: {
      type: [String, undefined]
    },
    placeholder: {
      type: [String, undefined]
    },
    persistentPlaceholder: {
      type: Boolean
    },
    hint: {
      type: [String, undefined]
    },
    appendIcon: {
      type: [String, undefined]
    },
    appendInnerIcon: {
      type: [String, undefined]
    },
    prependIcon: {
      type: [String, undefined]
    },
    outlined: {
      type: Boolean
    },
    hideDetails: {
      type: Boolean
    },
    mask: {
      type: [String, Object, undefined]
    },
    suffix: {
      type: String
    },
    messages: {
      type: [String, Array],
      default: () => []
    },
    rules: {
      type: Array,
      default: () => []
    },
    error: {
      type: Boolean
    },
    errorMessages: {
      type: [String, Array],
      default: () => []
    },
    focused: {
      type: Boolean
    },
    clearable: {
      type: Boolean
    },
    readonly: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    }
  });

  const emits = defineEmits([
    'click:clear',
    'click:control',
    'click:prependInner',
    'mousedown:control',
    'focus',
    'blur',
    'update:modelValue',
    'change',
    'init'
  ]);

  const slots = useSlots();

  const vtf = ref();
  const inputElement = ref();
  const dirty = ref(false);
  const innerValue = ref(props.modelValue);

  const vTextFieldProps = computed(() => ({
    color: props.color || 'var(--color-fmTextField)',
    bgColor:
      props.bgColor || props.outlined
        ? 'var(--backgroundColor-fmTextField-outlined)'
        : 'var(--backgroundColor-fmTextField)',
    density: props.compact ? 'compact' : 'default',
    modelValue: innerValue.value,
    active: props.active,
    autofocus: props.autofocus,
    type: props.type,
    ...(props.label && { label: props.label }),
    ...(props.placeholder && { placeholder: props.placeholder }),
    ...(props.hint && { hint: props.hint, persistentHint: true }),
    ...(props.prependIcon && { prependInnerIcon: props.prependIcon }),
    ...(props.clearable && { clearable: true, persistentClear: true }),
    persistentPlaceholder: props.persistentPlaceholder || (props.placeholder && props.outlined),
    appendIcon: props.appendIcon,
    appendInnerIcon: props.appendInnerIcon,
    width: props.width,
    variant: props.outlined ? 'outlined' : 'filled',
    hideDetails: props.hideDetails,
    messages: props.messages,
    id: props.id,
    name: props.name,
    suffix: props.suffix,
    rules: props.rules,
    error: !!props.error,
    errorMessages: props.errorMessages,
    focused: props.focused,
    clearable: !!props.clearable,
    readonly: props.readonly,
    disabled: !!props.disabled
  }));

  const showErrorIcon = computed(() => dirty.value && !vtf.value?.isValid);

  function onUpdate(val) {
    dirty.value = true;
    innerValue.value = val;
    emits('update:modelValue', val);
  }

  function onPrependClick(ev) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    emits('click:prependInner', ev);
  }

  function onClickControl(ev) {
    dirty.value = true;
    emits('click:control', ev);
  }

  function onKeydownEnter() {
    emits('change', innerValue.value);
  }

  function onBlur(ev) {
    emits('change', innerValue.value);
    emits('blur', ev);
  }

  onMounted(() => {
    inputElement.value = vtf.value.$el.querySelector('input');
    emits('init', { component: vtf.value, input: inputElement.value });
  });

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

<style scoped lang="scss">
  .fm-text-field {
    --color-fmTextField: var(--primary);
    --backgroundColor-fmTextField: var(--surface-container-highest);
    --backgroundColor-fmTextField-outlined: var(--surface);

    position: relative;

    :deep(.v-input__control) {
      .v-field.v-field--focused {
        .v-field__overlay {
          opacity: 0;
        }
      }

      .v-field__prepend-inner {
        color: var(--on-surface-variant);
      }

      .v-label {
        color: var(--on-surface-variant);
      }

      .v-field__input {
        color: var(--on-surface);
      }
    }

    :deep(.v-input__details) {
      .v-messages__message {
        color: var(--on-surface-variant);
      }
    }

    &.v-input--error {
      :deep(.v-input__details) {
        .v-messages__message {
          color: var(--error);
        }
      }
    }
  }
</style>
