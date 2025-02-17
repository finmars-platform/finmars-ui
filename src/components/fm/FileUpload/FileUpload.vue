<template>
  <template v-if="type === 'task'">
    <div
      v-if="!taskObj"
      class="drop-box"
      :class="[{ disable: isDisableUpload }, { 'drag-over': isDragging }]"
      @dragover.prevent="onDragOver"
      @dragleave="onDragLeave"
      @drop.prevent="onDrop"
    >
      <span class="drop-text">Drop file to upload</span>
      <span>or</span>
      <div>
        <FmButton type="primary" rounded @click="browseFile" :loading="isDisableUpload">
          {{ label }}
        </FmButton>
        <input
          ref="fileInputRef"
          type="file"
          class="hidden-input"
          accept=".fcfg, .cfg, .zip"
          :multiple="false"
          @change="handleTaskFileChange($event)"
        />
      </div>
    </div>
    <div v-else class="progress-state">
      <div v-if="!taskObj.progress_object && taskObj.status === 'P'">
        <span>Import in progress ...</span>
      </div>
      <template v-else>
        <div v-if="taskObj.status === 'P'" class="progress-p">
          <div class="progress-count">
            <span>Progress:</span>
            <span
              >{{ taskObj.progress_object?.current }} / {{ taskObj.progress_object?.total }}</span
            >
          </div>
          <div class="progress-linear">
            <FmProgressLinear :model-value="taskObj.progress_object?.percent" />
          </div>
          <div>Status:</div>
          <div class="progress-object-description">
            {{ taskObj.progress_object?.description }}
          </div>
          <span class="progress-info-status-text"
            >You can leave this page, the import will continue anyway.</span
          >
        </div>
        <div v-if="taskObj.status === 'D'" class="progress-d">
          <div class="done-title">
            <FmIcon icon="mdi-checkbox-marked-circle-outline" size="28" color="#02a471" />
            <span>Import Complete.</span>
          </div>
          <div class="done-actions">
            <FmButton type="secondary" @click="showDetails" rounded>Show Details</FmButton>
            <FmButton type="primary" @click="clearAllFiles" rounded>Ok</FmButton>
          </div>
        </div>
        <div v-if="taskObj.status === 'E'" class="progress-e">
          <span>Import not complete.</span>
          <FmButton type="primary" @click="importNewFile" rounded>Import New file</FmButton>
        </div>
      </template>
    </div>
  </template>

  <template v-else>
    <div class="upload-button-wrap">
      <FmButton type="primary" @click="browseFile" rounded>
        {{ label }}
        <template #prepend>
          <FmIcon :icon="icon" :size="variant === 'normal' ? 'small' : 'normal'" color="" />
        </template>
      </FmButton>
      <input
        type="file"
        ref="fileInputRef"
        @change="handleFileChange($event)"
        :multiple="multiple"
        hidden
      />
    </div>
    <Teleport to="body">
      <div class="upload-process-panel" v-if="files.length">
        <div class="header">
          <span class="header-title">
            Uploading {{ files.length }}
            {{ files.length === 1 ? 'item' : 'items' }}
          </span>
          <div class="header-actions">
            <FmIcon
              @click="toggleUploadPanel"
              :icon="isUploadPanelOpen ? 'mdi-chevron-down' : 'mdi-chevron-up'"
            />
            <FmDialog @is-confirm="confirm" :title="dialogTitle" :content="dialogContent" />
          </div>
        </div>
        <transition name="slide">
          <div class="body scroll-variant-thin" v-if="isUploadPanelOpen">
            <FmFileUploadProcessing
              v-for="file in files"
              :key="file.id"
              :file="file"
              :indeterminate="indeterminate"
              @remove-file="removeFile"
            />
          </div>
        </transition>
      </div>
    </Teleport>
  </template>
</template>

<script setup lang="ts">
  import FmProgressLinear from '@/components/fm/ProgressLinear/ProgressLinear.vue';
  import FmFileUploadProcessing from '@/components/fm/FileUpload/FileUploadProcessing.vue';
  import FmIcon from '@/components/fm/Icon/Icon.vue';
  import FmDialog from '@/components/fm/FileUpload/Dialog.vue';
  import FmButton from '@/components/fm/Button/Button.vue';
  import { FmFileUploadProps, FmTaskObject, FmUploadFile } from './types';
  import { reactive, ref, watch } from 'vue';
  import { getRandomString } from '@/utils';

  const props = withDefaults(defineProps<FmFileUploadProps>(), {
    icon: 'mdi-file-upload-outline',
    variant: 'normal',
    label: 'Upload file',
    dialogTitle: 'Cancel uploading',
    dialogContent: 'Are you sure that you want to cancel uploading files?',
    type: 'simple',
    taskObject: null,
    multiple: true,
    indeterminate: false
  });

  const isUploadPanelOpen = ref<boolean>(true);
  const fileInputRef = ref<HTMLInputElement | null>(null);
  const files = ref<FmUploadFile[]>([]);
  const totalSize = ref<number>(0);
  const isDragging = ref<boolean>(false);
  const isDisableUpload = ref<boolean>(false);
  const taskObj = ref<FmTaskObject | null>(null);
  let fileDataList = reactive<FmUploadFile[]>([]);

  const emit = defineEmits([
    'updateFiles',
    'showDetails',
    'incorrectCount',
    'incorrectFile',
    'importNewFile'
  ]);

  const onDragOver = (event: DragEvent) => {
    if (event?.dataTransfer?.items && event?.dataTransfer?.items?.length > 1) {
      event.preventDefault();
      return;
    }
    isDragging.value = true;
  };

  const onDragLeave = () => {
    isDragging.value = false;
  };

  const addListeners = (reader: FileReader, uniqueId: string) => {
    const file = fileDataList.find((item) => item.id === uniqueId);
    if (file) {
      const updateProgress = (event: ProgressEvent) => {
        if (event.lengthComputable) {
          totalSize.value = event.total || totalSize.value;

          file.progress = parseInt(((event.loaded / totalSize.value) * 100).toFixed(2));
        }
      };
      reader.addEventListener('loadstart', (event) => updateProgress(event));
      reader.addEventListener('load', (event) => updateProgress(event));
      reader.addEventListener('loadend', () => (file.progress = 100));
      reader.addEventListener('progress', (event) => updateProgress(event));
    }
  };

  const generateFile = (data: FileList) => {
    Array.from(data).forEach((file) => {
      const uniqueId = getRandomString(6);
      if (!files.value.some((f) => f.id === uniqueId)) {
        const item = {
          id: uniqueId,
          file: file,
          progress: 0
        };
        fileDataList.push(item);
        const reader = new FileReader();
        addListeners(reader, uniqueId); // Attach progress listeners
        reader.readAsDataURL(file); // Read the file as Data URL
        files.value.push(item); // Add the file to the list
      }
    });
    emit('updateFiles', files.value);
  };

  const isValidateSelectedTaskFile = (file: File) => {
    const allowedMimeTypes = [
      'application/zip', // for .zip files
      'application/octet-stream' // for .fcfg and .cfg files
    ];

    return allowedMimeTypes.includes(file.type);
  };

  const onDrop = (event: DragEvent) => {
    const filesDropped = event.dataTransfer?.files;

    if (!filesDropped || filesDropped.length === 0) {
      isDragging.value = false;
      return;
    }

    if (filesDropped.length > 1) {
      emit('incorrectCount');
      event.preventDefault();
      isDragging.value = false;
      return;
    }

    const result = isValidateSelectedTaskFile(filesDropped[0]);
    if (!result) {
      emit('incorrectFile');
      event.preventDefault();
      isDragging.value = false;
      return;
    }
    isDisableUpload.value = true;
    generateFile(filesDropped);
  };

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      isDisableUpload.value = true;
      generateFile(input.files);
    }
  };

  const handleTaskFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;

    if (input && input.files) {
      if (input.files.length > 1) {
        emit('incorrectCount');
        event.preventDefault();
        isDragging.value = false;
        return;
      }

      const result = isValidateSelectedTaskFile(input.files[0]);

      if (!result) {
        emit('incorrectFile');
        event.preventDefault();
        isDragging.value = false;
        return;
      }
      isDisableUpload.value = true;
      generateFile(input.files);
    }
  };

  const browseFile = () => {
    if (fileInputRef) {
      fileInputRef.value?.click();
    }
  };

  const showDetails = () => {
    if (taskObj.value) {
      emit('showDetails', taskObj.value);
    }
  };

  const clearAllFiles = () => {
    files.value = [];
    fileDataList.splice(0, fileDataList.length);
    taskObj.value = null;
    isDragging.value = false;
    isDisableUpload.value = false;
    emit('updateFiles', files.value);
  };

  const importNewFile = () => {
    fileInputRef.value = null;
    clearAllFiles();
    browseFile();
  };

  const removeFile = (fileId: string) => {
    files.value = files.value.filter((file) => file.id !== fileId);
    const index = fileDataList.findIndex((fileData) => fileData.id === fileId);
    if (index !== -1) {
      fileDataList.splice(index, 1); // Remove the fileData reactively
    }
    emit('updateFiles', files.value);
  };

  const toggleUploadPanel = () => {
    isUploadPanelOpen.value = !isUploadPanelOpen.value;
  };

  const confirm = (action = false) => {
    if (action) {
      clearAllFiles();
    }
  };

  watch(
    () => props.taskObject,
    (newVal) => {
      if (newVal) {
        taskObj.value = newVal;
        isDisableUpload.value = false;
      }
    },
    { deep: true, immediate: true }
  );
</script>

<style scoped lang="scss">
  .drop-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-16);
    width: 100%;
    height: 100%;
    border: 6px dashed var(--outline-variant);
    transition: 0.3s ease-in-out;
    cursor: pointer;

    &.drag-over {
      border-color: var(--primary);
    }

    &.disable {
      pointer-events: none;
      opacity: 0.6;
    }

    .drop-text {
      font-size: 20px;
    }
  }

  .hidden-input {
    display: none;
  }

  .progress-state {
    width: 100%;
    height: 100%;
    border: 2px solid var(--outline-variant);
    padding: var(--spacing-8);

    .progress-p {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      height: 100%;

      .progress-count {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }

      .progress-object-description {
        width: 100%;
        font-size: var(--spacing-16);
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .progress-info-status-text {
        font-style: italic;
        font-size: var(--spacing-12);
        color: var(--inverse-surface);
      }
    }

    .progress-d {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      gap: var(--spacing-24);

      .done-title {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        gap: var(--spacing-8);
      }

      .done-actions {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        gap: var(--spacing-8);
      }
    }

    .progress-e {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-24);
    }
  }

  .upload-button-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: nowrap;
    cursor: pointer;
  }

  .body {
    max-height: 360px;
    overflow-y: auto;
    width: 100%;
  }

  .upload-process-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    right: 20px;
    width: 20%;
    min-width: 420px;
    color: var(--on-surface);
    border-top-left-radius: var(--spacing-24);
    border-top-right-radius: var(--spacing-24);
    background-color: var(--surface-container-high);
    padding: var(--spacing-24) var(--spacing-16) 0 var(--spacing-16);

    .header {
      width: 100%;
      margin-bottom: var(--spacing-16);
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      gap: var(--spacing-16);

      .header-title {
        color: var(--on-surface);
        font-size: var(--spacing-16);
      }

      .header-actions {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        gap: var(--spacing-8);
      }
    }
  }

  /* Transition styles */
  .slide-enter-active,
  .slide-leave-active {
    transition:
      max-height 0.2s ease,
      opacity 0.2s ease;
    overflow: hidden;
  }

  .slide-enter-from,
  .slide-leave-to {
    max-height: 0;
    opacity: 0;
  }

  .slide-enter-to,
  .slide-leave-from {
    max-height: 360px;
    opacity: 1;
  }
</style>
