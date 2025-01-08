<template>
	<div>
		<div class="grid grid-cols-2 mb-[30px]">
			<FmDateEditor
				v-model="date1"
				show-adjacent-months
				allow-weekend-selection
				calculate-previous-day-from-today
				@click:date-icon="() => console.log('ICON IS CLICKED')"
				@update:model-value="(ev) => console.log('NEW DATE: ', ev)"
			/>

			<div class="relative px-4">
				<div class="mb-4 font-bold">RESULT:</div>
				<div class="relative whitespace-pre-wrap">{{ date1 }}</div>
			</div>
		</div>

		<div class="grid grid-cols-2 mb-[30px]">
			<FmDateEditor
				v-model="date2"
				show-adjacent-months
				allow-weekend-selection
				simple
				calculate-previous-day-from-today
				@click:date-icon="() => console.log('ICON IS CLICKED')"
				@update:model-value="(ev) => console.log('NEW DATE: ', ev)"
			/>

			<div class="relative px-4">
				<div class="mb-4 font-bold">RESULT:</div>
				<div class="relative whitespace-pre-wrap">{{ date2 }}</div>
			</div>
		</div>

		<div class="grid grid-cols-2 mb-[30px]">
			<FmDateEditor
				v-model="dateTime3"
				show-adjacent-months
				allow-weekend-selection
				simple
				include-time
				calculate-previous-day-from-today
				@click:date-icon="() => console.log('ICON IS CLICKED')"
				@update:model-value="(ev) => console.log('NEW DATE: ', ev)"
				@update:time="(ev) => console.log('NEW TIME: ', ev)"
			/>

			<div class="relative px-4">
				<div class="mb-4 font-bold">RESULT:</div>
				<div class="relative whitespace-pre-wrap">{{ dateTime3 }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import FmDateEditor from '@/components/fm/DateEditor/DateEditor.vue';

	const date1 = ref('2024-10-15');
	const date2 = ref();
	const dateTime3 = ref('2025-01-10T15:15');
</script>
