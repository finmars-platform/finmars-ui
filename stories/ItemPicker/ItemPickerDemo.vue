<template>
	<div>
		<h4 class="mb-4 text-h4">Single select</h4>

		<FmItemPicker
			class="mb-10"
			v-model="val1"
			:categories="categories"
			v-on="eventHandlers"
		/>

		<h4 class="mb-4 text-h4">Multiple select, 'add' mode (default)</h4>

		<FmItemPicker
			class="mb-10"
			v-model="val2"
			multiple
			:categories="categories"
			v-on="eventHandlers"
		/>

		<h4 class="mb-4 text-h4">Multiple select, 'update' mode</h4>

		<FmItemPicker
			v-model="val3"
			multiple
			mode="update"
			:categories="categories"
			v-on="eventHandlers"
		/>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import cloneDeep from 'lodash/cloneDeep'
	import FmItemPicker from '@/components/fm/ItemPicker/ItemPicker.vue'
	import { categories, singleSelect, multipleSelect } from './data'

	const eventHandlers = {
		close: () => console.log('\'close\' event'),
		'update:modelValue': (ev) => console.log('\'update:modelValue\' event:', ev),
	}

	const val1 = ref(cloneDeep(singleSelect))
	const val2 = ref(cloneDeep(multipleSelect))
	const val3 = ref(cloneDeep(multipleSelect))
</script>
