<template>
	<div class="grid grid-cols-2 gap-y-10">
		<!-- default  -->
		<FmChip
			v-model="val1"
			v-on="eventHandlers"
		>
			Label
		</FmChip>

		<FmChip
			v-model="val1"
			selected
			v-on="eventHandlers"
		>
			Label
		</FmChip>

		<!-- default (disabled) -->
		<FmChip
			v-model="val1"
			disabled
			v-on="eventHandlers"
		>
			Label
		</FmChip>

		<FmChip
			v-model="val1"
			disabled
			selected
			v-on="eventHandlers"
		>
			Label
		</FmChip>

		<!-- default and elevation  -->
		<FmChip
			v-model="val1"
			elevation
			v-on="eventHandlers"
		>
			Label
		</FmChip>

		<FmChip
			v-model="val1"
			elevation
			selected
			v-on="eventHandlers"
		>
			Label
		</FmChip>

		<!-- closable -->
		<FmChip
			closable
			v-on="eventHandlers"
		>
			Label
		</FmChip>

		<FmChip
			closable
			selected
			v-on="eventHandlers"
		>
			Label
		</FmChip>

		<!-- with prepend icon (default) -->
		<FmChip
			prepend-icon="mdi-atlassian"
			closable
			v-on="eventHandlers"
		>
			Label
		</FmChip>

		<FmChip
			prepend-icon="mdi-atlassian"
			closable
			selected
			v-on="eventHandlers"
		>
			Label
		</FmChip>

		<!-- with prepend icon (color) -->
		<FmChip
			:prepend-icon="{ icon: 'mdi-atlassian', color: 'orange' }"
			closable
			v-on="eventHandlers"
		>
			Label
		</FmChip>

		<FmChip
			:prepend-icon="{ icon: 'mdi-atlassian', color: 'orange' }"
			closable
			selected
			v-on="eventHandlers"
		>
			Label
		</FmChip>

		<!-- with prepend and append icon and closable (default) -->
		<FmChip
			prepend-icon="mdi-atlassian"
			append-icon="mdi-autorenew"
			closable
			v-on="eventHandlers"
		>
			Label
		</FmChip>

		<FmChip
			prepend-icon="mdi-atlassian"
			append-icon="mdi-autorenew"
			closable
			selected
			v-on="eventHandlers"
		>
			Label
		</FmChip>

		<!-- with prepend and append icon and closable (color) -->
		<FmChip
			prepend-icon="mdi-atlassian"
			:append-icon="{ icon: 'mdi-autorenew', color: 'red' }"
			closable
			v-on="eventHandlers"
		>
			Label
		</FmChip>

		<FmChip
			prepend-icon="mdi-atlassian"
			:append-icon="{ icon: 'mdi-autorenew', color: 'red' }"
			closable
			selected
			v-on="eventHandlers"
		>
			Label
		</FmChip>

		<!-- with prepend and rounded (default) -->
		<FmChip
			rounded
			:prepend-icon="{ icon: 'mdi-account-circle-outline', size: 24 }"
			v-on="eventHandlers"
		>
			Label
		</FmChip>

		<FmChip
			rounded
			selected
			:prepend-icon="{ icon: 'mdi-account-circle-outline', size: 24 }"
			v-on="eventHandlers"
		>
			Label
		</FmChip>

		<!-- with prepend and rounded and closable (default) -->
		<FmChip
			closable
			rounded
			:prepend-icon="{ icon: 'mdi-account-circle-outline', size: 24 }"
			v-on="eventHandlers"
		>
			Label
		</FmChip>

		<FmChip
			closable
			rounded
			selected
			:prepend-icon="{ icon: 'mdi-account-circle-outline', size: 24 }"
			v-on="eventHandlers"
		>
			Label
		</FmChip>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import FmChip from '@/components/fm/Chip/Chip.vue'

	const eventHandlers = {
		click: (ev) => console.log(`Event 'click' :`, ev),
		'click:close': (ev) => console.log(`Event 'click:close' :`, ev),
		'click:prepend': (ev) => console.log(`Event 'click:prepend' :`, ev),
		'click:append': (ev) => console.log(`Event 'click:append' :`, ev),
		'update:modelValue': (ev) => console.log(`Event 'update:modelValue' :`, ev)
	}

	const val1 = ref(true)
</script>
