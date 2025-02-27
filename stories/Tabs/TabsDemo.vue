<template>
  <div class="relative">
    <div class="grid grid-cols-2 gap-8 mb-8">
      <FmTabs :tabs="data" @change-tab="handleTabChange" underline="thin" />
      <FmTabs :tabs="data" @change-tab="handleTabChange" underline="bold" />
      <FmTabs :tabs="data" @change-tab="handleTabChange" underline="thin" variant="large" />
      <FmTabs :tabs="data" @change-tab="handleTabChange" underline="bold" variant="large" />
      <FmTabs :tabs="data" @change-tab="handleTabChange" underline="thin" icon="mdi-home-account" />
      <FmTabs :tabs="data" @change-tab="handleTabChange" underline="bold" icon="mdi-home-account" />
      <FmTabs
        prependIcon
        :tabs="data"
        @change-tab="handleTabChange"
        underline="bold"
        icon="mdi-home-account"
      />
      <FmTabs
        prependIcon
        :tabs="data"
        @change-tab="handleTabChange"
        underline="thin"
        icon="mdi-home-account"
      />
      <FmTabs
        appendIcon
        :tabs="data"
        @change-tab="handleTabChange"
        underline="thin"
        icon="mdi-home-account"
        variant="large"
      />
      <FmTabs
        prependIcon
        :tabs="data"
        @change-tab="handleTabChange"
        underline="thin"
        icon="mdi-home-account"
        size="small"
        variant="large"
      />
    </div>

    <div class="relative">
      <FmTabs :tabs="data1" @change-tab="val1 = $event" underline="thin">
        <template #default="{ tabIndex, tabValue }">
          <div>
            <b>{{ tabIndex }}: </b>{{ tabValue }}
          </div>
        </template>
      </FmTabs>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import FmTabs from '@/components/fm/Tabs/Tabs.vue';

  const data = ref([{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }]);
  const data1 = [
    { label: 'Tab 1' },
    { label: 'Tab 2' },
    { label: 'Tab 3' },
    { label: 'Tab 4' },
    { label: 'Tab 5' },
    { label: 'Tab 6' },
    { label: 'Tab 7' },
    { label: 'Tab 8' },
    { label: 'Tab 9' },
    { label: 'Tab 10' },
    { label: 'Tab 11' },
    { label: 'Tab 12' },
    { label: 'Tab 13' },
    { label: 'Tab 14' },
    { label: 'Tab 15' },
    { label: 'Tab 16' },
    { label: 'Tab 17' },
    { label: 'Tab 18' },
    { label: 'Tab 19' }
  ];
  const val1 = ref(0);

  const handleTabChange = (event) => {
    console.log(`Event 'Tab change index' : ${event}`);
  };
</script>
