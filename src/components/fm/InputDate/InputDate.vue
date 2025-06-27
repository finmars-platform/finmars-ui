<template>
	<FmMenu v-model="menu" :close-on-content-click="false" :disabled="disabled">
		<template #activator="{ props }">
			<FmTextField
				v-bind="props"
				:compact="compact"
				outlined
				hide-details
				:label="label"
				:placeholder="placeholder"
				:persistent-placeholder="persistentPlaceholder"
				readonly
				:model-value="displayingValue"
			/>
		</template>

		<FmDateEditor
			v-model="date"
			:include-time="includeTime"
			:show-adjacent-months="showAdjacentMonths"
			:allow-weekend-selection="allowWeekendSelection"
			:min="min"
			:max="max"
			:simple="simplePicker"
			:disabled="disabled"
			@update:model-value="updateValue"
			@cancel="menu = false"
		/>
	</FmMenu>
</template>

<script lang="ts" setup>
	import { computed, ref } from 'vue';
	import dayjs from 'dayjs';
	import FmDateEditor from '../DateEditor/DateEditor.vue';
	import FmMenu from '../Menu/Menu.vue';
	import FmTextField from '../TextField/TextField.vue';
	import type { FmInputDateProps, FmInputDateEmits } from './types';

	const props = withDefaults(defineProps<FmInputDateProps>(), {
		modelValue: '',
		time: '00:00',
		showAdjacentMonths: true,
		allowWeekendSelection: true
	});
	const emits = defineEmits<FmInputDateEmits>();

	const DATE_FORMAT = props.includeTime ? 'YYYY-MM-DD[T]HH:mm' : 'YYYY-MM-DD';
	const DISPLAYING_DATE_FORMAT = props.includeTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD';

	const date = ref(props.modelValue);
	const menu = ref(false);

	const displayingValue = computed(() =>
		date.value ? dayjs(date.value).format(DISPLAYING_DATE_FORMAT) : ''
	);

	function updateValue(value: string): void {
		date.value = dayjs(value).format(DATE_FORMAT);
		emits('update:modelValue', date.value);
		menu.value = false;
	}
</script>

<style lang="scss">
	.v-overlay-container {
		.v-overlay.v-menu {
			.v-overlay__content {
				.v-list {
					.v-list-item {
						color: var(--on-surface-variant) !important;
						caret-color: var(--on-surface-variant) !important;
					}
				}

				& > div {
					padding: 0 !important;
				}

				.fm-date-editor {
					box-shadow: none !important;
					border-top-right-radius: 4px !important;
					border-bottom-right-radius: 4px !important;
				}
			}
		}
	}
</style>
