<template>
	<div>
		<div class="relative flex justify-start items-start gap-2">
			<div class="relative w-[400px] h-[200px]">
				<div class="mb-4 font-bold">Default</div>
				<FmInputDate v-model="date1" />
			</div>

			<div class="relative w-[200px] px-[20px]">
				<div class="mb-4 font-bold">Result:</div>
				<div class="relative w-full whitespace-pre-wrap">
					{{ date1 }}
				</div>
			</div>
		</div>

		<div class="relative flex justify-start items-start gap-2">
			<div class="relative w-[400px] h-[200px]">
				<div class="mb-4 font-bold">Compact</div>
				<FmInputDate v-model="date2" compact />
			</div>

			<div class="relative w-[400px] px-[20px]">
				<div class="mb-4 font-bold">Result:</div>
				<div class="relative w-full whitespace-pre-wrap">
					{{ date2 }}
				</div>
			</div>
		</div>

		<div class="relative flex justify-start items-start gap-2">
			<div class="relative w-[400px] h-[200px]">
				<div class="mb-4 font-bold">Compact, with simple date picker</div>
				<FmInputDate v-model="date3" compact simplePicker />
			</div>

			<div class="relative w-[200px] px-[20px]">
				<div class="mb-4 font-bold">Result:</div>
				<div class="relative w-full whitespace-pre-wrap">
					{{ date3 }}
				</div>
			</div>
		</div>

		<div class="relative flex justify-start items-start gap-2">
			<div class="relative w-[400px] h-[200px]">
				<div class="mb-4 font-bold">
					Compact, with simple date picker and the ability to choose the time
				</div>
				<FmInputDate v-model="dateTime4" compact simplePicker include-time />
			</div>

			<div class="relative w-[200px] px-[20px]">
				<div class="mb-4 font-bold">Result:</div>
				<div class="relative w-full whitespace-pre-wrap">{{ dateTime4 }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import FmInputDate from '@/components/fm/InputDate/InputDate.vue';

	const date1 = ref();
	const date2 = ref();
	const date3 = ref();
	const dateTime4 = ref();
</script>
