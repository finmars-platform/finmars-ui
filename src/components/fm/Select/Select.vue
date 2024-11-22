<template>
	<FmMenu
		v-model="isMenuOpen"
		:id="menuId"
		:close-on-content-click="false"
		:items="transformedOptions"
		:height="200"
		offset="6"
		:item-size="itemSize"
		scroll-strategy="none"
		:disabled="disabled"
		@click:item="onItemClick"
		@menu:keydown="onKeydown"
	>
		<template #activator="{ props }">
			<FmSelectActivator
				v-bind="props"
				:value="displaySelection"
				:is-dropdown-opened="isMenuOpen"
				:variant="variant"
				:label="label"
				:placeholder="placeholder"
				:persistent-placeholder="persistentPlaceholder"
				:prepend-icon="prependIcon"
				:clear-icon="clearIcon"
				:clearable="clearable"
				:chip="chip"
				:error="error"
				:width="width"
				:focused="focused"
				:loading="loading"
				:disabled="disabled"
				@init="activatorElement = $event"
				@focus="onActivatorFocus"
				@blur="onActivatorBlur"
				@click:clear="clearSelected"
				@click:prepend-icon="emits('click:prependIcon', $event)"
				@keydown="onKeydown"
			>
				<template #default>
					<slot name="selection" :value="selectedOptions">
						<template v-if="chip">
							<FmChip
								v-for="(chip, index) in displaySelection"
								:key="index"
								:value="chip"
								:variant="variant"
								:closable="multiple"
								@click:close="onChipClick(index)"
							/>
						</template>
					</slot>
				</template>
			</FmSelectActivator>
		</template>

		<template v-if="multiple" #item-prepend="{ item }">
			<FmCheckbox :model-value="isOptionSelected(item as T)" />
		</template>

		<template #item="{ item, index }">
			<slot name="item" :item="item as T" :index="index">
				<span>{{ (item as T)[titleKey as K] }}</span>
			</slot>
		</template>
	</FmMenu>
</template>

<script
	setup
	lang="ts"
	generic="T extends any & FmSelectOption, K extends string & keyof T"
>
	import { defineExpose } from 'vue'
	import FmMenu from '@/components/fm/Menu/Menu.vue'
	import FmCheckbox from '@/components/fm/Checkbox/Checkbox.vue'
	import FmChip from '@/components/fm/Chip/Chip.vue'
	import FmSelectActivator from '@/components/fm/Select/SelectActivator.vue'
	import useSelect from '@/components/fm/Select/useSelect'
	import type {
		FmSelectOption,
		FmSelectProps,
		FmSelectEmits,
		FmSelectSlots
	} from './types'

	const props = withDefaults(defineProps<FmSelectProps<T, K>>(), {
		itemSize: 'medium',
		variant: 'standard',
		titleKey: 'title',
		valueKey: 'value'
	})
	const emits = defineEmits<FmSelectEmits<T, K>>()
	defineSlots<FmSelectSlots<T>>()

	const {
		menuId,
		focused,
		isMenuOpen,
		activatorElement,
		transformedOptions,
		selectedOptions,
		displaySelection,
		toggleDropdown,
		onKeydown,
		onItemClick,
		onActivatorFocus,
		onActivatorBlur,
		clearSelected,
		onChipClick,
		isOptionSelected
	} = useSelect(props, emits)

	defineExpose({
		toggleDropdown
	})
</script>
