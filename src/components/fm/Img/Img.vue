<template>
	<VImg
		:width="width"
		:height="height"
		:maxHeight="maxHeight"
		:maxWidth="maxWidth"
		:aspect-ratio="aspectRatio"
		:cover="cover"
		:src="src"
	/>
</template>

<script setup>
	import { VImg } from 'vuetify/components'

	defineProps({
		aspectRatio: String,
		width: String,
		height: String,
		cover: Boolean,
		src: String,
		maxHeight: String,
		maxWidth: String
	})
</script>
