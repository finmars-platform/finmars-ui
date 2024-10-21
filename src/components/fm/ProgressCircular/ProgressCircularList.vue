<template>
	<div>
		<h3 class="text-xl font-semibold mb-8">
			Determinate
		</h3>

		<div class="grid grid-cols-4 gap-16">
			<FmProgressCircular />
			<FmProgressCircular :model-value="25" />
			<FmProgressCircular :model-value="50" />
			<FmProgressCircular :model-value="100" />

			<FmProgressCircular show-value />
			<FmProgressCircular show-value :model-value="25" />
			<FmProgressCircular show-value :model-value="50" />
			<FmProgressCircular show-value :model-value="100" />
		</div>


		<h3 class="text-xl font-semibold my-8">
			Indeterminate
		</h3>

		<FmProgressCircular class="mb-8" indeterminate />
	</div>
</template>

<script setup>
	import FmProgressCircular from './ProgressCircular.vue'
</script>

<style>
	.grid-cols-4 {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}
</style>
