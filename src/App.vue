<template>
    <div class="flex justify-end m-2">
        <fm-btn
            @click="toggleDarkMode"
            type="text"
        >
            {{ toggleText }}
        </fm-btn>
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import FmBtn from './components/fm/Btn.vue'
import FmIcon from './components/fm/Icon.vue'

const darkMode = ref(false);

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