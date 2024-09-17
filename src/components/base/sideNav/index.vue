<template>
  <aside
      class="sidebar z-[62] flex-col h-[calc(100vh-52px)] p-4 border-r border-sidenav-borderColor bg-sidenav-backgroundColor"
      :class="[
			{
				hoverable: isOnlyIcon && !isFloat,
				'min-w-sidenavExpanded-width': !isOnlyIcon,
				'min-w-sidenavCollapsed-width': isOnlyIcon,
				'relative flex': !isFloat
			}
		]"
      :style="{
			borderRightWidth: 'var(--sidenav-borderWidth)',
			borderRightStyle: 'var(--sidenav-borderStyle)'
		}"
  >
    <div class="overflow-y-scroll max-h-[calc(100vh-132px)]">
      <div v-for="item in items.slice(0, -2)" :key="item.key">
        <SideNavItem
            :label="item.label"
            :icon="item.icon"
            :action="item.action"
            :to="item.to"
            :href="item.href"
            :style="item.style"
            :children="item.children"
            :isOnlyIcon="isOnlyIcon"
            :alternativeLink="alternativeLink"
            :route="route"
            :level="0"
        />
      </div>
      <div class="h-px bg-[var(--sidenav-borderColor)] my-2 mx-4"></div>
      <div v-for="item in items.slice(-2)" :key="item.key">
        <SideNavItem
            :label="item.label"
            :icon="item.icon"
            :action="item.action"
            :to="item.to"
            :href="item.href"
            :style="item.style"
            :children="item.children"
            :isOnlyIcon="isOnlyIcon"
            :alternativeLink="alternativeLink"
            :route="route"
            :level="0"
        />
      </div>
    </div>

    <div
        class="mt-auto flex grow-0 items-center justify-end h-sidenavFooter-height p-sidenavFooter-padding border-solid border-t border-t-sidenavFooter-borderColor bg-sidenavFooter-backgroundColor"
    >
      <FmIconBtn
          :style="{
					borderRadius: 'var(--sidenavToggleButton-borderRadius)',
					outline: 'var(--sidenavToggleButton-outline)',
					borderWidth: 'var(--sidenavToggleButton-borderWidth)',
					borderStyle: 'var(--sidenavToggleButton-borderStyle)',
					color: 'var(--sidenavToggleButton-color)'
				}"
          class="icon hover:bg-sidenavToggleButton-backgroundColor text-sidenavToggleButton-fontSize bg-sidenavToggleButton-backgroundColor p-sidenavToggleButton-padding m-sidenavToggleButton-margin border-sidenavToggleButton-borderColor"
          :icon="
					isOnlyIcon || isFloat ? 'keyboard_arrow_right' : 'keyboard_arrow_left'
				"
          @click="onIconClick"
      />
    </div>

    <transition name="slide-fade">
      <BaseSideNav
          v-if="!isFloat && isOnlyIcon"
          @close="onClose"
          :items="items"
          :isFloat="true"
          :alternativeLink="alternativeLink"
          :route="route"
          class="absolute top-0 left-0 hidden h-full float"
      />
    </transition>
  </aside>
</template>

<script setup>
import FmIconBtn from '@/components/fm/IconBtn.vue'
import BaseSideNav from '@/components/base/sideNav/index.vue'
import SideNavItem from '@/components/base/sideNav/item.vue'
import { ref } from 'vue'

const props = defineProps({
  isFloat: Boolean, // only for self
  items: Array,
  alternativeLink: String, // for NuxtLink or RouterLink
  route: Object // $route of main app
})

const emit = defineEmits(['close'])

const isOnlyIcon = ref(false)

async function onIconClick() {
  if (props.isFloat) {
    emit('close')
  } else {
    isOnlyIcon.value = true
  }
}

async function onClose() {
  isOnlyIcon.value = false
}
</script>

<style>
:root {
  --sidenavExpanded-width: 360px;
  --sidenavCollapsed-width: 96px;

  --sidenav-backgroundColor: #ffffff;
  --sidenav-borderColor: #d8c2bc;
  --sidenav-borderStyle: solid;
  --sidenav-borderWidth: 1px;

  /* --sidenavOption (styles for menu options) */
  --sidenavOption-color: #53433f;
  --sidenavOption-backgroundColor: transparent;

  --sidenavOption-fontSize: 14px;
  --sidenavOption-fontWeight: 500;
  --sidenavOption-fontFamily: sans-serif;
  --sidenavOption-textTransform: auto;

  --sidenavOptionLeftIcon-fontSize: 24px;
  --sidenavOptionLeftIcon-color: #53433f;

  --sidenavOptionLabel-margin-left: 16px;

  --sidenavOptionRightIcon-fontSize: 24px;
  --sidenavOptionRightIcon-color: #53433f;

  --sidenavOptionRightIcon-margin-left: auto;

  --sidenavOption-height: 56px;
  --sidenavOption-padding: 0 16px;

  --sidenavOption-borderStyle: solid;
  --sidenavOption-borderWidth: 0;
  --sidenavOption-borderColor: transparent;
  --sidenavOption-borderRadius: 28px;

  --sidenavOption-outlineWidth: 51px;
  --sidenavOption-outlineColor: none;

  --sidenavOption-margin: 0;

  /* Sidenav options states */
  /* Hover */
  --sidenavOption-hover-backgroundColor: rgba(29, 27, 32, 0.08);
  --sidenavOption-hover-opacity: 0;

  --sidenavOption-hover-color: #53433f;

  --sidenavOption-hover-fontWeight: 500;

  --sidenavOption-hover-borderColor: transparent;
  --sidenavOption-hover-outlineWidth: none;
  --sidenavOption-hover-outlineColor: none;

  /* Focus */
  --sidenavOption-focus-backgroundColor: rgba(29, 27, 32, 0.12);

  --sidenavOption-focus-color: #53433f;

  --sidenavOption-focus-fontWeight: 500;

  --sidenavOption-focus-borderColor: transparent;
  --sidenavOption-focus-outlineWidth: none;
  --sidenavOption-focus-outlineColor: none;

  /* Active (called Pressed inside figma) */
  --sidenavOption-active-backgroundColor: rgba(29, 27, 32, 0.12);

  /* Activated (Highlighted menu option that matches to the web page that a user currently on) */
  --sidenavOption-activated-backgroundColor: #ffdbd0;

  --sidenavOption-activated-color: #2c160e;

  --sidenavOption-activated-fontWeight: 600;

  --sidenavOption-activated-borderColor: transparent;
  --sidenavOption-activated-outlineWidth: none;
  --sidenavOption-activated-outlineColor: none;

  /* Disabled */
  --sidenavOption-disabled-backgroundColor: var(
      --sidenavOption-backgroundColor
  );
  --sidenavOption-disabled-opacity: initial;

  --sidenavOption-disabled-color: var(--sidenavOption-color);

  /* --sidenavOption2 (options inside the first level groups) */
  --sidenavOption2-color: var(--sidenavOption-color);

  --sidenavOption2-fontSize: var(--sidenavOption-fontSize);
  --sidenavOption2-fontWeight: var(--sidenavOption-fontWeight);
  --sidenavOption2-fontFamily: var(--sidenavOption-fontFamily);
  --sidenavOption2-textTransform: var(--sidenavOption-textTransform);

  --sidenavOption2LeftIcon-fontSize: 24px;
  --sidenavOption2LeftIcon-color: #53433f;

  --sidenavOption2Label-margin-left: 16px;

  --sidenavOption2RightIcon-fontSize: 24px;
  --sidenavOption2RightIcon-color: #53433f;

  --sidenavOption2RightIcon-margin-left: 16px;

  --sidenavOption2-padding: var(--sidenavOption-padding);

  --sidenavOption2-borderStyle: var(--sidenavOption-borderStyle);
  --sidenavOption2-borderWidth: var(--sidenavOption-borderWidth);
  --sidenavOption2-borderColor: var(--sidenavOption-borderColor);

  --sidenavOption2-margin: var(--sidenavOption-margin);

  /* Sidenav options states */
  /* Hover */
  --sidenavOption2-hover-backgroundColor: var(
      --sidenavOption-hover-backgroundColor
  );
  --sidenavOption2-hover-opacity: var(--sidenavOption-hover-opacity);

  --sidenavOption2-hover-color: var(--sidenavOption-hover-color);

  --sidenavOption2-hover-fontWeight: var(--sidenavOption-hover-fontWeight);

  --sidenavOption2-hover-borderColor: var(--sidenavOption-hover-borderColor);
  --sidenavOption2-hover-outlineWidth: var(
      --sidenavOption-hover-outlineWidth
  );
  --sidenavOption2-hover-outlineColor: var(
      --sidenavOption-hover-outlineColor
  );

  /* Focus */
  --sidenavOption2-focus-backgroundColor: var(
      --sidenavOption-focus-backgroundColor
  );

  --sidenavOption2-focus-color: var(--sidenavOption-focus-color);

  --sidenavOption2-focus-fontWeight: var(--sidenavOption-focus-fontWeight);

  --sidenavOption2-focus-borderColor: var(--sidenavOption-focus-borderColor);
  --sidenavOption2-focus-outlineWidth: var(
      --sidenavOption-focus-outlineWidth
  );
  --sidenavOption2-focus-outlineColor: var(
      --sidenavOption-focus-outlineColor
  );

  /* Active (called Pressed inside figma) */
  --sidenavOption2-active-backgroundColor: var(
      --sidenavOption-active-backgroundColor
  );
  /* Activated (Highlighted menu option that matches to the web page that a user currently on) */
  --sidenavOption2-activated-backgroundColor: var(
      --sidenavOption-activated-backgroundColor
  );

  --sidenavOption2-activated-color: var(--sidenavOption-activated-color);

  --sidenavOption2-activated-fontWeight: var(
      --sidenavOption-activated-fontWeight
  );

  --sidenavOption2-activated-borderColor: var(
      --sidenavOption-activated-borderColor
  );
  --sidenavOption2-activated-outlineWidth: var(
      --sidenavOption-activated-outlineWidth
  );
  --sidenavOption2-activated-outlineColor: var(
      --sidenavOption-activated-outlineColor
  );

  /* Disabled */
  --sidenavOption2-disabled-backgroundColor: var(
      --sidenavOption-backgroundColor
  );
  --sidenavOption2-disabled-opacity: initial;

  --sidenavOption2-disabled-color: var(--sidenavOption-color);

  /* --sidenavOption3 (options inside the second level groups) */
  --sidenavOption3-color: var(--sidenavOption-color);

  --sidenavOption3-fontSize: var(--sidenavOption-fontSize);
  --sidenavOption3-fontWeight: var(--sidenavOption-fontWeight);
  --sidenavOption3-fontFamily: var(--sidenavOption-fontFamily);
  --sidenavOption3-textTransform: var(--sidenavOption-textTransform);

  --sidenavOption3LeftIcon-fontSize: 24px;
  --sidenavOption3LeftIcon-color: #53433f;

  --sidenavOption3Label-margin-left: 16px;

  --sidenavOption3RightIcon-fontSize: 24px;
  --sidenavOption3RightIcon-color: #53433f;

  --sidenavOption3RightIcon-margin-left: auto;

  --sidenavOption3-padding: var(--sidenavOption-padding);

  --sidenavOption3-borderStyle: var(--sidenavOption-borderStyle);
  --sidenavOption3-borderWidth: var(--sidenavOption-borderWidth);
  --sidenavOption3-borderColor: var(--sidenavOption-borderColor);

  --sidenavOption3-margin: var(--sidenavOption-margin);

  /* States of sidenav options */
  /* Hover */
  --sidenavOption3-hover-backgroundColor: var(
      --sidenavOption-hover-backgroundColor
  );
  --sidenavOption3-hover-opacity: var(--sidenavOption-hover-opacity);

  --sidenavOption3-hover-color: var(--sidenavOption-hover-color);

  --sidenavOption3-hover-fontWeight: var(--sidenavOption-hover-fontWeight);

  --sidenavOption3-hover-borderColor: var(--sidenavOption-hover-borderColor);
  --sidenavOption3-hover-outlineWidth: var(
      --sidenavOption-hover-outlineWidth
  );
  --sidenavOption3-hover-outlineColor: var(
      --sidenavOption-hover-outlineColor
  );

  /* Focus */
  --sidenavOption3-focus-backgroundColor: var(
      --sidenavOption-focus-backgroundColor
  );

  --sidenavOption3-focus-color: var(--sidenavOption-focus-color);

  --sidenavOption3-focus-fontWeight: var(--sidenavOption-focus-fontWeight);

  --sidenavOption3-focus-borderColor: var(--sidenavOption-focus-borderColor);
  --sidenavOption3-focus-outlineWidth: var(
      --sidenavOption-focus-outlineWidth
  );
  --sidenavOption3-focus-outlineColor: var(
      --sidenavOption-focus-outlineColor
  );

  /* Active (called Pressed inside figma) */
  --sidenavOption3-active-backgroundColor: var(
      --sidenavOption-active-backgroundColor
  );

  /* Activated (Highlighted menu option that matches to the web page that a user currently on) */
  --sidenavOption3-activated-backgroundColor: var(
      --sidenavOption-activated-backgroundColor
  );

  --sidenavOption3-activated-color: var(--sidenavOption-activated-color);

  --sidenavOption3-activated-fontWeight: var(
      --sidenavOption-activated-fontWeight
  );

  --sidenavOption3-activated-borderColor: var(
      --sidenavOption-activated-borderColor
  );
  --sidenavOption3-activated-outlineWidth: var(
      --sidenavOption-activated-outlineWidth
  );
  --sidenavOption3-activated-outlineColor: var(
      --sidenavOption-activated-outlineColor
  );

  /* Disabled */
  --sidenavOption3-disabled-backgroundColor: var(
      --sidenavOption-backgroundColor
  );
  --sidenavOption3-disabled-opacity: initial;

  --sidenavOption3-disabled-color: var(--sidenavOption-color);

  /* Footer */
  --sidenavFooter-height: 48px;
  --sidenavFooter-borderColor: #d8c2bc;
  --sidenavFooter-backgroundColor: transparent;
  --sidenavFooter-padding: 16px;

  --sidenavToggleButton-fontSize: 24px;
  --sidenavToggleButton-color: #53433f;
  --sidenavToggleButton-backgroundColor: transparent;
  --sidenavToggleButton-padding: 0;
  --sidenavToggleButton-margin: 0;

  --sidenavToggleButton-borderWidth: 0;
  --sidenavToggleButton-borderStyle: solid;
  --sidenavToggleButton-borderColor: transparent;
  --sidenavToggleButton-borderRadius: 50%;

  --sidenavToggleButton-outline: none;
}

/* Переменные для тёмной темы */

body.dark-mode {
  --sidenav-backgroundColor: #1a110f;
  --sidenav-borderColor: #ffdbd0;

  /* --sidenavOption (styles for menu options) */
  --sidenavOption-color: #d8c2bc;
  --sidenavOption-backgroundColor: transparent;

  --sidenavOptionLeftIcon-color: #d8c2bc;

  --sidenavOptionRightIcon-color: #d8c2bc;

  --sidenavOption-borderColor: transparent;

  --sidenavOption-outlineColor: none;
  --sidenavOption-hover-backgroundColor: rgba(230, 224, 233, 0.08);
  --sidenavOption-hover-opacity: 0;

  --sidenavOption-hover-color: #d8c2bc;

  --sidenavOption-hover-fontWeight: 500;

  --sidenavOption-hover-borderColor: none;
  --sidenavOption-hover-outlineColor: none;

  /* Focus */
  --sidenavOption-focus-backgroundColor: rgba(230, 224, 233, 0.12);

  --sidenavOption-focus-color: #d8c2bc;

  --sidenavOption-focus-borderColor: none;
  --sidenavOption-focus-outlineColor: none;

  /* Active (called Pressed inside figma) */
  --sidenavOption-active-backgroundColor: rgba(230, 224, 233, 0.12);

  /* Activated (Highlighted menu option that matches to the web page that a user currently on) */
  --sidenavOption-activated-backgroundColor: #5d4036;

  --sidenavOption-activated-color: #ffdbd0;

  --sidenavOption-activated-borderColor: none;
  --sidenavOption-activated-outlineColor: none;

  /* Disabled */
  --sidenavOption-disabled-backgroundColor: var(
      --sidenavOption-backgroundColor
  );
  --sidenavOption-disabled-opacity: initial;

  --sidenavOption-disabled-color: var(--sidenavOption-color);

  /* --sidenavOption2 (options inside the first level groups) */
  --sidenavOption2-color: var(--sidenavOption-color);

  --sidenavOption2LeftIcon-color: #d8c2bc;

  --sidenavOption2RightIcon-color: #d8c2bc;

  --sidenavOption2-borderColor: var(--sidenavOption-borderColor);

  /* Sidenav options states */
  /* Hover */
  --sidenavOption2-hover-backgroundColor: var(
      --sidenavOption-hover-backgroundColor
  );
  --sidenavOption2-hover-opacity: var(--sidenavOption-hover-opacity);

  --sidenavOption2-hover-color: var(--sidenavOption-hover-color);

  --sidenavOption2-hover-borderColor: var(--sidenavOption-hover-borderColor);
  --sidenavOption2-hover-outlineColor: var(
      --sidenavOption-hover-outlineColor
  );

  /* Focus */
  --sidenavOption2-focus-backgroundColor: var(
      --sidenavOption-focus-backgroundColor
  );

  --sidenavOption2-focus-color: var(--sidenavOption-focus-color);

  --sidenavOption2-focus-borderColor: var(--sidenavOption-focus-borderColor);
  --sidenavOption2-focus-outlineColor: var(
      --sidenavOption-focus-outlineColor
  );

  /* Active (called Pressed inside figma) */
  --sidenavOption2-active-backgroundColor: var(
      --sidenavOption-active-backgroundColor
  );
  /* Activated (Highlighted menu option that matches to the web page that a user currently on) */
  --sidenavOption2-activated-backgroundColor: var(
      --sidenavOption-activated-backgroundColor
  );

  --sidenavOption2-activated-color: var(--sidenavOption-activated-color);

  --sidenavOption2-activated-borderColor: var(
      --sidenavOption-activated-borderColor
  );
  --sidenavOption2-activated-outlineColor: var(
      --sidenavOption-activated-outlineColor
  );

  /* Disabled */
  --sidenavOption2-disabled-backgroundColor: var(
      --sidenavOption-backgroundColor
  );
  --sidenavOption2-disabled-opacity: initial;

  --sidenavOption2-disabled-color: var(--sidenavOption-color);

  /* --sidenavOption3 (options inside the second level groups) */
  --sidenavOption3-color: var(--sidenavOption-color);

  --sidenavOption3LeftIcon-color: #d8c2bc;

  --sidenavOption3RightIcon-color: #d8c2bc;

  /* States of sidenav options */
  /* Hover */
  --sidenavOption3-hover-backgroundColor: var(
      --sidenavOption-hover-backgroundColor
  );
  --sidenavOption3-hover-opacity: var(--sidenavOption-hover-opacity);

  --sidenavOption3-hover-color: var(--sidenavOption-hover-color);
  --sidenavOption3-hover-borderColor: var(--sidenavOption-hover-borderColor);
  --sidenavOption3-hover-outlineColor: var(
      --sidenavOption-hover-outlineColor
  );

  /* Focus */
  --sidenavOption3-focus-backgroundColor: var(
      --sidenavOption-focus-backgroundColor
  );

  --sidenavOption3-focus-color: var(--sidenavOption-focus-color);

  --sidenavOption3-focus-borderColor: var(--sidenavOption-focus-borderColor);
  --sidenavOption3-focus-outlineColor: var(
      --sidenavOption-focus-outlineColor
  );

  /* Active (called Pressed inside figma) */
  --sidenavOption3-active-backgroundColor: var(
      --sidenavOption-active-backgroundColor
  );

  /* Activated (Highlighted menu option that matches to the web page that a user currently on) */
  --sidenavOption3-activated-backgroundColor: var(
      --sidenavOption-activated-backgroundColor
  );

  --sidenavOption3-activated-color: var(--sidenavOption-activated-color);

  --sidenavOption3-activated-borderColor: var(
      --sidenavOption-activated-borderColor
  );
  --sidenavOption3-activated-outlineColor: var(
      --sidenavOption-activated-outlineColor
  );

  /* Disabled */
  --sidenavOption3-disabled-backgroundColor: var(
      --sidenavOption-backgroundColor
  );
  --sidenavOption3-disabled-opacity: initial;

  --sidenavOption3-disabled-color: var(--sidenavOption-color);

  /* Footer */
  --sidenavFooter-borderColor: #53433f;
  --sidenavFooter-backgroundColor: transparent;

  --sidenavToggleButton-color: #d8c2bc;
  --sidenavToggleButton-backgroundColor: transparent;

  --sidenavToggleButton-borderColor: none;

  --sidenavToggleButton-outline: none;
}
</style>
<style scoped lang="postcss">
.sidebar {
  &.hoverable {
    &:hover {
      .float {
        display: flex !important;
      }
    }
  }

  &.float {
    box-shadow:
        0 4px 8px 3px rgba(0, 0, 0, 0.15),
        0 1px 3px 0 rgba(0, 0, 0, 0.3);
    transform: translateX(-50%);
    transition:
        transform 0.3s,
        opacity 0.3s;
    opacity: 0;

    &:hover {
      opacity: 1;
      transform: translateX(0);
    }
  }
}

.slide-fade-enter-active {
  transition: transform 0.1s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  pointer-events: none;
}
</style>
