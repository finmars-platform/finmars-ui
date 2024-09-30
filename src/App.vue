<template>
	<div class="flex justify-end m-2">
		<div @click="toggleDarkMode">
			{{ toggleText }}
		</div>

		<FMImg
			:width="213"
			aspect-ratio="16/9"
			cover
			src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
		/>
	</div>
</template>

<script setup>
	import { computed, onMounted, ref } from 'vue'
	import { useTheme } from 'vuetify'
	import FMImg from './components/fm/Img/Img.vue'

	const darkMode = ref(false)
	const theme = useTheme()

	function updateBodyClass(isDark) {
		if (isDark) {
			document.body.classList.add('dark')
		} else {
			document.body.classList.remove('dark')
		}
	}

	const toggleText = computed(() =>
		!darkMode.value ? 'Enable Dark Theme' : 'Disable Dark Theme'
	)

	function toggleDarkMode() {
		darkMode.value = !darkMode.value
		updateBodyClass(darkMode.value)
		sessionStorage.setItem('darkMode', darkMode.value ? 'true' : 'false')
		theme.global.name.value = darkMode.value ? 'dark' : 'light'
	}

	onMounted(() => {
		darkMode.value = sessionStorage.getItem('darkMode') === 'true'
		updateBodyClass(darkMode.value)
	})
</script>
