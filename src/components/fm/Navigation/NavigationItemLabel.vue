<template>
	<div
		:style="style"
		class="sidebar-item-label flex items-center cursor-pointer select-none transition-all duration-300 h-[56px] py-0 px-4 border-solid border-0 rounded-[28px]"
		:class="[
			backgroundClass,
			{
				'hover:bg-[var(--sidenavOption-hover-backgroundColor)] focus:bg-[var(--sidenavOption-focus-backgroundColor)] active:bg-[var(--sidenavOption-active-backgroundColor)]': true,
				'pointer-events-none': isActive
			}
		]"
	>
		<VIcon
			class="text-[24px] w-[24px]"
			:icon="icon"
			:style="{ color: iconColorValue }"
		/>
		<div
			v-if="!isOnlyIcon"
			class="pointer-events-none font-medium ml-[16px] text-sm text-sidenavOption-color"
		>
			<slot />
		</div>
		<VIcon
			v-if="!isOnlyIcon"
			:icon="appendIcon"
			class="pointer-events-none text-[24px] w-[24px] ml-auto"
			:style="{
				color: appendIconColorValue
			}"
		/>
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	import { VIcon } from 'vuetify/components'

	const props = defineProps({
		icon: String,
		style: Object,
		appendIcon: String,
		isActive: Boolean,
		isOnlyIcon: Boolean,
		isDisabled: Boolean,
		level: Number // 0, 1, 2
	})

	const backgroundClass = computed(() => {
		if (props.isDisabled) {
			return 'bg-[var(--sidenavOption-disabled-backgroundColor)]'
		} else if (props.isActive) {
			return 'bg-[var(--sidenavOption-activated-backgroundColor)]'
		} else {
			return 'bg-[var(--sidenavOption-backgroundColor)]'
		}
	})

	const iconColorValue = computed(() => {
		if (props.level === 0) {
			return 'var(--sidenavOptionLeftIcon-color)'
		} else if (props.level === 1) {
			return 'var(--sidenavOption2LeftIcon-color)'
		} else {
			return 'var(--sidenavOption3LeftIcon-color)'
		}
	})

	const appendIconColorValue = computed(() => {
		if (props.level === 0) {
			return 'var(--sidenavOptionRightIcon-color)'
		} else if (props.level === 1) {
			return 'var(--sidenavOption2RightIcon-color)'
		} else {
			return 'var(--sidenavOption3RightIcon-color)'
		}
	})
</script>

<style scoped lang="postcss">
	.sidebar-item-label {
	}
</style>
