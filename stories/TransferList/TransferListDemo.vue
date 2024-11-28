<template>
	<div class="relative">
		<FmTransferList
			title="TITLE"
			:options="demoOptions"
			:selected="selected"
			@end="() => console.log('END')"
			@change="changeSelected"
		/>

		<p class="my-4 whitespace-pre-wrap">
			{{ JSON.stringify(selected, null, 2) }}
		</p>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import cloneDeep from 'lodash/cloneDeep'
	import FmTransferList from '@/components/fm/TransferList/TransferList.vue'
	import { options } from '../_Data/filters-mock-data'

	const demoOptions = ref(cloneDeep(options).slice(1))
	const selected = ref([])

	function changeSelected(value) {
		console.log('change: ', value)
		selected.value = value
	}
</script>
