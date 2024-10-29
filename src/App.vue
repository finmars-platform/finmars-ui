<template>
	<div class="layout">
		<Header />
		<div class="flex">
			<NavigationPortal />
			<div class="page">
				<div @click="toggleDarkMode">
					{{ toggleText }}
				</div>
				<div class="flex-col"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { computed, onMounted, ref } from 'vue'
	import { useTheme } from 'vuetify'
	import Header from '~/stories/Header.vue'
	import NavigationPortal from '@/components/fm/Navigation/NavigationPortal.vue'

	const darkMode = ref(false)
	const theme = useTheme()

	function updateBodyClass(isDark) {
		if (isDark) {
			document.body.classList.add('dark')
			document.body.classList.add('dark-theme')
			document.body.classList.remove('light-theme')
		} else {
			document.body.classList.add('light-theme')
			document.body.classList.remove('dark')
			document.body.classList.remove('dark-theme')
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
