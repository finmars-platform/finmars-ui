<template>
	<VTextField
		ref="vtf"
		v-bind="vTextFieldProps"
		v-maska="props.mask"
		:class="[
			'fm-text-field',
			{ 'fm-text-field--placeholder': placeholder },
		]"
		@click:clear="emits('click:clear', $event)"
		@click:control="onClickControl"
		@click:prepend-inner="emits('click:prependInner', $event)"
		@mousedown:control="emits('mousedown:control', $event)"
		@keydown.enter="onKeydownEnter"
		@update:focused="onFocused"
		@update:model-value="onUpdate"
	>
		<template #append-inner>
			<VIcon v-if="showErrorIcon" icon="mdi-alert-circle" size="20" color="var(--error)" />
		</template>
	</VTextField>
</template>

<script setup>
	import { computed, ref, watch } from 'vue'
	import { vMaska } from 'maska/vue'
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
		mask: {
			type: [String, Object, undefined],
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
		'click:prependInner',
		'mousedown:control',
		'update:focused',
		'update:modelValue',
		'change',
	])

	const vtf = ref()
	const dirty = ref(false)
	const innerValue = ref(props.modelValue)

	const vTextFieldProps = computed(() => ({
		color: 'var(--color-fmTextField)',
		bgColor: props.outlined
			? 'var(--backgroundColor-fmTextField-outlined)'
			: 'var(--backgroundColor-fmTextField)',
		modelValue: innerValue.value,
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
		innerValue.value = val
		emits('update:modelValue', val)
	}

	function onClickControl(ev) {
		dirty.value = true
		emits('click:control', ev)
	}

	function onFocused(val) {
		emits('update:focused', val)
		if (!val) {
			emits('change', innerValue.value)
		}
	}

	function onKeydownEnter() {
		emits('change', innerValue.value)
	}

	defineExpose({
		errorMessages: vtf.value?.errorMessages,
		isValid: vtf.value?.isValid,
		reset: vtf.value?.reset,
		resetValidation: vtf.value?.resetValidation,
		validate: vtf.value?.validate,
	})

	watch(
		() => props.modelValue,
		(val) => {
			if (val !== innerValue.value) {
				innerValue.value = val
			}
		},
		{ immediate: true },
	)
</script>

<style scoped lang="scss">
	.fm-text-field {
		--color-fmTextField: var(--primary);
		--backgroundColor-fmTextField: var(--surface-container-highest);
		--backgroundColor-fmTextField-outlined: var(--surface);

		position: relative;

		:deep(.v-input__control) {
			.v-field.v-field--focused {
				.v-field__overlay {
					opacity: 0;
				}
			}

			.v-field__prepend-inner {
				color: var(--on-surface-variant);
			}

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
