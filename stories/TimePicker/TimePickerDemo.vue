<template>
  <div>
    <div class="relative w-full flex justify-start items-start gap-2">
      <div class="relative w-[400px] h-[400px]">
        <FmTimePicker v-model="val1" />
      </div>

      <div class="relative w-[400px] h-[400px]">
        <div class="mb-4 font-bold">RESULT:</div>
        <div class="relative w-full whitespace-pre-wrap">{{ val1 }}</div>
      </div>
    </div>

    <div class="relative w-full flex justify-start items-start gap-2">
      <div class="relative w-[400px] h-[400px]">
        <FmTimePicker v-model="val2" :minutes-step="15" />
      </div>

      <div class="relative w-[400px] h-[400px]">
        <div class="mb-4 font-bold">RESULT:</div>
        <div class="relative w-full whitespace-pre-wrap">{{ val2 }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import FmTimePicker from '@/components/fm/TimePicker/TimePicker.vue';

  const val1 = ref('15:30');
  const val2 = ref(null);
</script>
