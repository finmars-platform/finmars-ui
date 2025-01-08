<template>
	<FmMenu v-model="isMenuOpen" offset="4" :close-on-content-click="false" :disabled="disabled">
		<template #activator="{ props }">
			<FmTextField
				v-bind="props"
				compact
				width="76"
				outlined
				hide-details
				:label="label"
				:placeholder="placeholder"
				:persistent-placeholder="persistentPlaceholder"
				readonly
				class="fm-input-time__button"
				:model-value="modelValue"
			/>
		</template>

		<FmTimePicker
			:model-value="modelValue"
			:minutes-step="minutesStep"
			:size="size"
			@update:model-value="update"
		/>
	</FmMenu>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import FmTimePicker from '../TimePicker/TimePicker.vue';
	import FmMenu from '../Menu/Menu.vue';
	import FmTextField from '../TextField/TextField.vue';
	import type { FmInputTimeProps, FmInputTimeEmits } from './types';

	defineProps<FmInputTimeProps>();
	const emits = defineEmits<FmInputTimeEmits>();

	const isMenuOpen = ref(false);

	function update(value: string) {
		emits('update:modelValue', value);
	}
</script>

<style lang="scss">
	.fm-input-time {
		&__button {
			max-width: 76px;
		}
	}

	.v-overlay-container {
		.v-overlay.v-menu {
			.v-overlay__content {
				border-radius: 28px !important;

				& > div {
					padding: 0 !important;
					border-radius: 28px !important;
				}
			}
		}
	}
</style>
