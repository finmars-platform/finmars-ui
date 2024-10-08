<template>
	<VAvatar v-if="image" :image="image" :size="size || 40" />
	<VAvatar v-if="!image && icon" :icon="icon" :size="size || 40" />
	<VAvatar v-if="!image && !icon" :size="size || 40">
		<slot />
	</VAvatar>
</template>

<script setup>
	import { VAvatar } from 'vuetify/components'

	defineProps({
		size: Number | String,
		icon: String,
		image: String
	})
</script>
