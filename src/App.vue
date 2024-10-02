<template>
	<div class="flex justify-end m-2">
		<div @click="toggleDarkMode">
			{{ toggleText }}
		</div>
		<div class="flex-col">
			<div class="flex">
				<FmIconButton size="small" icon="mdi-plus" />
				<FmIconButton icon="mdi-plus" />
			</div>
			<div class="flex">
				<FmIconButton variant="tonal" size="small" icon="mdi-plus" />
				<FmIconButton variant="tonal" icon="mdi-plus" />
			</div>
			<div class="flex">
				<FmIconButton variant="filled" size="small" icon="mdi-plus" />
				<FmIconButton variant="filled" icon="mdi-plus" />
			</div>
			<div class="flex">
				<FmIconButton variant="outlined" size="small" icon="mdi-plus" />
				<FmIconButton variant="outlined" icon="mdi-plus" />
			</div>
			<div class="flex">
				<FmIconButton size="small" icon="mdi-plus" disabled />
				<FmIconButton icon="mdi-plus" disabled />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { computed, onMounted, ref } from 'vue'
	import { useTheme } from 'vuetify'
	import FmIconButton from '@/components/fm/IconButton/IconButton.vue'

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
