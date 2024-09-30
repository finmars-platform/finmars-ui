<template>
    <div class="flex justify-end m-2">
        <div
            @click="toggleDarkMode"
        >
            {{ toggleText }}
        </div>

      <FmSearch :items="items" variant="solo" rounded />
    </div>

</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import { useTheme } from 'vuetify'

const darkMode = ref(false);
const theme = useTheme()
const items = [
  {
    prependIcon: 'mdi-clock-outline',
    title: 'recipe with chicken',
  },
  {
    prependIcon: 'mdi-clock-outline',
    title: 'best hiking trails near me',
  },
  {
    prependIcon: 'mdi-clock-outline',
    title: 'how to learn a new language',
  },
  {
    prependIcon: 'mdi-clock-outline',
    title: 'DIY home organization ideas',
  },
  {
    prependIcon: 'mdi-clock-outline',
    title: 'latest fashion trends',
  },
]

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
    theme.global.name.value = darkMode.value ? 'dark' : 'light'
}

onMounted(() => {
    darkMode.value = sessionStorage.getItem('darkMode') === 'true';
    updateBodyClass(darkMode.value);
});

</script>