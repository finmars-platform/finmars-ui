<template>
	<div class="grid grid-cols-2 gap-16">
		<FmSearch
			v-model="v1"
			v-on="eventHandlers"
			:items="items"
		/>

		<FmSearch
			v-model="v2"
			v-on="eventHandlers"
			:items="items"
		>
			<template #item="{ item }">
				<div class="flex items-center justify-start h-[48px] gap-x-1 px-2">
					<VIcon icon="mdi-star" />
					<span>{{ item.title }}</span>
				</div>
			</template>
		</FmSearch>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import FmSearch from '@/components/fm/Search/Search.vue'
	import { VIcon } from 'vuetify/components'

	const eventHandlers = {
		'click:prependInner': (ev) => console.log(`EVENT 'click:prependInner' :`, ev),
		'click:clear': (ev) => console.log(`EVENT 'click:clear' :`, ev),
		'update:focused': (ev) => console.log(`EVENT 'update:focused' :`, ev),
		'update:menu': (ev) => console.log(`EVENT 'update:menu' :`, ev),
		'update:modelValue': (ev) => console.log(`EVENT 'update:modelValue' :`, ev),
		'update:search': (ev) => console.log(`EVENT 'update:search' :`, ev),
	}

	const items = [
		{ title: 'Short name', value: 'sn' },
		{ title: 'User code', value: 'uc' },
		{ title: 'Default rate', value: 'dr' },
	]

	const v1 = ref()
	const v2 = ref()
</script>
