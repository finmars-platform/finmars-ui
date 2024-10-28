<template>
	<div class="grid grid-cols-2">
		<FmDateEditor
			v-model="date1"
			@click:date-icon="() => console.log('ICON IS CLICKED')"
			@update:model-value="(ev) => console.log('NEW DATE: ', ev)"
		/>

	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import FmDateEditor from '@/components/fm/DateEditor/DateEditor.vue'

	const date1 = ref('2024-10-15')
</script>
