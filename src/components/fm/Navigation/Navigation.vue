<template>
	<aside
		class="sidebar flex-col h-[calc(100vh-80px)] px-[16px] border-r border-solid border-sidenav-borderColor bg-sidenav-backgroundColor"
		:class="[
			{
				hoverable: isOnlyIcon && !isFloat,
				'min-w-[360px]': !isOnlyIcon,
				'min-w-[96px]': isOnlyIcon,
				'relative flex': !isFloat
			}
		]"
	>
		<div class="scroll-variant-thin overflow-y-scroll max-h-[calc(100vh-132px)]">
			<NavigationItem
				v-for="item in items"
				:key="item.key"
				:label="item.label"
				:icon="item.icon"
				:action="item.action"
				:to="item.to"
				:href="item.href"
				:style="item.style"
				:classes="item.classes"
				:children="item.children"
				:isOnlyIcon="isOnlyIcon"
				:alternativeLink="alternativeLink"
				:route="route"
				:level="0"
			/>
		</div>

		<div
			class="mt-auto flex grow-0 items-center justify-end h-[48px] px-[12px] py-[16px] border-solid border-t-[1px] border-t-sidenavFooter-borderColor bg-sidenavFooter-backgroundColor"
		>
			<FmIconButton
				:style="{
					color: 'var(--sidenavToggleButton-color)'
				}"
				class="icon hover:bg-sidenavToggleButton-backgroundColor text-2xl bg-sidenavToggleButton-backgroundColor p-0 m-0 border-sidenavToggleButton-borderColor"
				:icon="isOnlyIcon || isFloat ? 'mdi-chevron-right' : 'mdi-chevron-left'"
				@click="onIconClick"
				variant="text"
			/>
		</div>

		<transition name="slide-fade">
			<Navigation
				v-if="!isFloat && isOnlyIcon"
				@close="onClose"
				:items="items"
				:isFloat="true"
				:alternativeLink="alternativeLink"
				:route="route"
				class="absolute z-[62] top-0 left-0 hidden h-full float"
			/>
		</transition>
	</aside>
</template>

<script setup>
	import Navigation from '@/components/fm/Navigation/Navigation.vue';
	import NavigationItem from '@/components/fm/Navigation/NavigationItem.vue';
	import FmIconButton from '@/components/fm/IconButton/IconButton.vue';
	import { ref } from 'vue';

	const props = defineProps({
		isFloat: Boolean, // only for self
		items: Array,
		alternativeLink: String, // for NuxtLink or RouterLink
		route: Object // $route of main app
	});

	const emit = defineEmits(['close', 'resizeSideNav']);

	const isOnlyIcon = ref(false);

	async function onIconClick() {
		if (props.isFloat) {
			emit('close');
		} else {
			setIsOnlyIcon(true);
		}
	}

	async function onClose() {
		setIsOnlyIcon(false);
	}

	function setIsOnlyIcon(val) {
		isOnlyIcon.value = val;
		emit('resizeSideNav', isOnlyIcon.value);
	}
</script>

<style scoped lang="scss">
	.sidebar {
		--sidenav-backgroundColor: var(--surface);
		--sidenav-borderColor: var(--outline-variant);

		/* --sidenavOption (styles for menu options) */
		--sidenavOption-color: var(--on-surface-variant);
		--sidenavOption-backgroundColor: transparent;
		--sidenavOptionLeftIcon-color: var(--on-surface-variant);
		--sidenavOptionRightIcon-color: var(--on-surface-variant);

		/* Sidenav options states */
		/* Hover */
		--sidenavOption-hover-backgroundColor: color-mix(
			in srgb,
			var(--on-surface-variant) 8%,
			transparent
		);
		--sidenavOption-hover-color: var(--on-surface-variant);

		/* Focus */
		--sidenavOption-focus-backgroundColor: color-mix(
			in srgb,
			var(--on-surface-variant) 12%,
			transparent
		);
		--sidenavOption-focus-color: var(--on-surface-variant);

		/* Active (called Pressed inside figma) */
		--sidenavOption-active-backgroundColor: color-mix(
			in srgb,
			var(--on-surface-variant) 12%,
			transparent
		);

		/* Activated (Highlighted menu option that matches to the web page that a user currently on) */
		--sidenavOption-activated-backgroundColor: var(--secondary-container);
		--sidenavOption-activated-color: var(--on-surface);

		/* Disabled */
		--sidenavOption-disabled-backgroundColor: var(--sidenavOption-backgroundColor);
		--sidenavOption-disabled-color: var(--sidenavOption-color);

		/* --sidenavOption2 (options inside the first level groups) */
		--sidenavOption2-color: var(--sidenavOption-color);
		--sidenavOption2LeftIcon-color: var(--on-surface-variant);
		--sidenavOption2RightIcon-color: var(--on-surface-variant);

		/* Sidenav options states */
		/* Hover */

		/* Focus */
		--sidenavOption2-focus-backgroundColor: var(--sidenavOption-focus-backgroundColor);

		/* Active (called Pressed inside figma) */
		--sidenavOption2-active-backgroundColor: var(--sidenavOption-active-backgroundColor);

		--sidenavOption2-activated-color: var(--sidenavOption-activated-color);

		/* Disabled */
		--sidenavOption2-disabled-backgroundColor: var(--sidenavOption-backgroundColor);
		--sidenavOption2-disabled-color: var(--sidenavOption-color);

		/* --sidenavOption3 (options inside the second level groups) */
		--sidenavOption3-color: var(--sidenavOption-color);
		--sidenavOption3LeftIcon-color: var(--on-surface-variant);
		--sidenavOption3RightIcon-color: var(--on-surface-variant);

		/* States of sidenav options */
		/* Hover */
		--sidenavOption3-hover-backgroundColor: var(--sidenavOption-hover-backgroundColor);
		--sidenavOption3-focus-color: var(--sidenavOption-focus-color);
		/* Active (called Pressed inside figma) */
		--sidenavOption3-active-backgroundColor: var(--sidenavOption-active-backgroundColor);
		/* Activated (Highlighted menu option that matches to the web page that a user currently on) */
		--sidenavOption3-activated-backgroundColor: var(--sidenavOption-activated-backgroundColor);
		--sidenavOption3-activated-color: var(--sidenavOption-activated-color);

		/* Disabled */
		--sidenavOption3-disabled-backgroundColor: var(--sidenavOption-backgroundColor);
		--sidenavOption3-disabled-color: var(--sidenavOption-color);

		/* Footer */
		--sidenavFooter-borderColor: var(--outline-variant);
		--sidenavFooter-backgroundColor: transparent;
		--sidenavToggleButton-color: var(--on-surface-variant);
		--sidenavToggleButton-backgroundColor: transparent;

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
		transition: transform 0.3s;
	}

	.slide-fade-enter-from,
	.slide-fade-leave-to {
		pointer-events: none;
	}
</style>
