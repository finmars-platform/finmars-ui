<template>
	<div class="grid grid-cols-2 gap-8">
		<div>
			<h3 class="text-[16px] mb-2">No icon</h3>
			<FmSwitch
				v-model="v1"
				@update:modelValue="
					(val) => {
						console.log(`Switcher state: ${val}`);
					}
				"
			/>
		</div>
		<div>
			<h3 class="text-[16px] mb-2">With icon</h3>
			<FmSwitch
				icon
				v-model="v1"
				@update:modelValue="
					(val) => {
						console.log(`Switcher state: ${val}`);
					}
				"
			/>
		</div>
		<div>
			<h3 class="text-[16px] mb-2">No icon, active, disabled</h3>
			<FmSwitch
				v-model="v2"
				disable
				@update:modelValue="
					(val) => {
						console.log(`Switcher state: ${val}`);
					}
				"
			/>
		</div>
		<div>
			<h3 class="text-[16px] mb-2">With icon, active, disabled</h3>
			<FmSwitch
				v-model="v2"
				icon
				disable
				@update:modelValue="
					(val) => {
						console.log(`Switcher state: ${val}`);
					}
				"
			/>
		</div>
		<div>
			<h3 class="text-[16px] mb-2">No icon, inactive, disabled</h3>
			<FmSwitch
				v-model="v1"
				disable
				@update:modelValue="
					(val) => {
						console.log(`Switcher state: ${val}`);
					}
				"
			/>
		</div>
		<div>
			<h3 class="text-[16px] mb-2">With icon, inactive, disabled</h3>
			<FmSwitch
				v-model="v1"
				icon
				disable
				@update:modelValue="
					(val) => {
						console.log(`Switcher state: ${val}`);
					}
				"
			/>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import FmSwitch from '@/components/fm/Switch/Switch.vue';

	const v1 = ref(false);
	const v2 = ref(true);
</script>
