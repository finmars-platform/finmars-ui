<template>
	<div class="relative px-[24px]">
		{{ text }}
	</div>
</template>

<script setup>
	defineProps({
		text: {
			type: String
		}
	});
</script>
