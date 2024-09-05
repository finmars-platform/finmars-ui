<template>
    <div class="flex justify-end m-2">
        <fm-btn
            @click="toggleDarkMode"
            type="filled"
        >
            {{ toggleText }}
        </fm-btn>
    </div>

    <fm-input-text
        label="test"
        :model-value="inputVal" @update:modelValue="onModelValChange"
        :error-data="errorData"
    />

</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import FmBtn from './components/fm/Btn.vue';
import FmInputText from './components/fm/input/Text.vue';

const darkMode = ref(false);

function onModelValChange(newVal) {
    inputVal.value = newVal;
    console.log("testing onModelValChange inputVal.value", inputVal.value);
}

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