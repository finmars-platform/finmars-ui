<template>
	<div>
		<h3 class="text-xl font-semibold mb-8">
			Determinate
		</h3>

		<FmProgressLinear class="mb-8" />
		<FmProgressLinear class="mb-8" :model-value="25" />
		<FmProgressLinear class="mb-8" :model-value="50" />
		<FmProgressLinear class="mb-8" :model-value="100" />

		<h3 class="text-xl font-semibold my-8">
			Indeterminate
		</h3>

		<FmProgressLinear class="mb-8" indeterminate />
	</div>
</template>

<script setup>
	import FmProgressLinear from './ProgressLinear.vue'
</script>
