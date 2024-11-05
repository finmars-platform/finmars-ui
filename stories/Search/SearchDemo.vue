<template>
	<div class="grid grid-cols-2 gap-16">
		<div>
			<h3 class="text-[16px] mb-2">Base usage</h3>

			<FmSearch
				v-model="v1"
				v-on="eventHandlers"
				:items="items"
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Base usage (disabled)</h3>

			<FmSearch
				v-on="eventHandlers"
				:items="items"
				disabled
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Base usage (multiple)</h3>

			<FmSearch
				v-model="v4"
				v-on="eventHandlers"
				multiple
				:items="items"
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Base usage (multiple and chips)</h3>

			<FmSearch
				v-model="v5"
				v-on="eventHandlers"
				multiple
				chips
				closable-chips
				:items="items"
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Use slot <i>item</i></h3>

			<FmSearch
				v-model="v2"
				v-on="eventHandlers"
				:items="items"
			>
				<template #item="{ item }">
					<div class="flex items-center justify-start h-[48px] gap-x-1">
						<VIcon icon="mdi-star" />
						<span>{{ item.title }}</span>
					</div>
				</template>
			</FmSearch>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Use slots <i>item</i> and <i>selection</i></h3>

			<FmSearch
				v-model="v3"
				v-on="eventHandlers"
				:items="items"
			>
				<template #item="{ item }">
					<div class="flex items-center justify-start h-[48px] gap-x-1">
						<VIcon icon="mdi-star" />
						<span>{{ item.title }}</span>
					</div>
				</template>

				<template #selection="{ item }">
					<span>--- ({{ item.value }}) {{ item.title }} ---</span>
				</template>
			</FmSearch>
		</div>
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
	const v3 = ref()
	const v4 = ref()
	const v5 = ref()
</script>
