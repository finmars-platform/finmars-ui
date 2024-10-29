<template>
	<div class="grid grid-cols-2 gap-16">
		<!-- primary -->
		<FmTooltip
			v-on="eventHandlers"
		>
			<template #activator="{ props }">
				<FmButton v-bind="props">
					Hover over me (primary)
				</FmButton>
			</template>

			<span>Supporting line text lorem ipsum dolor sit amet, consectetur</span>
		</FmTooltip>

		<FmButton>
			Click me (primary)
			<FmTooltip
				:open-on-hover="false"
				:open-on-click="true"
				activator="parent"
				v-on="eventHandlers"
			>
				Supporting text
			</FmTooltip>
		</FmButton>

		<!-- secondary -->
		<FmTooltip
			type="secondary"
			v-on="eventHandlers"
		>
			<template #activator="{ props }">
				<FmButton v-bind="props">
					Hover over me (secondary)
				</FmButton>
			</template>

			<span>Supporting text</span>
		</FmTooltip>

		<FmButton>
			Click me (secondary)
			<FmTooltip
				type="secondary"
				:open-on-hover="false"
				:open-on-click="true"
				activator="parent"
				v-on="eventHandlers"
			>
				Supporting text Body text string goes here psum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
			</FmTooltip>
		</FmButton>

		<!-- on hover, secondary, custom template -->
		<FmTooltip
			type="secondary"
			v-on="eventHandlers"
		>
			<template #activator="{ props }">
				<FmButton v-bind="props">
					Hover over me (secondary, custom template)
				</FmButton>
			</template>

			<div class="flex flex-col align-center gap-y-4">
				<VIcon icon="mdi-atlassian" color="orange" size="32" />
				<span>Supporting line text lorem ipsum dolor sit amet, consectetur</span>
			</div>
		</FmTooltip>

		<!-- on click, primary, custom template -->
		<FmButton>
			Click me (primary)
			<FmTooltip
				activator="parent"
				:open-on-hover="false"
				:open-on-click="true"
				:close-on-content-click="true"
				v-on="eventHandlers"
				v-model="isTooltipOpen"
			>
				<div class="flex flex-col align-center z-10" style="pointer-events: all">
					<div class="mb-2 text-xl">Title</div>
					<div class="mb-2">
						Supporting text Body text string goes here psum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					</div>
					<FmButton
						type="secondary"
						@click="() => {
							console.log('APPLY');
							isTooltipOpen = false;
						}"
					>
						Apply
					</FmButton>
				</div>
			</FmTooltip>
		</FmButton>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import FmButton from '@/components/fm/Button/Button.vue'
	import FmTooltip from '@/components/fm/Tooltip/Tooltip.vue'
	import { VIcon } from 'vuetify/components'

	const eventHandlers = {
		'update:model-value': (ev) => console.log('update:model-value ', ev),
	}

	const isTooltipOpen = ref(false);
</script>
