<template>
	<img :src="logo" />
</template>

<script setup>
	import logoLight from '@/components/fm/Logo/assets/logo-light.svg?url';
	import logoCollapsedLight from '@/components/fm/Logo/assets/logo-collapsed-light.svg?url';
	import logoDark from '@/components/fm/Logo/assets/logo-dark.svg?url';
	import logoCollapsedDark from '@/components/fm/Logo/assets/logo-collapsed-dark.svg?url';
	import { computed } from 'vue';

	const props = defineProps({
		theme: String,
		maxHeight: String,
		size: String,
		logoUrl: String
	});

	const logo = computed(() => {
    if (props.logoUrl) return props.logoUrl;

		if (props.theme === 'light') {
			if (props.size === 'small') {
				return logoCollapsedLight;
			} else {
				return logoLight;
			}
		} else {
			if (props.size === 'small') {
				return logoCollapsedDark;
			} else {
				return logoDark;
			}
		}
	});
</script>
