<template>
    <div class="flex justify-end m-2">
        <fm-btn
            @click="toggleDarkMode"
            type="filled"
        >
            {{ toggleText }}
        </fm-btn>
    </div>

    <div class="w-[200px]">
        <base-input
            v-model="biErrorVal"
            label="Some"
            tooltip="Tooltip message"
            left-icon="settings"
            :error-data="{key: 'error-key', message: 'lorem ipsoum dolor sit amet lorem ipsoum dolor sit amet lorem ipsoum dolor sit amet', longMessage: 'Testing error tooltip'}"
        >
            <template #right>
<!--                <fm-icon-btn icon="delete" />
                <fm-icon-btn icon="edit" />-->
                <base-input-btn icon="delete" />
                <base-input-btn icon="edit" />
            </template>
        </base-input>

        <base-input
            label="Another"
            left-icon="edit"
            tooltip="Tooltip message"
            v-model="biValue"
            disabled
        />
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import FmBtn from './components/fm/Btn.vue';
import BaseInput from './components/base/input/index.vue'
import FmIcon from './components/fm/Icon.vue'
import FmIconBtn from './components/fm/IconBtn.vue'
import BaseInputBtn from './components/base/input/Btn.vue'

const darkMode = ref(false);

const biValue = ref("");
const biErrorVal = ref("");

function updateBodyClass(isDark) {
    if (isDark) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}

const toggleText = computed(() => !darkMode.value ? 'Enable Dark Theme' : 'Disable Dark Theme');

function toggleDarkMode() {
    darkMode.value = !darkMode.value;
    updateBodyClass(darkMode.value);
    sessionStorage.setItem('darkMode', darkMode.value ? 'true' : 'false');
}

onMounted(() => {
    darkMode.value = sessionStorage.getItem('darkMode') === 'true';
    updateBodyClass(darkMode.value);
});

</script>