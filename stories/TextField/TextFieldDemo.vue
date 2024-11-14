<template>
	<div class="grid grid-cols-4 gap-8">
		<FmTextField
			v-model="val1"
			hint="Supporting text"
			label="Label"
			v-on="events"
		/>
		<FmTextField
			v-model="val1"
			clearable
			hint="Supporting text"
			label="Label"
			placeholder="Enter text"
			v-on="events"
		/>
		<FmTextField
			v-model="val1"
			clearable
			hint="Supporting text"
			label="Label"
			:rules="[requiredValidate]"
			v-on="events"
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
			v-on="events"
		/>
		<FmTextField
			v-model="val2"
			clearable
			hint="Supporting text"
			prepend-icon="mdi-magnify"
			label="Label"
			placeholder="Enter text"
			v-on="events"
		/>
		<FmTextField
			v-model="val2"
			clearable
			hint="Supporting text"
			prepend-icon="mdi-magnify"
			label="Label"
			:rules="[requiredValidate]"
			v-on="events"
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
			v-on="events"
		/>
		<FmTextField
			v-model="val1"
			outlined
			clearable
			hint="Supporting text"
			label="Label"
			placeholder="Enter text"
			v-on="events"
		/>
		<FmTextField
			v-model="val1"
			outlined
			clearable
			hint="Supporting text"
			label="Label"
			:rules="[requiredValidate]"
			v-on="events"
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
			v-on="events"
		/>
		<FmTextField
			v-model="val2"
			outlined
			clearable
			hint="Supporting text"
			prepend-icon="mdi-magnify"
			label="Label"
			placeholder="Enter text"
			v-on="events"
		/>
		<FmTextField
			v-model="val2"
			outlined
			clearable
			hint="Supporting text"
			prepend-icon="mdi-magnify"
			label="Label"
			:rules="[requiredValidate]"
			v-on="events"
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
	import FmTextField from '@/components/fm/TextField/TextField.vue'

	const val1 = ref('');
	const val2 = ref('');

	const events = {
		'click:clear': (ev) => handleEvents('click:clear', ev),
		'click:control': (ev) => handleEvents('click:control', ev),
		'click:prependInner': (ev) => handleEvents('click:prependInner', ev),
		'mousedown:control': (ev) => handleEvents('mousedown:control', ev),
		'focus': (ev) => handleEvents('focus', ev),
		'blur': (ev) => handleEvents('blur', ev),
		'update:modelValue': (ev) => handleEvents('update:model-value', ev),
		'change': (ev) => handleEvents('change', ev),
	}

	function handleEvents(eventName, event) {
		console.log(eventName, event)
	}

	function requiredValidate(val) {
		return !!val || 'This is required field'
	}
</script>
