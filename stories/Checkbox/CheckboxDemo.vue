<template>
	<div>
		<FmCheckbox v-model="value.one"></FmCheckbox>
		<FmCheckbox v-model="value.two" disabled></FmCheckbox>
		<FmCheckbox v-model="value.three" error></FmCheckbox>
		<FmCheckbox v-model="value.four" error disabled></FmCheckbox>
	</div>
</template>

<script setup>
	import FmCheckbox from '@/components/fm/Checkbox/Checkbox.vue'
	import { reactive } from 'vue'

	const value = reactive({ one: false, two: false, three: true, four: false })
</script>
