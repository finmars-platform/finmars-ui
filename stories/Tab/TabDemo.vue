<template>
	<div class="grid grid-cols-2 gap-8">
		<FmTab :tabs="data" @change-tab="handleTabChange" underline="thin" />
		<FmTab :tabs="data" @change-tab="handleTabChange" underline="bold" />

		<FmTab
			:tabs="data"
			@change-tab="handleTabChange"
			underline="thin"
			type="large"
		/>
		<FmTab
			:tabs="data"
			@change-tab="handleTabChange"
			underline="bold"
			type="large"
		/>

		<FmTab
			:tabs="data"
			@change-tab="handleTabChange"
			underline="thin"
			dot="row"
		/>
		<FmTab
			:tabs="data"
			@change-tab="handleTabChange"
			underline="thin"
			dot="column"
		/>

		<FmTab
			:tabs="data"
			@change-tab="handleTabChange"
			underline="bold"
			dot="row"
		/>
		<FmTab
			:tabs="data"
			@change-tab="handleTabChange"
			underline="bold"
			dot="column"
		/>
		<FmTab
			:tabs="data"
			@change-tab="handleTabChange"
			underline="bold"
			dot="row"
			type="large"
		/>
		<FmTab
			:tabs="data"
			@change-tab="handleTabChange"
			underline="bold"
			dot="column"
			type="large"
		/>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import FmTab from '@/components/fm/Tab/Tab.vue'

	const data = ref([{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }])

	const handleTabChange = (event) => {
		console.log(`Event 'Tab change' : ${event}`)
	}
</script>
