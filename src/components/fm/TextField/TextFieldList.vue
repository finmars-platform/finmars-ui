<template>
	<div class="grid grid-cols-4 gap-8">
		<FmTextField
			v-model="val1"
			hint="Supporting text"
			label="Label"
		/>
		<FmTextField
			v-model="val1"
			clearable
			hint="Supporting text"
			label="Label"
			placeholder="Enter text"
		/>
		<FmTextField
			v-model="val1"
			clearable
			hint="Supporting text"
			label="Label"
			:rules="[requiredValidate]"
		/>
		<FmTextField
			v-model="val1"
			hint="Supporting text"
			label="Label"
			disabled
		/>

		<FmTextField
			v-model="val2"
			hint="Supporting text"
			prepend-icon="mdi-magnify"
			label="Label"
		/>
		<FmTextField
			v-model="val2"
			clearable
			hint="Supporting text"
			prepend-icon="mdi-magnify"
			label="Label"
			placeholder="Enter text"
		/>
		<FmTextField
			v-model="val2"
			clearable
			hint="Supporting text"
			prepend-icon="mdi-magnify"
			label="Label"
			:rules="[requiredValidate]"
		/>
		<FmTextField
			v-model="val2"
			hint="Supporting text"
			prepend-icon="mdi-magnify"
			label="Label"
			disabled
		/>

		<FmTextField
			v-model="val1"
			outlined
			hint="Supporting text"
			label="Label"
		/>
		<FmTextField
			v-model="val1"
			outlined
			clearable
			hint="Supporting text"
			label="Label"
			placeholder="Enter text"
		/>
		<FmTextField
			v-model="val1"
			outlined
			clearable
			hint="Supporting text"
			label="Label"
			:rules="[requiredValidate]"
		/>
		<FmTextField
			v-model="val1"
			outlined
			hint="Supporting text"
			label="Label"
			disabled
		/>

		<FmTextField
			v-model="val2"
			outlined
			hint="Supporting text"
			prepend-icon="mdi-magnify"
			label="Label1"
		/>
		<FmTextField
			v-model="val2"
			outlined
			clearable
			hint="Supporting text"
			prepend-icon="mdi-magnify"
			label="Label"
			placeholder="Enter text"
		/>
		<FmTextField
			v-model="val2"
			outlined
			clearable
			hint="Supporting text"
			prepend-icon="mdi-magnify"
			label="Label"
			:rules="[requiredValidate]"
		/>
		<FmTextField
			v-model="val2"
			outlined
			hint="Supporting text"
			prepend-icon="mdi-magnify"
			label="Label"
			disabled
		/>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import FmTextField from './TextField.vue'

	const val1 = ref('');
	const val2 = ref('');

	function requiredValidate(val) {
		return !!val || 'This is required field'
	}
</script>
