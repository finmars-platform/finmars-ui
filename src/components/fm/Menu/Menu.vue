<template>
	<VMenu :min-width="minWidth" rounded>
		<template #activator="{ props }">
			<slot :props="props" name="activator" />
		</template>
		<slot />
	</VMenu>
</template>

<script setup>
	import { VMenu } from 'vuetify/components'

	defineProps({
		rounded: {
			type: Boolean,
		},
		minWidth: {
			type: String,
		},
	})
</script>

<style>
	:root {
	}

	body.dark-mode {
	}
</style>
