<template>
	<div>
		<h4 class="mb-4 text-h4">Single select</h4>

		<FmItemPicker
			class="mb-10"
			v-model="val1"
			:attributes="attributes"
			:suggested="[]"
			v-on="eventHandlers"
		/>

		<h4 class="mb-4 text-h4">Multiple select, 'add' mode (default)</h4>

		<FmItemPicker
			class="mb-10"
			v-model="val2"
			multiple
			:attributes="attributes"
			:suggested="[]"
			v-on="eventHandlers"
		/>

		<h4 class="mb-4 text-h4">Multiple select, 'update' mode</h4>

		<FmItemPicker
			v-model="val3"
			multiple
			mode="update"
			:attributes="attributes"
			:suggested="[]"
			v-on="eventHandlers"
		/>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import cloneDeep from 'lodash/cloneDeep';
	import FmItemPicker from '@/components/fm/ItemPicker/ItemPicker/ItemPicker.vue';
	import { presetFilters, mockData } from '../_Data/filters-mock-data.js';

	const eventHandlers = {
		close: () => console.log("'close' event"),
		'update:modelValue': (ev) => console.log("'update:modelValue' event:", ev),
		'update:suggested': (ev) => console.log("'update:suggested' event:", ev)
	};

	const attributes = cloneDeep(mockData.attributes);

	const val1 = ref(cloneDeep(presetFilters.slice(0, 1).map((i) => i.key)));
	const val2 = ref(cloneDeep(presetFilters.map((i) => i.key)));
	const val3 = ref(cloneDeep(presetFilters.map((i) => i.key)));
</script>
