<template>
	<div class="grid grid-cols-2 gap-8">
		<FmTab :tabs="data" @change-tab="handleTabChange" underline="thin" />
		<FmTab :tabs="data" @change-tab="handleTabChange" underline="bold" />
		<FmTab
			:tabs="data"
			@change-tab="handleTabChange"
			underline="thin"
			variant="large"
		/>
		<FmTab
			:tabs="data"
			@change-tab="handleTabChange"
			underline="bold"
			variant="large"
		/>
		<FmTab
			:tabs="data"
			@change-tab="handleTabChange"
			underline="thin"
			icon="mdi-home-account"
		/>
		<FmTab
			:tabs="data"
			@change-tab="handleTabChange"
			underline="bold"
			icon="mdi-home-account"
		/>
		<FmTab
			prependIcon
			:tabs="data"
			@change-tab="handleTabChange"
			underline="bold"
			icon="mdi-home-account"
		/>
		<FmTab
			prependIcon
			:tabs="data"
			@change-tab="handleTabChange"
			underline="thin"
			icon="mdi-home-account"
		/>
		<FmTab
			appendIcon
			:tabs="data"
			@change-tab="handleTabChange"
			underline="thin"
			icon="mdi-home-account"
			variant="large"
		/>
		<FmTab
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
	import { ref } from 'vue'
	import FmTab from '@/components/fm/Tab/Tab.vue'

	const data = ref([{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }])

	const handleTabChange = (event) => {
		console.log(`Event 'Tab change index' : ${event}`)
	}
</script>
