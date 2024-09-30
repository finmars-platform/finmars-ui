<template>
	<FmImg :src="logo" :maxHeight="maxHeight" />
</template>

<script setup>
	import FmImg from '@/components/fm/Img/Img.vue'
	import logoLight from '@/components/fm/Logo/assets/logo-light.svg?url'
	import logoCollapsedLight from '@/components/fm/Logo/assets/logo-collapsed-light.svg?url'
	import logoDark from '@/components/fm/Logo/assets/logo-dark.svg?url'
	import logoCollapsedDark from '@/components/fm/Logo/assets/logo-collapsed-dark.svg?url'
	import { computed } from 'vue'

	const props = defineProps({
		theme: String,
		maxHeight: String,
		size: String
	})

	const logo = computed(() => {
		if (props.theme === 'light') {
			if (props.size === 'small') {
				return logoCollapsedLight
			} else {
				return logoLight
			}
		} else {
			if (props.size === 'small') {
				return logoCollapsedDark
			} else {
				return logoDark
			}
		}
	})
</script>

<style>
	:root {
	}

	body.dark-mode {
	}
</style>
