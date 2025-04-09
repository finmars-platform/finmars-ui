<template>
  <div
    v-if="show"
    ref="dialogOverlayElement"
    class="fm-dialog-overlay"
    @click.stop.prevent="startEmit('click-overlay', $event)"
  >
    <div
      :id="dialogProps?.id"
      ref="dialogElement"
      tabindex="1"
      :class="[
        'fm-dialog',
        { 'fm-dialog--draggable': dialogProps?.draggable && isMousedown },
        ...currentDialogProps.cssClass!
      ]"
      :style="cssStyle"
      v-on="
        dialogProps?.draggable
          ? {
              dragstart: onDragstart,
              mousedown: onMousedown,
              mouseup: onMouseup,
              mousemove: onMousemove,
              keydown: onKeydown
            }
          : {
              keydown: onKeydown
            }
      "
    >
      <div v-if="dialogProps?.draggable" class="fm-dialog__drag-icon">
        <FmIcon icon="mdi-dots-grid" />
      </div>

      <div v-if="currentDialogProps.title" class="fm-dialog__title" @click.stop>
        <span>{{ currentDialogProps.title }}</span>
      </div>

      <FmIconButton
        class="fm-dialog__close-btn"
        icon="mdi-close"
        variant="text"
        @click="closeDialog({ ev: $event })"
      />

      <div
        v-if="component"
        :class="['fm-dialog__content', ...currentDialogProps.contentCssClass!]"
        :style="currentDialogProps.contentCssStyle"
        @click.stop
      >
        <component
          :is="component"
          v-bind="componentProps as ExtractComponentProps<T>"
          @select="selectData"
          @validate="validate"
          @close="closeDialog({ ev: $event })"
          @confirm="startEmit('confirm')"
          @cancel="startEmit('cancel')"
        />
      </div>

      <div
        v-if="currentDialogProps.confirmButton || currentDialogProps.cancelButton"
        class="fm-dialog__actions"
        @click.stop
      >
        <FmButton
          v-if="currentDialogProps.cancelButton"
          :type="currentDialogProps.cancelButtonType"
          rounded
          @click="handleEvent($event, 'cancel')"
        >
          {{ currentDialogProps.cancelButtonText }}
        </FmButton>

        <FmButton
          v-if="currentDialogProps.confirmButton"
          :type="currentDialogProps.confirmButtonType"
          rounded
          :disabled="!isValid"
          @click="handleEvent($event, 'confirm')"
        >
          {{ currentDialogProps.confirmButtonText }}
        </FmButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup generic="T extends Component">
  import { type Component, computed, nextTick, onMounted, ref } from 'vue';
  import omit from 'lodash/omit';
  import FmIcon from '@/components/fm/Icon/Icon.vue';
  import FmButton from '@/components/fm/Button/Button.vue';
  import FmIconButton from '@/components/fm/IconButton/IconButton.vue';
  import type { ExtractComponentProps } from '@/types';
  import {
    FmDialogEvent,
    FmDialogComponentProps,
    FmDialogComponentEmits,
    FmDialogProps
  } from './types';
  import { determineWindowWidth } from './utils';

  const props = defineProps<FmDialogComponentProps<T>>();
  const emits = defineEmits<FmDialogComponentEmits>();

  const currentDialogProps = computed<FmDialogProps>(() => ({
    title: props.dialogProps?.title || '',
    cssClass: props.dialogProps?.cssClass || [],
    cssStyle: props.dialogProps?.cssStyle || {},
    width: props.dialogProps?.width
      ? props.dialogProps?.width
      : props.dialogProps?.cssStyle?.width
        ? props.dialogProps?.cssStyle?.width
        : 380,
    contentCssClass: props.dialogProps?.contentCssClass || [],
    contentCssStyle: props.dialogProps?.contentCssStyle || {},
    confirmButton: props.dialogProps?.confirmButton !== false,
    cancelButton: props.dialogProps?.cancelButton !== false,
    confirmButtonText: props.dialogProps?.confirmButtonText || 'Ok',
    cancelButtonText: props.dialogProps?.cancelButtonText || 'Cancel',
    confirmButtonType: props.dialogProps?.confirmButtonType || 'secondary',
    cancelButtonType: props.dialogProps?.cancelButtonType || 'secondary'
  }));

  const show = ref(true);
  const data = ref<unknown>(null);
  const isValid = ref(true);
  const dialogOverlayElement = ref<HTMLElement | null>(null);
  const dialogElement = ref<HTMLDivElement | null>(null);
  const isMousedown = ref(false);
  const dragData = ref({
    initialLeft: 0,
    initialTop: 0,
    left: 0,
    top: 0,
    shiftX: 0,
    shiftY: 0
  });

  const cssStyle = computed(() => ({
    width: determineWindowWidth({
      width: currentDialogProps.value.width,
      style: currentDialogProps.value.cssStyle
    }),
    ...omit(currentDialogProps.value.cssStyle, 'width'),
    ...(props.dialogProps?.draggable && {
      left: `${dragData.value.left}px`,
      top: `${dragData.value.top}px`
    })
  }));

  function selectData(value: unknown) {
    data.value = value;
    if (
      !currentDialogProps.value.confirmButton &&
      !currentDialogProps.value.cancelButton &&
      props.dialogProps?.onConfirm
    ) {
      props.dialogProps?.onConfirm(data.value);
      closeDialog();
    }
  }

  function validate(value: boolean) {
    isValid.value = value;
  }

  function onKeydown(ev: KeyboardEvent) {
    if (ev.code === 'Escape' && props.dialogProps?.closeOnEsc) {
      ev.stopPropagation();
      ev.preventDefault();
      startEmit('cancel');
    }
  }

  function closeDialog(arg?: { ev?: Event; withAction?: boolean }) {
    const { ev, withAction = true } = arg || {};
    if (ev) {
      ev.stopImmediatePropagation();
      ev.preventDefault();
    }
    show.value = false;
    props.dialogProps?.onClose && props.dialogProps.onClose();
    if (withAction) {
      emits('close');
    }
  }

  function startEmit(event: FmDialogEvent, ev?: Event) {
    if (event === 'click-overlay') {
      emits(event);
      props.dialogProps?.closeOnClickOverlay && closeDialog({ ev });
      return;
    }

    if (event === 'confirm') {
      props.dialogProps?.onConfirm && props.dialogProps.onConfirm(data.value);
      closeDialog();
    }

    if (event === 'cancel') {
      props.dialogProps?.onCancel && props.dialogProps.onCancel(data.value);
      closeDialog();
    }

    if (data.value) {
      // @ts-ignore
      emits(event, data.value);
    } else {
      // @ts-ignore
      emits(event);
    }
  }

  function handleEvent(event: Event, eventName: FmDialogEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();
    startEmit(eventName);
  }

  /* drag */
  function onDragstart() {
    return false;
  }

  function onMouseup() {
    isMousedown.value = false;
    dragData.value.shiftX = 0;
    dragData.value.shiftY = 0;
    return false;
  }

  function onMousedown(ev: MouseEvent) {
    isMousedown.value = true;
    const dialogElementRect = dialogElement.value!.getBoundingClientRect();
    dragData.value.shiftX = ev.clientX - dialogElementRect.left;
    dragData.value.shiftY = ev.clientY - dialogElementRect.top;
  }

  function onMousemove(ev: MouseEvent) {
    if (!isMousedown.value) {
      return;
    }
    dragData.value.left = ev.clientX - dragData.value.shiftX - dragData.value.initialLeft;
    dragData.value.top = ev.clientY - dragData.value.shiftY - dragData.value.initialTop;
  }

  onMounted(() => {
    if (dialogElement.value) {
      nextTick(() => {
        dialogElement.value!.focus();

        setTimeout(() => {
          const dialogClientRect = dialogElement.value!.getBoundingClientRect();
          dragData.value.initialLeft = dialogClientRect.left;
          dragData.value.initialTop = dialogClientRect.top;
        }, 100);
      });
    }
  });
</script>

<style lang="scss" scoped>
  .fm-dialog-overlay {
    position: fixed;
    z-index: 1000;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .fm-dialog {
    --fmDialog-border-radius: 28px;
    --fmDialog-bg-color: var(--surface-container-high);
    --fmDialog-title-padding: 24px 24px 16px 24px;
    --fmDialog-title-font: var(--headline-small-font);
    --fmDialog-title-font-color: var(--on-surface);
    --fmDialog-actions-padding: 24px;

    position: relative;
    display: flex;
    flex-direction: column;
    background-color: var(--fmDialog-bg-color);
    border-radius: var(--fmDialog-border-radius);
    outline: none;
    overflow: hidden;
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.3),
      0 4px 8px 3px rgba(0, 0, 0, 0.15);

    &.fm-dialog--draggable {
      cursor: move;
    }

    &__drag-icon {
      position: absolute;
      width: 24px;
      height: 24px;
      left: 2px;
      top: 2px;
      transform: rotate(45deg);
    }

    &__title {
      position: relative;
      width: 100%;
      padding: var(--fmDialog-title-padding);
      font: var(--fmDialog-title-font);
      color: var(--fmDialog-title-font-color);
    }

    &__close-btn {
      position: absolute;
      right: 4px;
      top: 4px;
      z-index: 5;
    }

    &__content {
      position: relative;
      width: 100%;
    }

    &__actions {
      position: relative;
      width: 100%;
      padding: var(--fmDialog-actions-padding);
      display: flex;
      justify-content: flex-end;
      align-items: center;
      column-gap: 8px;

      button {
        text-transform: none;
      }
    }
  }
</style>
