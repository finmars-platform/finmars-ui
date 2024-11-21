<template>
	<div class="fm-date-editor">
		<div class="fm-date-editor__menu">
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
						'fm-date-editor__menu-item--selected':
							currentMenuItem === 'previous'
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
				:allowed-dates="checkIfDateAllowed"
				:show-week="showWeek"
				:show-adjacent-months="showAdjacentMonths"
				:disabled="disabled"
				@update:model-value="onUpdate"
			/>

			<div class="fm-date-editor__actions">
				<FmButton
					type="secondary"
					:disabled="innerValue === initialValue"
					@click="cancelDateSelection"
				>
					{{ locals.cancelButtonText }}
				</FmButton>

				<FmButton
					type="secondary"
					:disabled="innerValue === initialValue"
					@click="confirmDateSelection"
				>
					{{ locals.confirmButtonText }}
				</FmButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { watch } from 'vue'
	import { Ripple } from 'vuetify/directives'
	import { Dayjs } from 'dayjs'
	import useDateEditor from './useDateEditor'
	import FmButton from '@/components/fm/Button/Button.vue'
	import FmTextField from '@/components/fm/TextField/TextField.vue'
	import FmDatePicker from '@/components/fm/DatePicker/DatePicker.vue'
	import type { FmDateEditorProps, FmDateEditorEmits } from './types'

	const vRipple = Ripple

	const props = withDefaults(defineProps<FmDateEditorProps>(), {
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
	})

	const emits = defineEmits<FmDateEditorEmits>()

	function checkIfDateAllowed(val: Dayjs | string) {
		return allowedDates(val)
	}

	const {
		allowedDates,
		currentMenuItem,
		initialValue,
		innerValue,
		textFieldInput,
		selectMenuItem,
		onUpdate,
		onUpdateByKeyboard,
		onKeydownEsc,
		onChange,
		cancelDateSelection,
		confirmDateSelection
	} = useDateEditor(props, emits)

	watch(
		() => props.modelValue,
		(val, oVal) => {
			if (val !== oVal) {
				innerValue.value = val
			}
		},
		{ immediate: true }
	)
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
			padding: var(--spacing-24) calc(var(--spacing-24) / 2)
				calc(var(--spacing-24) / 2) var(--spacing-24);

			:deep(.fm-text-field) {
				--backgroundColor-fmTextField-outlined: var(
					--backgroundColor-fmDateEditor
				);

				width: calc(100% - calc(var(--spacing-24) / 2));
				margin-right: calc(var(--spacing-24) / 2);
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
		}
	}
</style>
