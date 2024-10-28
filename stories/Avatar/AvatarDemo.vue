<template>
	<div>
		<div class="flex">
			<FmAvatar>
				<VIcon icon="mdi-account-circle" />
			</FmAvatar>

			<FmAvatar>
				<VImg alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg" />
			</FmAvatar>

			<FmAvatar>
				<span class="text-h5">CJ</span>
			</FmAvatar>
		</div>
		<div class="flex">
			<FmAvatar icon="mdi-account-circle" />
			<FmAvatar image="https://cdn.vuetifyjs.com/images/john.jpg" />
			<FmAvatar>
				<span class="text-h5">CJ</span>
			</FmAvatar>
		</div>
	</div>
</template>

<script setup>
	import FmAvatar from '@/components/fm/Avatar/Avatar.vue'
</script>
