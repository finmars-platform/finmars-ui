<template>
	<div class="grid grid-cols-2 gap-8">
		<FmTabs :tabs="data" @change-tab="handleTabChange" underline="thin" />
		<FmTabs :tabs="data" @change-tab="handleTabChange" underline="bold" />
		<FmTabs :tabs="data" @change-tab="handleTabChange" underline="thin" variant="large" />
		<FmTabs :tabs="data" @change-tab="handleTabChange" underline="bold" variant="large" />
		<FmTabs :tabs="data" @change-tab="handleTabChange" underline="thin" icon="mdi-home-account" />
		<FmTabs :tabs="data" @change-tab="handleTabChange" underline="bold" icon="mdi-home-account" />
		<FmTabs
			prependIcon
			:tabs="data"
			@change-tab="handleTabChange"
			underline="bold"
			icon="mdi-home-account"
		/>
		<FmTabs
			prependIcon
			:tabs="data"
			@change-tab="handleTabChange"
			underline="thin"
			icon="mdi-home-account"
		/>
		<FmTabs
			appendIcon
			:tabs="data"
			@change-tab="handleTabChange"
			underline="thin"
			icon="mdi-home-account"
			variant="large"
		/>
		<FmTabs
			prependIcon
			:tabs="data"
			@change-tab="handleTabChange"
			underline="thin"
			icon="mdi-home-account"
			size="small"
			variant="large"
		/>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import FmTabs from '@/components/fm/Tabs/Tabs.vue';

	const data = ref([{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }]);

	const handleTabChange = (event) => {
		console.log(`Event 'Tab change index' : ${event}`);
	};
</script>
