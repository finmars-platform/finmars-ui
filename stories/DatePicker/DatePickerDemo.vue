<template>
	<div class="grid grid-cols-3">
		<FmDatePicker border v-model="val1" />
		<FmDatePicker border show-header v-model="val1" />
		<FmDatePicker border show-header disabled v-model="val1" />
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import FmDatePicker from '@/components/fm/DatePicker/DatePicker.vue'

	const val1 = ref(null)
</script>
