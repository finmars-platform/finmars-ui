<template>
	<div class="grid grid-cols-4 gap-16">
		<!-- row -->
		<FmMenu v-model="v1" v-on="eventHandlers" :items="items1">
			<template #activator="{ props }">
				<FmButton v-bind="props"> Activator slot</FmButton>
			</template>
		</FmMenu>

		<FmButton>
			Parent activator

			<FmMenu v-model="v2" activator="parent" v-on="eventHandlers" :items="items1" />
		</FmButton>

		<FmButton id="menuActivator"> Sibling activator</FmButton>
		<FmMenu v-model="v3" activator="#menuActivator" v-on="eventHandlers" :items="items1" />

		<FmMenu v-on="eventHandlers" :items="items1" width="200">
			<template #activator="{ props }">
				<FmIconButton v-bind="props" icon="mdi-cog" />
			</template>
		</FmMenu>

		<!-- row -->
		<FmMenu
			v-on="eventHandlers"
			:open-on-click="false"
			:open-on-hover="true"
			:items="items1"
			width="200"
		>
			<template #activator="{ props }">
				<FmButton v-bind="props"> Hover me</FmButton>
			</template>
		</FmMenu>

		<FmButton>
			Use item slot

			<FmMenu activator="parent" v-on="eventHandlers" width="200" :items="items1">
				<template #item="{ item, index }">
					<div>{{ item.title }} ({{ index }})</div>
				</template>
			</FmMenu>
		</FmButton>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import FmMenu from '@/components/fm/Menu/Menu.vue';
	import FmButton from '@/components/fm/Button/Button.vue';
	import FmIconButton from '@/components/fm/IconButton/IconButton.vue';

	const eventHandlers = {
		'update:modelValue': (ev) => console.log(`Event 'update:modelValue' :`, ev),
		'click:item': (ev) => console.log(`Event 'click:item' :`, ev)
	};

	const items1 = [
		{ title: 'Item 1' },
		{ title: 'Item 2' },
		{ title: 'Item 3' },
		{ title: 'Item 4' },
		{ title: 'Item 5' }
	];

	const v1 = ref(false);
	const v2 = ref(false);
	const v3 = ref(false);
</script>
