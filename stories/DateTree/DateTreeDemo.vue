<template>
	<div class="relative flex justify-start items-start gap-2">
		<div class="relative w-[600px] h-[600px]">
			<FmDateTree v-model="val1" :data="dates" />
		</div>

		<div class="relative w-[300px]">
			<div class="mb-4 font-bold">RESULTS:</div>
			<div class="relative w-full whitespace-pre-wrap">
				{{ JSON.stringify(val1, null, 4) }}
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import FmDateTree from '@/components/fm/DateTree/DateTree.vue';

	const dates = [
		'2022-02-02',
		'2022-07-12',
		'2023-05-15',
		'2023-08-10',
		'2023-08-11',
		'2023-08-22',
		'2024-10-05',
		'2024-12-11',
		'2024-12-23'
	];

	const val1 = ref();
</script>
