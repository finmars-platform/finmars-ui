<template>
	<div class="relative w-[1000px] mb-8">
		<FmPagination
			v-model="data.value"
			v-on="eventHandlers"
			:items-per-page="data.itemsPerPage"
			:total-items="data.totalItems"
			:with-info="data.withInfo"
		/>
	</div>

	<div class="relative w-[1000px] mb-8">
		<FmPagination
			v-model="data1.value"
			v-on="eventHandlers"
			:items-per-page="data1.itemsPerPage"
			:total-items="data1.totalItems"
			:with-info="data1.withInfo"
		/>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import FmPagination from '@/components/fm/Pagination/Pagination.vue'

	const eventHandlers = {
		first: (ev) => console.log(`Event 'first' :`, ev),
		last: (ev) => console.log(`Event 'last' :`, ev),
		prev: (ev) => console.log(`Event 'prev' :`, ev),
		next: (ev) => console.log(`Event 'next' :`, ev),
		'update:modelValue': (ev) => console.log(`Event 'update:modelValue' :`, ev),
	}

	const data = ref({
		value: 1,
		itemsPerPage: 10,
		totalItems: 87,
		withInfo: false,
	})

	const data1 = ref({
		value: 1,
		itemsPerPage: 15,
		totalItems: 211,
		withInfo: true,
	})
</script>
