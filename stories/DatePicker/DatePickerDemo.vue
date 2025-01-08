<template>
	<div>
		<div class="grid grid-cols-3 mb-4">
			<FmDatePicker v-model="val1" />
			<div class="relative">
				<div class="mb-4 font-bold">RESULT:</div>
				<div class="relative whitespace-pre-wrap">{{ val1 }}</div>
			</div>
		</div>

		<div class="grid grid-cols-3 mb-4">
			<FmDatePicker v-model="val2" :show-adjacent-months="false" />
			<div class="relative">
				<div class="mb-4 font-bold">RESULT:</div>
				<div class="relative whitespace-pre-wrap">{{ val2 }}</div>
			</div>
		</div>

		<div class="grid grid-cols-3 mb-4">
			<FmDatePicker v-model="val2" :show-adjacent-months="false" border disabled />
			<div class="relative">
				<div class="mb-4 font-bold">RESULT:</div>
				<div class="relative whitespace-pre-wrap">{{ val2 }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import FmDatePicker from '@/components/fm/DatePicker/DatePicker.vue';

	const val1 = ref(null);
	const val2 = ref('2025-01-15');
</script>
