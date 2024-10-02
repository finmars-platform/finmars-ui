<template>
	<div class="flex-col">
		<div class="flex">
			<FmIconButton size="small" icon="mdi-plus" />
			<FmIconButton icon="mdi-plus" />
		</div>
		<div class="flex">
			<FmIconButton variant="tonal" size="small" icon="mdi-plus" />
			<FmIconButton variant="tonal" icon="mdi-plus" />
		</div>
		<div class="flex">
			<FmIconButton variant="filled" size="small" icon="mdi-plus" />
			<FmIconButton variant="filled" icon="mdi-plus" />
		</div>
		<div class="flex">
			<FmIconButton variant="outlined" size="small" icon="mdi-plus" />
			<FmIconButton variant="outlined" icon="mdi-plus" />
		</div>
		<div class="flex">
			<FmIconButton size="small" icon="mdi-plus" disabled />
			<FmIconButton icon="mdi-plus" disabled />
		</div>
	</div>
</template>

<script setup>
	import FmIconButton from '@/components/fm/IconButton/IconButton.vue'
</script>
