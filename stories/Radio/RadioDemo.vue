<template>
	<div>
		<h3 class="text-xl mb-4">FmRadioGroup + FmRadio</h3>
		<FmRadioGroup v-model="val1" v-on="eventHandlers" class="mb-16">
			<FmRadio label="Label 1" :value="true" />
			<FmRadio label="Label 2" :value="false" />
		</FmRadioGroup>

		<FmRadioGroup v-model="val1" disabled v-on="eventHandlers" class="mb-16">
			<FmRadio label="Label 1" :value="true" />
			<FmRadio label="Label 2" :value="false" />
		</FmRadioGroup>

		<FmRadioGroup
			v-model="val2"
			v-on="eventHandlers"
			direction="vertical"
			class="mb-16"
		>
			<FmRadio label="Label 1" :value="true" />
			<FmRadio label="Label 2" :value="false" />
		</FmRadioGroup>

		<FmRadioGroup v-model="val3" v-on="eventHandlers" class="mb-16">
			<FmRadio label="Label 1 (yes)" value="yes" />
			<FmRadio label="Label 2 (no)" value="no" />
			<FmRadio label="Label 3 (maybe)" value="maybe" />
		</FmRadioGroup>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import FmRadio from '@/components/fm/Radio/Radio.vue'
	import FmRadioGroup from '@/components/fm/Radio/RadioGroup.vue'

	const val1 = ref(false)
	const val2 = ref(true)
	const val3 = ref('yes')

	const eventHandlers = {
		'update:modelValue': (ev) => console.log(`Event 'update:modelValue' :`, ev),
	}
</script>
