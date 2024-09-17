<template>
  <div
      :style="[
			{
				'--custom-padding': paddingValue,
				'--custom-height': heightValue,
				'--custom-border-style': borderStyleValue,
				'--custom-border-width': borderWidthValue,
				'--custom-border-color': borderColorValue,
				'border-style': 'var(--custom-border-style)',
				'border-color': 'var(--custom-border-color)',
				'border-width': 'var(--custom-border-width)',
				'--custom-border-radius': borderRadiusValue
			},
			style
		]"
      class="sidebar-item-label flex items-center cursor-pointer select-none border rounded transition-all duration-300"
      :class="[
			backgroundClass,
			{
				'hover:bg-[var(--sidenavOption-hover-backgroundColor)] focus:bg-[var(--sidenavOption-focus-backgroundColor)] active:bg-[var(--sidenavOption-active-backgroundColor)]': true,
				'rounded-[var(--custom-border-radius)]': true,
				'opacity-[var(--sidenavOption-disabled-opacity)]': isDisabled,
				'p-[var(--custom-padding)] h-[var(--custom-height)]': true,
				'pointer-events-none': isActive
			}
		]"
  >
    <FmIcon
        :class="iconClass"
        :icon="icon"
        :style="{ color: iconColorValue }"
    />
    <div
        v-if="!isOnlyIcon"
        :class="labelClass"
        class="pointer-events-none"
        :style="{
				marginLeft: marginLeftValue
			}"
    >
      <slot />
    </div>
    <FmIcon
        v-if="!isOnlyIcon"
        :icon="appendIcon"
        :class="appendIconClass"
        class="pointer-events-none"
        :style="{
				marginLeft: appendIconMarginLeftValue,
				color: appendIconColorValue
			}"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import FmIcon from '@/components/Fm/Icon.vue'

const props = defineProps({
  icon: String,
  style: Object,
  appendIcon: String,
  isActive: Boolean,
  isOnlyIcon: Boolean,
  isDisabled: Boolean,
  level: Number // 0, 1, 2
})

const paddingValue = computed(() => {
  if (props.level === 0) {
    return 'var(--sidenavOption-padding)'
  } else if (props.level === 1) {
    return 'var(--sidenavOption2-padding)'
  } else {
    return 'var(--sidenavOption3-padding)'
  }
})

const heightValue = computed(() => {
  return 'var(--sidenavOption-height)'
})

const backgroundClass = computed(() => {
  if (props.isDisabled) {
    return 'bg-[var(--sidenavOption-disabled-backgroundColor)]'
  } else if (props.isActive) {
    return 'bg-[var(--sidenavOption-activated-backgroundColor)]'
  } else if (props.level === 0) {
    return 'bg-[var(--sidenavOption-backgroundColor)]'
  } else if (props.level === 1) {
    return 'bg-[var(--sidenavOption2-backgroundColor)]'
  } else {
    return 'bg-[var(--sidenavOption3-backgroundColor)]'
  }
})

const borderStyleValue = computed(() => {
  if (props.level === 0) {
    return 'var(--sidenavOption-borderStyle)'
  } else if (props.level === 1) {
    return 'var(--sidenavOption2-borderStyle)'
  } else {
    return 'var(--sidenavOption3-borderStyle)'
  }
})

const borderWidthValue = computed(() => {
  if (props.level === 0) {
    return 'var(--sidenavOption-borderWidth)'
  } else if (props.level === 1) {
    return 'var(--sidenavOption2-borderWidth)'
  } else {
    return 'var(--sidenavOption3-borderWidth)'
  }
})

const borderColorValue = computed(() => {
  if (props.level === 0) {
    return 'var(--sidenavOption-borderColor)'
  } else if (props.level === 1) {
    return 'var(--sidenavOption2-borderColor)'
  } else {
    return 'var(--sidenavOption3-borderColor)'
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

const borderRadiusValue = computed(() => {
  return 'var(--sidenavOption-borderRadius)'
})

const marginLeftValue = computed(() => {
  if (props.level === 0) {
    return 'var(--sidenavOptionLabel-margin-left)'
  } else if (props.level === 1) {
    return 'var(--sidenavOption2Label-margin-left)'
  } else {
    return 'var(--sidenavOption3Label-margin-left)'
  }
})

const appendIconMarginLeftValue = computed(() => {
  if (props.level === 0) {
    return 'var(--sidenavOptionRightIcon-margin-left)'
  } else if (props.level === 1) {
    return 'var(--sidenavOption2RightIcon-margin-left)'
  } else {
    return 'var(--sidenavOption3RightIcon-margin-left)'
  }
})

const iconClass = computed(() => {
  if (props.level === 0) {
    return 'text-sidenavOptionLeftIcon-fontSize w-[var(--sidenavOptionLeftIcon-fontSize)]'
  } else if (props.level === 1) {
    return 'text-sidenavOption2LeftIcon-fontSize w-[var(--sidenavOption2LeftIcon-fontSize)]'
  } else {
    return 'text-sidenavOption3LeftIcon-fontSize w-[var(--sidenavOption3LeftIcon-fontSize)]'
  }
})

const labelClass = computed(() => {
  if (props.level === 0) {
    return 'text-sidenavOption-color text-sidenavOption-fontWeight text-sidenavOption-fontSize font-sidenavOption-fontFamily'
  } else if (props.level === 1) {
    return 'text-sidenavOption2-color text-sidenavOption2-fontWeight text-sidenavOption2-fontSize font-sidenavOption2-fontFamily'
  } else {
    return 'text-sidenavOption3-color text-sidenavOption3-fontWeight text-sidenavOption3-fontSize font-sidenavOption3-fontFamily'
  }
})

const appendIconClass = computed(() => {
  if (props.level === 0) {
    return 'text-sidenavOptionRightIcon-fontSize'
  } else if (props.level === 1) {
    return 'text-sidenavOption2RightIcon-fontSize'
  } else {
    return 'text-sidenavOption3RightIcon-fontSize'
  }
})
</script>

<style scoped lang="postcss">
.sidebar-item-label {
}
</style>
