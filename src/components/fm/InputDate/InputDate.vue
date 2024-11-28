<template>
	<FmMenu
		v-model="menu"
		:close-on-content-click="false"
		:disabled="disabled"
	>
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
				:model-value="date"
			/>
		</template>

		<FmDateEditor
			v-model="date"
			:show-adjacent-months="showAdjacentMonths"
			:allow-weekend-selection="allowWeekendSelection"
			:disabled="disabled"
			@update:model-value="updateValue"
		/>
	</FmMenu>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import cloneDeep from 'lodash/cloneDeep'
	import dayjs from 'dayjs'
	import FmDateEditor from '../DateEditor/DateEditor.vue'
	import FmMenu from '../Menu/Menu.vue'
	import FmTextField from '../TextField/TextField.vue'
	import type { FmInputDateProps, FmInputDateEmits } from './types'

	const props = withDefaults(defineProps<FmInputDateProps>(), {
		modelValue: '',
		dateFormat: 'YYYY-MM-DD',
		showAdjacentMonths: true,
		allowWeekendSelection: true
	})
	const emits = defineEmits<FmInputDateEmits>()

	const date = ref(cloneDeep(props.modelValue))
	const menu = ref(false)

	function updateValue(value: string) {
		date.value = dayjs(value).format(props.dateFormat)
		emits('update:modelValue', date.value)
		menu.value = false
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
