<template>
	<VTextField
		ref="vtf"
		v-bind="vTextFieldProps"
		:class="[
			'fm-text-field',
			{ 'fm-text-field--placeholder': placeholder },
		]"
		@click:clear="emits('click:clear', $event)"
		@click:control="onClickControl"
		@mousedown:control="emits('mousedown:control', $event)"
		@update:focused="emits('update:focused', $event)"
		@update:model-value="onUpdate"
	>
		<template #append-inner>
			<VIcon v-if="showErrorIcon" icon="mdi-alert-circle" size="20" color="var(--error)" />
		</template>
	</VTextField>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { VIcon, VTextField } from 'vuetify/components'

	const props = defineProps({
		modelValue: {
			type: String,
		},
		type: {
			type: String,
			default: 'text',
		},
		name: {
			type: [String, undefined],
		},
		width: {
			type: [String, Number, undefined],
		},
		label: {
			type: [String, undefined],
		},
		placeholder: {
			type: [String, undefined],
		},
		hint: {
			type: [String, undefined],
		},
		prependIcon: {
			type: [String, undefined],
		},
		outlined: {
			type: Boolean,
		},
		hideDetails: {
			type: Boolean,
		},
		messages: {
			type: [String, Array],
			default: () => [],
		},
		rules: {
			type: Array,
			default: () => [],
		},
		error: {
			type: Boolean,
		},
		errorMessages: {
			type: [String, Array],
			default: () => [],
		},
		clearable: {
			type: Boolean,
		},
		disabled: {
			type: Boolean,
		},
	})

	const emits = defineEmits([
		'click:clear',
		'click:control',
		'mousedown:control',
		'update:focused',
		'update:modelValue',
	])

	const vtf = ref()
	const dirty = ref(false)

	const vTextFieldProps = computed(() => ({
		color: 'var(--primary)',
		bgColor: props.outlined ? 'var(--surface)' : 'var(--surface-container-highest)',
		modelValue: props.modelValue,
		type: props.type,
		...(props.label && { label: props.label }),
		...(props.placeholder && { placeholder: props.placeholder }),
		...(props.hint && { hint: props.hint, persistentHint: true }),
		...(props.prependIcon && { prependInnerIcon: props.prependIcon }),
		...(props.clearable && { clearable: true, persistentClear: true }),
		width: props.width,
		variant: props.outlined ? 'outlined' : 'filled',
		hideDetails: props.hideDetails,
		messages: props.messages,
		rules: props.rules,
		error: !!props.error,
		errorMessages: props.errorMessages,
		clearable: !!props.clearable,
		disabled: !!props.disabled,
	}))

	const showErrorIcon = computed(() => dirty.value && !vtf.value?.isValid)

	function onUpdate(val) {
		dirty.value = true
		emits('update:modelValue', val)
	}

	function onClickControl(ev) {
		dirty.value = true
		emits('click:control', ev)
	}

	defineExpose({
		errorMessages: vtf.value?.errorMessages,
		isValid: vtf.value?.isValid,
		reset: vtf.value?.reset,
		resetValidation: vtf.value?.resetValidation,
		validate: vtf.value?.validate,
	})
</script>

<style scoped lang="scss">
	.fm-text-field {
		position: relative;

		:deep(.v-input__control) {
			.v-label {
				color: var(--on-surface-variant);
			}

			.v-field__input {
				color: var(--on-surface);
			}
		}

		:deep(.v-input__details) {
			.v-messages__message {
				color: var(--on-surface-variant);
			}
		}

		&.v-input--error {
			:deep(.v-input__details) {
				.v-messages__message {
					color: var(--error);
				}
			}
		}

		&.fm-text-field--placeholder {
			:deep(.v-input__control) {
				.v-field__field {
					.v-label.v-field-label--floating {
						visibility: visible;
					}

					.v-label:not(.v-field-label--floating) {
						display: none;
					}

					.v-field__input {
						opacity: 1;
					}
				}

				.v-field__outline {
					.v-field__outline__notch {
						&:before {
							opacity: 0;
						}

						.v-label {
							visibility: visible;
						}
					}
				}
			}
		}
	}
</style>
