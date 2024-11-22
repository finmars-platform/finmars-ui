<template>
	<div class="grid grid-cols-2 gap-y-10">
		<!-- default  -->
		<FmChip v-on="eventHandlers" value="Label" />

		<FmChip
			type="outlined"
			value="download_instrument_from_finmars_database"
			v-on="eventHandlers"
		/>

		<!-- default (disabled) -->
		<FmChip disabled v-on="eventHandlers" value="Label" />

		<FmChip value="Label" type="outlined" disabled v-on="eventHandlers" />

		<!-- default and elevation  -->
		<FmChip value="Label" elevated v-on="eventHandlers" />

		<FmChip value="Label" elevated type="outlined" v-on="eventHandlers" />

		<!-- closable -->
		<FmChip value="Label" closable v-on="eventHandlers" />

		<FmChip
			value="download_instrument_from_finmars_database"
			closable
			type="outlined"
			v-on="eventHandlers"
		/>

		<!-- with prepend icon (default) -->
		<FmChip
			value="download_instrument_from_finmars_database"
			prepend-icon="mdi-atlassian"
			closable
			v-on="eventHandlers"
		/>

		<FmChip
			value="label"
			prepend-icon="mdi-atlassian"
			closable
			type="outlined"
			v-on="eventHandlers"
		/>

		<!-- with prepend icon (color) -->
		<FmChip
			value="label"
			:prepend-icon="{ icon: 'mdi-atlassian', color: 'orange' }"
			closable
			v-on="eventHandlers"
		/>

		<FmChip
			value="label"
			:prepend-icon="{ icon: 'mdi-atlassian', color: 'orange' }"
			closable
			type="outlined"
			v-on="eventHandlers"
		/>

		<!-- with prepend and append icon and closable (default) -->
		<FmChip
			value="label"
			prepend-icon="mdi-atlassian"
			append-icon="mdi-autorenew"
			closable
			v-on="eventHandlers"
		/>

		<FmChip
			value="download_instrument_from_finmars_database"
			prepend-icon="mdi-atlassian"
			append-icon="mdi-autorenew"
			closable
			type="outlined"
			v-on="eventHandlers"
		/>

		<!-- with prepend and append icon and closable (color) -->
		<FmChip
			value="download_instrument_from_finmars_database"
			prepend-icon="mdi-atlassian"
			:append-icon="{ icon: 'mdi-autorenew', color: 'red' }"
			closable
			v-on="eventHandlers"
		/>

		<FmChip
			value="label"
			prepend-icon="mdi-atlassian"
			:append-icon="{ icon: 'mdi-autorenew', color: 'red' }"
			closable
			type="outlined"
			v-on="eventHandlers"
		/>

		<!-- with prepend and rounded (default) -->
		<FmChip
			value="label"
			rounded
			:prepend-icon="{ icon: 'mdi-account-circle-outline', size: 24 }"
			v-on="eventHandlers"
		/>

		<FmChip
			value="download_instrument_from_finmars_database"
			rounded
			type="outlined"
			:prepend-icon="{ icon: 'mdi-account-circle-outline', size: 24 }"
			v-on="eventHandlers"
		/>

		<!-- with prepend and rounded and closable (default) -->
		<FmChip
			value="label"
			tooltip="The tooltip text"
			closable
			rounded
			:prepend-icon="{ icon: 'mdi-account-circle-outline', size: 24 }"
			v-on="eventHandlers"
		/>

		<FmChip
			value="download_instrument_from_finmars_database"
			closable
			rounded
			type="outlined"
			:prepend-icon="{ icon: 'mdi-account-circle-outline', size: 24 }"
			v-on="eventHandlers"
		/>
	</div>
</template>

<script setup>
	import FmChip from '@/components/fm/Chip/Chip.vue'

	const eventHandlers = {
		click: (ev) => console.log(`Event 'click' :`, ev),
		'click:close': (ev) => console.log(`Event 'click:close' :`, ev),
		'click:prepend': (ev) => console.log(`Event 'click:prepend' :`, ev),
		'click:append': (ev) => console.log(`Event 'click:append' :`, ev),
		keydown: (ev) => console.log(`Event 'keydown' :`, ev)
	}
</script>
