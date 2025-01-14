<template>
	<div class="relative px-[24px]">
		<FmTextField
			v-model="newName"
			outlined
			label="Folder name"
			:rules="[required]"
			@init="inputComponent = $event?.component"
			@update:model-value="update"
		/>
	</div>
</template>

<script setup>
	import { computed, ref, watch } from 'vue';
	import FmTextField from '../../src/components/fm/TextField/TextField.vue';

	const props = defineProps({
		name: {
			type: String
		}
	});

	const emits = defineEmits(['select', 'validate']);

	const inputComponent = ref();
	const initialName = ref(props.name);
	const newName = ref(props.name);

	const inputComponentValid = computed(() => inputComponent.value?.isValid);

	function required(val) {
		return !!val || 'Cannot be empty';
	}

	function update() {
		emits('select', { oldName: initialName.value, newName: newName.value });
	}

	watch(
		() => inputComponentValid.value,
		(val, oldVal) => {
			if (val !== oldVal) {
				emits('validate', val);
			}
		},
		{ immediate: true }
	);
</script>
