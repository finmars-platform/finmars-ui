<template>
	<VTooltip
		v-bind="$props"
		:max-width="$props?.maxWidth || (type === 'primary' ? 320 : 200)"
	>
		<template #activator="{ isActive, props, targetRef}">
			<slot name="activator" :is-active="isActive" :props="props" :target-ref="targetRef" />
		</template>

		<template #default>
			<div :class="['fm-tooltip', `${type}`]">
				<slot name="default" />
			</div>
		</template>
	</VTooltip>
</template>

<script setup>
	import { useAttrs } from 'vue'
	import { VTooltip } from 'vuetify/components'

	const { type = 'primary' } = useAttrs()
</script>

<style>
	.v-overlay-container {
		.v-overlay.v-tooltip {
			.v-overlay__content {
				padding: 0;
				background: transparent;
			}
		}
	}
</style>

<style lang="scss" scoped>
	.fm-tooltip {
		position: relative;
		width: max-content;
		background-color: var(--backgroundColor-fmTooltip);
		border-radius: var(--borderRadius-fmTooltip);
		padding: var(--padding-fmTooltip);
		font: var(--font-fmTooltip);
		font-weight: 400;
		color: var(--color-fmTooltip);
		max-width: 100%;
	}

	.primary {
		--backgroundColor-fmTooltip: var(--surface-container);
		--color-fmTooltip: var(--on-surface-variant);
		--font-fmTooltip: 14px/20px;
		--borderRadius-fmTooltip: 12px;
		--padding-fmTooltip: 12px var(--spacing-16);

		box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.3);
	}

	.secondary {
		--backgroundColor-fmTooltip: var(--inverse-surface);
		--color-fmTooltip: var(--inverse-on-surface);
		--font-fmTooltip: 12px/16px;
		--borderRadius-fmTooltip: var(--spacing-4);
		--padding-fmTooltip: var(--spacing-4) var(--spacing-8);
	}
</style>


