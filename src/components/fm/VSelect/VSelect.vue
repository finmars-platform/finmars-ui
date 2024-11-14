<template>
	<VSelect
		class="fm-v-select"
		v-bind="props"
		@click:prepend="emits('click:prepend', $event)"
		@click:prepend-inner="emits('click:prependInner', $event)"
		@update:focused="emits('update:focused', $event)"
		@update:model-value="emits('update:modelValue', $event)"
	>
		<template #clear>
			<VIcon icon="mdi-close" @click.stop.prevent="onClearClick" />
		</template>

		<template v-if="slots['append-inner']" #append-inner="{ isActive, isFocused, controlRef }">
			<slot name="append-inner" :is-active="isActive" :is-focused="isFocused" :control-ref="controlRef" />
		</template>

		<template v-if="slots.chip" #chip="{ item, index, props }">
			<slot
				name="chip"
				:item="item"
				:index="index"
				:props="props"
			/>
		</template>

		<template
			v-if="slots.details"
			#details="{ id, messagesId, isDirty, isDisabled, isReadonly, isPristine, isValid, isValidating }"
		>
			<slot
				name="details"
				:id="id"
				:messages-id="messagesId"
				:is-dirty="isDirty"
				:is-disabled="isDisabled"
				:is-readonly="isReadonly"
				:is-pristine="isPristine"
				:is-valid="isValid"
				:is-validating="isValidating"
			/>
		</template>

		<template v-if="slots.item" #item="{ item, index, props }">
			<!-- @vue-ignore -->
			<v-list-item @click="props.onClick">
				<slot name="item" :item="item" :index="index" :props="props" />
			</v-list-item>
		</template>

		<template v-if="slots.loader" #loader="{ color, isActive }">
			<slot name="loader" :color="color" :is-active="isActive" />
		</template>

		<template v-if="slots.message" #message="{ message }">
			<slot name="message" :message="message" />
		</template>

		<template v-if="slots['no-data']" #no-data>
			<slot name="no-data" />
		</template>

		<template v-if="slots['prepend-inner']" #prepend-inner="{ isActive, isFocused, controlRef }">
			<slot name="prepend-inner" :is-active="isActive" :is-focused="isFocused" :control-ref="controlRef" />
		</template>

		<template v-if="slots.selection" #selection="{ item, index }">
			<div
				class="fm-v-select__selection"
				@click.stop.prevent="emits('click:selection', $event)"
			>
				<slot name="selection" :item="item" :index="index" />
			</div>
		</template>
	</VSelect>
</template>

<script setup lang="ts" generic="T = any">
	import { useSlots } from 'vue'
	import { VIcon, VListItem, VSelect } from 'vuetify/components'
	import type { FmVSelectProps, FmVSelectEmits, FmVSelectSlots } from './types'

	const props = withDefaults(defineProps<FmVSelectProps<T>>(), {
		density: 'comfortable',
		baseColor: 'var(--on-surface-variant)',
		bgColor: 'var(--surface-container)',
		color: 'var(--on-surface-variant)',
		clearable: true,
		hideDetails: true,
		itemProps: true,
		rounded: 4,
		variant: 'solo'
	})

	const emits = defineEmits<FmVSelectEmits<T>>()
	defineSlots<FmVSelectSlots<T>>()

	const slots = useSlots()

	function onClearClick(ev: MouseEvent) {
		emits('click:clear', ev)
		emits('update:modelValue', null)
	}
</script>

<style>
	.v-overlay-container {
		.v-overlay__content.v-select__content {
			background-color: var(--surface-container) !important;

			.v-list {
				color: var(--on-surface-variant) !important;
				background-color: var(--surface-container) !important;
			}
		}
	}
</style>

<style lang="scss" scoped>
	.fm-v-select {
		:deep(.v-input__control) {
			.v-field--variant-solo {
				box-shadow: none;
			}
		}

		&__selection {
			position: relative;
			width: max-content;
			max-width: 100%;
		}
	}
</style>
