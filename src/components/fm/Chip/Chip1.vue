<template>
	<VChip
		v-bind="vChipProps"
		:class="[
			'fm-chip',
			{ 'fm-chip--selected': selected },
		]"
		@click.stop.prevent="emits('click', $event)"
		@click:close="onCloseClick"
		@update:model-value="emits('update:modelValue', $event)"
	>
		<slot />

		<template v-if="props.closable" #close>
			<VIcon icon="mdi-close" />
		</template>

		<template v-if="prependIconProps" #prepend>
			<VIcon
				v-bind="prependIconProps"
				class="fm-chip__prepend-icon"
				@click.stop.prevent="emits('click:prepend', $event)"
			/>
		</template>

		<template v-if="appendIconProps" #append>
			<VIcon
				v-bind="appendIconProps"
				class="fm-chip__append-icon"
				@click.stop.prevent="emits('click:append', $event)"
			/>
		</template>
	</VChip>
</template>

<script setup>
	import { computed } from 'vue'
	import { VIcon, VChip } from 'vuetify/components'

	const props = defineProps({
		modelValue: {
			type: String
		},
		closable: {
			type: Boolean
		},
		prependIcon: {
			type: [String, Object] // { icon: string; size: string | number; color: string }
		},
		appendIcon: {
			type: [String, Object] // { icon: string; size: string | number; color: string }
		},
		rounded: {
			type: Boolean
		},
		elevation: {
			type: Boolean,
		},
		selected: {
			type: Boolean,
		},
		draggable: {
			type: Boolean
		},
		disabled: {
			type: Boolean
		}
	})

	const emits = defineEmits([
		'click',
		'click:close',
		'click:prepend',
		'click:append',
		'update:modelValue'
	])

	const prependIconProps = computed(() => {
		if (!props.prependIcon) {
			return false
		}

		if (typeof props.prependIcon === 'string') {
			return {
				icon: props.prependIcon,
				size: 16,
				color: 'var(--on-surface-variant)',
			}
		}

		if (!props.prependIcon.icon) {
			return false
		}

		return {
			icon: props.prependIcon.icon,
			size: props.prependIcon.size || 16,
			color: props.prependIcon.color || 'var(--on-surface-variant)',
		}
	})

	const appendIconProps = computed(() => {
		if (!props.appendIcon) {
			return false
		}

		if (typeof props.appendIcon === 'string') {
			return {
				icon: props.appendIcon,
				size: 16,
				color: 'var(--on-surface-variant)',
			}
		}

		if (!props.appendIcon.icon) {
			return false
		}

		return {
			icon: props.appendIcon.icon,
			size: props.appendIcon.size || 16,
			color: props.appendIcon.color || 'var(--on-surface-variant)',
		}
	})

	const vChipProps = computed(() => ({
		label: true,
		variant: props.selected ? 'flat' : 'outlined',
		...(props.selected && { color: 'var(--secondary-container)' }),
		...(props.elevation && { elevation: 6 }),
		modelValue: props.modelValue,
		closable: props.closable,
		rounded: props.rounded ? 'xl' : 'lg',
		draggable: props.draggable,
		disabled: props.disabled
	}))

	function onCloseClick(ev) {
		ev.stopImmediatePropagation()
		ev.preventDefault()
		emits('click:close', ev)
	}
</script>

<style lang="scss" scoped>
	.fm-chip {
		--color-fmChip: var(--on-surface-variant);

		width: max-content;
		max-width: 100%;

		:deep(.v-chip__content) {
			color: var(--color-fmChip);
		}

		:deep(.v-chip__close) {
			color: var(--color-fmChip);
		}
	}

	.fm-chip__prepend-icon {
		margin-right: 6px;
	}

	.fm-chip__append-icon {
		margin: 0 -6px 0 6px;
	}

	.fm-chip.rounded-xl {
		padding-left: var(--spacing-4);
	}

	.fm-chip.fm-chip--selected {
		--color-fmChip: var(--on-secondary-container);
	}
</style>
