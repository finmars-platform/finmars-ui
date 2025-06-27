<template>
  <div>
    <h4 class="mb-4 text-h4">Single select</h4>

    <FmItemPicker
      class="mb-10"
      v-model="val"
      :attributes="attributes"
      :suggested="[]"
      v-on="eventHandlers"
    />

    <h4 class="mb-4 text-h4">Multiple select, 'add' mode (default)</h4>

    <FmItemPicker
      class="mb-10"
      v-model="val2"
      height="580"
      multiple
      :attributes="attributes"
      :suggested="[]"
      v-on="eventHandlers"
    />

    <h4 class="mb-4 text-h4">Multiple select, 'update' mode, allow select as suggested</h4>

    <FmItemPicker
      v-model="val3"
      multiple
      mode="update"
      height="360"
      :attributes="attributes"
      :suggested="[]"
      allow-suggested
      v-on="eventHandlers"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import cloneDeep from 'lodash/cloneDeep';
  import FmItemPicker from '@/components/fm/ItemPicker/ItemPicker/ItemPicker.vue';
  import { presetFilters, mockData, mockAttrs } from '../_Data/filters-mock-data.js';
  import { mockAttrs1 } from '../_Data/mock.data.js';

  const eventHandlers = {
    close: () => console.log("'close' event"),
    'update:modelValue': (ev) => console.log("'update:modelValue' event:", ev),
    'update:suggested': (ev) => console.log("'update:suggested' event:", ev)
  };

  const attributes = cloneDeep(mockData.attributes);
  const attrs = cloneDeep(mockAttrs1);

  const val = ref([]);
  const val2 = ref(cloneDeep(presetFilters.map((i) => i.key)));
  const val3 = ref(cloneDeep(presetFilters.map((i) => i.key)));
</script>
