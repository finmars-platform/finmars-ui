<template>
	<div class="fm-classifier-filter">
		CLASSIFIER FILTER
		<p>{{ filter }}</p>
	</div>
</template>

<script lang="ts" setup>
	import type { FmFilterProps, FmFilterEmits, FmFilterSlots } from '../../types';

	defineProps<FmFilterProps>();
	defineEmits<FmFilterEmits>();
	defineSlots<FmFilterSlots>();
</script>

<style lang="scss" scoped>
	.fm-classifier-filter {
		position: relative;
		width: 100%;
		padding: 4px 24px 0 24px;
	}
</style>
