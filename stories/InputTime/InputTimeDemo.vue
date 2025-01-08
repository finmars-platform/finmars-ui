<template>
	<div class="relative">
		<div class="relative w-full flex justify-start items-start gap-2">
			<div class="relative w-[400px] h-[400px]">
				<FmInputTime v-model="val1" />
			</div>

			<div class="relative w-[400px] h-[400px]">
				<div class="mb-4 font-bold">RESULT:</div>
				<div class="relative w-full whitespace-pre-wrap">{{ val1 }}</div>
			</div>
		</div>

		<div class="relative w-full flex justify-start items-start gap-2">
			<div class="relative w-[400px] h-[400px]">
				<FmInputTime v-model="val2" :minutes-step="5" />
			</div>

			<div class="relative w-[400px] h-[400px]">
				<div class="mb-4 font-bold">RESULT:</div>
				<div class="relative w-full whitespace-pre-wrap">{{ val2 }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import FmInputTime from '@/components/fm/InputTime/InputTime.vue';

	const val1 = ref('00:00');
	const val2 = ref('13:45');
</script>
