<template>
  <div>
    <div class="relative flex justify-start items-start gap-2 mb-[32px]">
      <div class="relative w-[300px]">
        <FmButton rounded @click="openDialog">Open dialog1</FmButton>
      </div>

      <div class="relative w-[600px]">
        <i>Default</i>
        <div class="flex justify-start items-start gap-2">
          <b>dialogProps:</b>
          <span>title,</span>
          <span>closeOnEsc</span>
        </div>
      </div>
    </div>

    <div class="relative flex justify-start items-start gap-2 mb-[32px]">
      <div class="relative w-[300px]">
        <FmButton rounded @click="openDialog2">Open dialog2</FmButton>
      </div>

      <div class="relative w-[600px]">
        <i>Default, emits data from dialog</i>
        <div class="flex justify-start items-start gap-2">
          <b>dialogProps:</b>
          <span>title</span>
        </div>
      </div>
    </div>

    <div class="relative flex justify-start items-start gap-2 mb-[32px]">
      <div class="relative w-[300px]">
        <FmButton rounded @click="openDialog3">Open dialog2</FmButton>
      </div>

      <div class="relative w-[600px]">
        <i>Default, emits data from dialog</i>
        <div class="flex justify-start items-start gap-2">
          <b>dialogProps:</b>
          <span>title,</span>
          <span>draggable,</span>
          <span>confirmButtonText,</span>
          <span>closeOnEsc</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineAsyncComponent, inject } from 'vue';
  import { FM_DIALOGS_KEY, type FmDialogsPlugin } from '../../src/plugins/dialogs/types';
  import FmButton from '../../src/components/fm/Button/Button.vue';
  import type { Nullable } from '../../src/types';

  const dialogs = inject<FmDialogsPlugin>(FM_DIALOGS_KEY)!;

  function openDialog() {
    const component = defineAsyncComponent(() => import('./TestDialog1.vue'));
    dialogs.$openDialog<typeof component>({
      component,
      componentProps: {
        text: `A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made.`
      },
      dialogProps: {
        title: 'The test dialog1 title',
        closeOnEsc: true,
        closeOnClickOverlay: true,
        onConfirm: () => {
          console.log('The user click the "Confirm" button');
        },
        onCancel: () => {
          console.log('The user click the "Cancel" button');
        },
        onClose: () => {
          console.log('The dialog was closed!');
        }
      }
    });
  }

  function openDialog2() {
    const component = defineAsyncComponent(() => import('./TestDialog2.vue'));
    dialogs.$openDialog<typeof component>({
      component,
      componentProps: {
        name: 'Work'
      },
      dialogProps: {
        title: 'Rename folder name',
        onConfirm: (val: Nullable<{ oldName: string; newName: string }>) => {
          if (!val) return;

          const { oldName, newName } = val;
          console.log('The user click the "Confirm" button');
          console.log(`old name: ${oldName}, newName: ${newName}`);
        },
        onCancel: () => {
          console.log('The user click the "Cancel" button');
        },
        onClose: () => {
          console.log('The dialog was closed!');
        }
      }
    });
  }

  function openDialog3() {
    const component = defineAsyncComponent(() => import('./TestDialog2.vue'));
    dialogs.$openDialog<typeof component>({
      component,
      componentProps: {
        name: 'Work'
      },
      dialogProps: {
        title: 'Rename folder name',
        draggable: true,
        confirmButtonText: 'Rename',
        closeOnEsc: true,
        onConfirm: (val: Nullable<{ oldName: string; newName: string }>) => {
          if (!val) return;

          const { oldName, newName } = val;

          console.log('The user click the "Confirm" button');
          console.log(`old name: ${oldName}, newName: ${newName}`);
        },
        onCancel: () => {
          console.log('The user click the "Cancel" button');
        },
        onClose: () => {
          console.log('The dialog was closed!');
        }
      }
    });
  }
</script>
