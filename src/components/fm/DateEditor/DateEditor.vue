<template>
	<div class="fm-date-editor">
		<div v-if="!simple" class="fm-date-editor__menu">
			<div
				:class="[
					'fm-date-editor__menu-item',
					'fm-date-editor__menu-item--custom',
					{
						'fm-date-editor__menu-item--selected': currentMenuItem === 'custom'
					}
				]"
			>
				{{ locals.menuItemCustom }}
			</div>

			<div class="fm-date-editor__menu--delimiter" />

			<div
				:class="[
					'fm-date-editor__menu-item',
					{ 'fm-date-editor__menu-item--selected': currentMenuItem === 'today' }
				]"
				v-ripple.center
				@click="selectMenuItem('today')"
			>
				{{ locals.menuPresetToday }}
			</div>

			<div
				:class="[
					'fm-date-editor__menu-item',
					{
						'fm-date-editor__menu-item--selected': currentMenuItem === 'previous'
					}
				]"
				v-ripple.center
				@click="selectMenuItem('previous')"
			>
				{{ locals.menuPresetPrevious }}
			</div>
		</div>

		<div class="fm-date-editor__body">
			<FmTextField
				:model-value="textFieldInput"
				:label="locals.enteringFieldLabel"
				:placeholder="locals.enteringFieldPlaceholder"
				outlined
				hide-details
				mask="####-##-##"
				prepend-icon="mdi-sigma"
				:disabled="disabled"
				@click:prepend-inner="emits('click:dateIcon')"
				@update:model-value="onUpdateByKeyboard"
				@keydown.esc="onKeydownEsc"
				@keydown.tab="onChange('tab')"
				@keydown.enter="onChange('enter')"
			/>

			<FmDatePicker
				:model-value="innerValue"
				:min="min"
				:max="max"
				:non-selectable-dates="nonWorkingDays"
				:erroneous-dates="erroneousDates"
				:show-adjacent-months="showAdjacentMonths"
				:can-weekends-be-selected="allowWeekendSelection"
				:disabled="disabled"
				@update:model-value="onUpdate"
			/>

			<div v-if="includeTime" class="fm-date-editor__time">
				<span>Time</span>
				<FmInputTime v-model="innerTime" />
			</div>

			<div class="fm-date-editor__actions">
				<FmButton type="secondary" rounded @click="cancelDateSelection">
					{{ locals.cancelButtonText }}
				</FmButton>

				<FmButton
					type="secondary"
					rounded
					:disabled="innerValue === initialValue && innerTime === initialTime"
					@click="confirmDateSelection"
				>
					{{ locals.confirmButtonText }}
				</FmButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { watch } from 'vue';
	import { Ripple } from 'vuetify/directives';
	import useDateEditor from './useDateEditor';
	import FmButton from '@/components/fm/Button/Button.vue';
	import FmTextField from '@/components/fm/TextField/TextField.vue';
	import FmDatePicker from '@/components/fm/DatePicker/DatePicker.vue';
	import FmInputTime from '@/components/fm/InputTime/InputTime.vue';
	import type { FmDateEditorProps, FmDateEditorEmits } from './types';
	import dayjs from 'dayjs';

	const vRipple = Ripple;

	const props = withDefaults(defineProps<FmDateEditorProps>(), {
		erroneousDates: () => [],
		nonWorkingDays: () => [],
		time: '00:00',
		locals: {
			// @ts-ignore
			enteringFieldLabel: 'Date',
			enteringFieldPlaceholder: 'Enter date',
			cancelButtonText: 'Cancel',
			confirmButtonText: 'OK',
			menuItemCustom: 'Custom',
			menuPresetToday: 'Today',
			menuPresetPrevious: 'Previous business day'
		}
	});

	const emits = defineEmits<FmDateEditorEmits>();

	const {
		DATE_FORMAT,
		TIME_FORMAT,
		currentMenuItem,
		initialValue,
		innerValue,
		initialTime,
		innerTime,
		textFieldInput,
		selectMenuItem,
		onUpdate,
		onUpdateByKeyboard,
		onKeydownEsc,
		onChange,
		cancelDateSelection,
		confirmDateSelection
	} = useDateEditor(props, emits);

	watch(
		() => props.modelValue,
		(val, oVal) => {
			if (val !== oVal) {
				initialValue.value = innerValue.value = val ? dayjs(val).format(DATE_FORMAT) : '';
				initialTime.value = innerTime.value = val ? dayjs(val).format(TIME_FORMAT) : '00:00';
			}
		},
		{ immediate: true }
	);
</script>

<style scoped lang="scss">
	.fm-date-editor {
		--backgroundColor-fmDateEditor: var(--surface-container-high);
		--backgroundColor-fmDateEditor-menu: var(--surface-container);
		--menu-width-fmDateEditor: 210px;

		position: relative;
		width: max-content;
		border-radius: 24px;
		background-color: var(--backgroundColor-fmDateEditor);
		display: flex;
		justify-content: flex-start;
		align-items: stretch;
		overflow: hidden;
		box-shadow:
			0 2px 6px 2px rgba(0, 0, 0, 0.15),
			0 1px 2px 0 rgba(0, 0, 0, 0.3);

		&__menu {
			position: relative;
			width: var(--menu-width-fmDateEditor);
			padding: var(--spacing-24) 0 0;
			background-color: var(--backgroundColor-fmDateEditor-menu);

			&-item {
				position: relative;
				width: 100%;
				height: 56px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 0 12px;
				font-size: 16px;
				color: var(--on-surface);
				user-select: none;

				&:not(.fm-date-editor__menu-item--custom) {
					cursor: pointer;

					&:hover {
						background-color: var(--surface-container-highest);
					}
				}

				&--selected {
					background-color: var(--surface-container-highest);
				}
			}

			&--delimiter {
				position: relative;
				width: 100%;
				height: 17px;

				&::after {
					content: '';
					position: absolute;
					left: 0;
					top: 8px;
					width: 100%;
					height: 1px;
					border-bottom: 1px solid var(--outline-variant);
				}
			}
		}

		&__body {
			position: relative;
			padding: var(--spacing-24) calc(var(--spacing-24) / 2) calc(var(--spacing-24) / 2)
				var(--spacing-24);

			:deep(.fm-text-field) {
				--backgroundColor-fmTextField-outlined: var(--backgroundColor-fmDateEditor);

				width: calc(100% - calc(var(--spacing-24) / 2));
				margin-right: calc(var(--spacing-24) / 2);
			}
		}

		&__time {
			display: flex;
			width: 100%;
			height: 48px;
			justify-content: space-between;
			align-items: center;
			padding: 0 16px;
			font: var(--label-large-font);
			color: var(--on-surface);

			:deep(.fm-input-time__button) {
				margin-right: 0;
				width: 48px !important;
				max-width: 48px !important;

				.v-field__input {
					height: 24px;
					font: var(--label-large-font);
					color: var(--primary);
					padding: 2px 4px;
				}

				.v-field__outline {
					div {
						border: none;
					}
				}
			}
		}

		&__actions {
			position: relative;
			width: 100%;
			padding-top: var(--spacing-8);
			display: flex;
			justify-content: flex-end;
			align-items: center;
			column-gap: var(--spacing-8);

			button {
				text-transform: none;
			}
		}
	}
</style>
