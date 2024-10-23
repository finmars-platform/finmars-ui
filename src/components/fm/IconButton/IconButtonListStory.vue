<template>
	<div class="flex-col gap-4">
		<div class="flex gap-4">
			<FmIconButton size="small" icon="mdi-plus" />
			<FmIconButton icon="mdi-plus" />
		</div>
		<div class="flex gap-4">
			<FmIconButton variant="outlined" size="small" icon="mdi-plus" />
			<FmIconButton variant="outlined" icon="mdi-plus" />
		</div>
		<div class="flex gap-4">
			<FmIconButton variant="text" size="small" icon="mdi-plus" />
			<FmIconButton variant="text" icon="mdi-plus" />
		</div>
		<div class="flex gap-4">
			<FmIconButton variant="tonal" size="small" icon="mdi-plus" />
			<FmIconButton variant="tonal" icon="mdi-plus" />
		</div>

		<div class="flex gap-4">
			<FmIconButton size="small" icon="mdi-plus" disabled />
			<FmIconButton icon="mdi-plus" disabled />
		</div>
	</div>
</template>

<script setup>
	import FmIconButton from '@/components/fm/IconButton/IconButton.vue'
</script>
