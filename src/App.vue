<template>
    <div class="flex justify-end m-2">
        <fm-btn
            @click="toggleDarkMode"
            type="filled"
        >
            {{ toggleText }}
        </fm-btn>
    </div>

    <fm-input-textarea
        label="Testing"
        :model-value="someRef"
        rows="12"
        resize="both"
        @update:modelValue="testingFn"
        class="w-96"
    />
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';

const someRef = ref("");

const testingFn = function (newVal) {
    someRef.value = newVal;
    console.log("testing ", newVal, someRef.value);
};

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