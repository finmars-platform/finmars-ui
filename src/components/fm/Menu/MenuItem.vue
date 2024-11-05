<template>
	<div
		class="relative w-full flex flex-row items-center justify-start px-[12px] hover:bg-[var(--surface-container-highest)]"
		:class="{
			'h-[56px]': itemSize === 'large',
			'h-[48px]': itemSize === 'medium',
			'h-[40px]': itemSize === 'small',
			'cursor-pointer': !disabled && !itemDisabled,
			'cursor-default': disabled || itemDisabled,
			'pointer-events-none': disabled || itemDisabled
		}"
	>
		<slot />

		<slot name="prepend">
			<VIcon v-if="prependIcon" class="mr-3" :icon="prependIcon" />
		</slot>
		<slot name="item" :item="item" :index="index">
			<span class="text-[16px] text-[var(--on-surface)]">{{ title }}</span>
		</slot>

		<slot name="append">
			<VIcon v-if="appendIcon" class="ml-3" :icon="appendIcon" />
		</slot>
	</div>
</template>
<script setup>
	import { VIcon } from 'vuetify/components'

	defineProps({
		item: {
			type: Object
		},
		itemSize: {
			type: String
		},
		title: {
			type: String
		},
		itemDisabled: {
			type: String
		},
		disabled: {
			type: Boolean
		},
		index: {
			type: Number
		},
		appendIcon: {
			type: [String, undefined]
		},
		prependIcon: {
			type: [String, undefined]
		}
	})
</script>
