<template>
	<div>
		<div class="relative w-max grid grid-cols-4 gap-2">
			<template v-for="(icon, index) in icons" :key="index">
				<div
					v-for="size in sizes"
					:key="size"
					class="relative w-[64px] h-[64px] flex justify-center align-center"
				>
					<FmIcon
						:icon="icon"
						:size="size"
					/>
				</div>
			</template>


		</div>
	</div>
</template>

<script setup>
	import FmIcon from '@/components/fm/Icon/Icon.vue'

	const sizes = [16, 24, 32, 48]

	const icons = [
		'mdi-star',
		'mdi-airplane',
	]
</script>
