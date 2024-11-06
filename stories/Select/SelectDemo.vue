<template>
	<div class="grid grid-cols-2 gap-16">
		<div>
			<h3 class="text-[16px] mb-2">Base usage</h3>

			<FmSelect
				v-model="v1"
				v-on="eventHandlers"
				:items="items"
				placeholder="Select option"
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Base usage (disabled)</h3>

			<FmSelect
				v-on="eventHandlers"
				:items="items"
				placeholder="Select option"
				disabled
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Base usage (multiple)</h3>

			<FmSelect
				v-model="v2"
				v-on="eventHandlers"
				:items="items"
				placeholder="Select options"
				multiple
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Base usage (multiple and chips)</h3>

			<FmSelect
				v-model="v3"
				v-on="eventHandlers"
				:items="items"
				placeholder="Select options"
				multiple
				chips
				closable-chips
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Use slot <i>item</i></h3>

			<FmSelect
				v-model="v4"
				v-on="eventHandlers"
				:items="items"
				placeholder="Select option"
			>
				<template #item="{ item }">
					<div class="flex items-center justify-start h-[48px] gap-x-1">
						<VIcon icon="mdi-star" />
						<span>{{ item.title }}</span>
					</div>
				</template>
			</FmSelect>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Use slots <i>item</i> and <i>selection</i></h3>

			<FmSelect
				v-model="v5"
				v-on="eventHandlers"
				:items="items"
				placeholder="Select option"
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
			</FmSelect>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import FmSelect from '@/components/fm/Select/Select.vue'
	import { VIcon } from 'vuetify/components'

	const eventHandlers = {
		'click:clear': (ev) => console.log(`EVENT 'click:clear' :`, ev),
		'click:prepend': (ev) => console.log(`EVENT 'click:prepend' :`, ev),
		'click:prependInner': (ev) => console.log(`EVENT 'click:prependInner' :`, ev),
		'update:focused': (ev) => console.log(`EVENT 'update:focused' :`, ev),
		'update:menu': (ev) => console.log(`EVENT 'update:menu' :`, ev),
		'update:modelValue': (ev) => console.log(`EVENT 'update:modelValue' :`, ev),
	}

	const items = [
		{ title: 'Option 1', value: 'o1' },
		{ title: 'Option 2', value: 'o2' },
		{ title: 'Option 3', value: 'o3' },
		{ title: 'Option 4', value: 'o4' },
		{ title: 'Option 5', value: 'o5' },
	]

	const v1 = ref()
	const v2 = ref()
	const v3 = ref()
	const v4 = ref()
	const v5 = ref()
</script>
