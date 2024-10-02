<template>
	<header>
		<FmLogo />
		<FmSearch />
		<FmIconButton icon="notifications_none" size="normal" />
		<FmIconButton icon="help_outline" size="normal" />
	</header>
</template>

<script setup>
	import FmLogo from '@/components/fm/Logo/Logo.vue'
	import FmSearch from '@/components/fm/Search/Search.vue'
	import FmIconButton from '@/components/fm/IconButton/IconButton.vue'

	const emit = defineEmits(['login', 'logout', 'createAccount'])
</script>
