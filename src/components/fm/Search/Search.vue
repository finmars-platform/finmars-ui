<template>
	<VAutocomplete
		v-bind="vAutocompleteProps"
		class="fm-search"
		@click:prepend-inner="emits('click:prependInner', $event)"
		@update:focused="emits('update:focused', $event)"
		@update:menu="emits('update:menu', $event)"
		@update:model-value="emits('update:modelValue', $event)"
	>
		<template #clear>
			<VIcon icon="mdi-close" @click.stop.prevent="emits('click:clear', $event)" />
		</template>

		<template v-if="slots.details" #details>
			<slot name="details" />
		</template>

		<template v-if="slots.message" #message>
			<slot name="message" />
		</template>

		<template v-if="slots.item" #item="{ item, index, props }">
			<slot name="item" :item="item" :index="index" :props="props" />
		</template>

		<template v-if="slots['no-data']" #no-data>
			<slot name="no-data" />
		</template>

		<template v-if="slots.selection" #selection="{ item, index }">
			<slot name="selection" :item="item" :index="index" />
		</template>
	</VAutocomplete>
</template>

<script setup>
	import { computed, ref, useSlots } from 'vue'
	import { VAutocomplete, VIcon } from 'vuetify/components'

	const props = defineProps({
		id: {
			type: String,
		},
		autoSelectFirst: {
			type: [String, Boolean],
			default: false,
			validator(value) {
				if (typeof value === 'boolean') {
					return value
				}

				return ['exact'].includes(value)
			},
		},
		modelValue: {
			type: [String, Number, Object],
		},
		items: {
			type: Array,
			default: () => [],
		},
		itemTitle: {
			type: String,
			default: 'title',
		},
		itemValue: {
			type: String,
			default: 'value',
		},
		placeholder: {
			type: String,
			default: 'Search',
		},
		clearOnSelect: {
			type: Boolean,
			default: false,
		},
		prependInnerIcon: {
			type: String,
			default: 'mdi-magnify',
		},
		prependIconColor: {
			type: String,
			default: 'var(--on-surface-variant)',
		},
		style: {
			type: Object,
			default: () => ({}),
		},
		error: {
			type: Boolean,
		},
		errorMessage: {
			type: [String, Array],
		},
		filterKeys: {
			type: [String, Array],
			default: ['title'],
		},
		filterMode: {
			type: String,
			default: 'intersection',
			validator: v => ['every', 'some', 'union', 'intersection'].includes(v),
		},
		hideNoData: {
			type: Boolean,
			default: false,
		},
		hideSelected: {
			type: Boolean,
			default: false,
		},
		hideDetails: {
			type: Boolean,
			default: true,
		},
		hint: {
			type: String,
		},
		loading: {
			type: Boolean,
		},
		minWidth: {
			type: [String, Number],
		},
		width: {
			type: [String, Number],
		},
		maxWidth: {
			type: [String, Number],
		},
		multiple: {
			type: Boolean,
			default: false,
		},
		name: {
			type: String,
		},
		noDataText: {
			type: String,
		},
		noFilter: {
			type: Boolean,
			default: false,
		},
		openOnClear: {
			type: Boolean,
			default: false,
		},
		returnObject: {
			type: Boolean,
		},
		rules: {
			type: Array,
			default: () => [],
		},
		search: {
			type: String,
			default: 'sh',
		},
		disabled: {
			type: Boolean,
		},
	})

	const emits = defineEmits([
		'click:prependInner',
		'click:clear',
		'update:focused',
		'update:menu',
		'update:modelValue',
		'update:search',
	])

	const slots = useSlots()
	console.log('SLOTS: ', slots)

	const vAutocompleteProps = computed(() => ({
		density: 'comfortable',
		rounded: true,
		variant: 'solo',
		clearable: true,
		itemProps: true,
		color: 'var(--on-surface-variant)',
		bgColor: 'var(--surface-container)',
		id: props.id,
		items: props.items,
		modelValue: props.modelValue,
		placeholder: props.placeholder,
		clearOnSelect: props.clearOnSelect,
		prependInnerIcon: props.prependInnerIcon,
		error: props.error,
		errorMessage: props.errorMessage,
		filterKeys: props.filterKeys,
		hideNoData: props.hideNoData,
		hideSelected: props.hideSelected,
		hideDetails: props.hideDetails,
		hint: props.hint,
		loading: props.loading,
		itemTitle: props.itemTitle,
		itemValue: props.itemValue,
		minWidth: props.minWidth,
		width: props.width,
		maxWidth: props.maxWidth,
		multiple: props.multiple,
		name: props.name,
		noDataText: props.noDataText,
		noFilter: props.noFilter,
		openOnClear: props.openOnClear,
		returnObject: props.returnObject,
		rules: props.rules,
		style: props.style,
		search: props.search,
		disabled: props.disabled,
	}))
</script>

<style>
	.v-overlay-container {
		.v-overlay__content.v-autocomplete__content {
			background-color: var(--surface-container);

			.v-list {
				color: var(--on-surface-variant);
				background-color: var(--surface-container) !important;

				.v-list-item {
					.v-list-item-title {
						.v-autocomplete__mask {
							font-weight: 600;
							background-color: transparent;
						}
					}
				}
			}
		}
	}
</style>

<style lang="scss" scoped>
	.fm-search {
		:deep(.v-input__control) {
			.v-field--variant-solo {
				box-shadow: none;
			}
		}
	}
</style>
