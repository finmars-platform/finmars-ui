<template>
    <fm-tabs :tabs="tabsList">
        <template #default="{ activeTab }">
            <div v-if="activeTab.key === 'tab1'">TAB 1</div>
            <div v-else-if="activeTab.key === 'tab2'">TAB 2</div>
        </template>
    </fm-tabs>
</template>

<script setup>
    import FmTabs from "./components/fm/Tabs.vue";
    import {ref} from "vue";

    const tabsList = ref([
        {key: "tab1", name: "foo"},
        {key: "tab2", name: "bar"},
    ])
</script>