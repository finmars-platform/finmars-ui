<template>
	<div class="grid grid-cols-3 gap-8">
		<h4 class="text-h6 text-center">Continuous</h4>
		<h4 class="text-h6 text-center">Discrete</h4>
		<h4 class="text-h6 text-center">Centered</h4>

		<FmSlider
			class="mb-8"
			v-model="continuousComponentValue"
		/>
		<FmSlider
			class="mb-8"
			type="discrete"
			v-model="discreteComponentValue"
			@click:append="(ev) => console.log('CLICK:APPEND event: ', ev)"
			@click:prepend="(ev) => console.log('CLICK:PREPEND event: ', ev)"
			@start="(ev) => console.log('START event: ', ev)"
			@end="(ev) => console.log('END event: ', ev)"
			@update:model-value="(ev) => console.log('UPDATE:MODEL-VALUE event', ev)"
		/>
		<FmSlider
			class="mb-8"
			type="centered"
			:min="-100"
			:max="100"
			:step="20"
			v-model="centeredComponentValue"
		/>

		<FmSlider
			class="mb-8"
			disabled
			v-model="continuousComponentValue"
		/>
		<FmSlider
			class="mb-8"
			type="discrete"
			disabled
			v-model="discreteComponentValue"
		/>
		<FmSlider
			class="mb-8"
			type="centered"
			:min="-100"
			:max="100"
			:step="20"
			disabled
			v-model="centeredComponentValue"
		/>

		<FmSlider
			class="mb-8"
			prepend-icon="mdi-minus"
			append-icon="mdi-plus"
			@click:prepend="() => {
				console.log('click:prepend')
				if (continuousComponentValue >= 1) {
					continuousComponentValue -= 1;
				}
			}"
			@click:append="() => {
				console.log('click:append')
				if (continuousComponentValue <= 99) {
					continuousComponentValue += 1;
				}
			}"
			v-model="continuousComponentValue"
		/>
		<FmSlider
			class="mb-8"
			type="discrete"
			:step="10"
			prepend-icon="mdi-minus"
			append-icon="mdi-plus"
			@click:prepend="() => {
				console.log('click:prepend')
				if (discreteComponentValue >= 10) {
					discreteComponentValue -= 10;
				}
			}"
			@click:append="() => {
				console.log('click:append')
				if (discreteComponentValue <= 90) {
					discreteComponentValue += 10;
				}
			}"
			v-model="discreteComponentValue"
		/>
		<FmSlider
			class="mb-8"
			type="centered"
			:min="-100"
			:max="100"
			:step="20"
			prepend-icon="mdi-minus"
			append-icon="mdi-plus"
			@click:prepend="() => {
				console.log('click:prepend')
				if (centeredComponentValue >= -80) {
					centeredComponentValue -= 20;
				}
			}"
			@click:append="() => {
				console.log('click:append')
				if (centeredComponentValue <= 80) {
					centeredComponentValue += 20;
				}
			}"
			v-model="centeredComponentValue"
		/>

		<FmSlider
			class="mb-8"
			v-model="continuousComponentValue"
		>
			<template #append>
				<i>{{ Number(continuousComponentValue).toFixed() }}</i>
			</template>
		</FmSlider>
		<FmSlider
			class="mb-8"
			type="discrete"
			v-model="discreteComponentValue"
		>
			<template #append>
				<i>{{ Number(discreteComponentValue).toFixed() }}</i>
			</template>
		</FmSlider>
		<FmSlider
			class="mb-8"
			type="centered"
			:min="-100"
			:max="100"
			:step="20"
			v-model="centeredComponentValue"
		>
			<template #append>
				<i>{{ Number(centeredComponentValue).toFixed() }}</i>
			</template>
		</FmSlider>

	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import FmSlider from './Slider.vue'

	const continuousComponentValue = ref(0);
	const discreteComponentValue = ref(0);
	const centeredComponentValue = ref(0);
</script>
