<template>
	<FmMenu
		v-model="isMenuOpen"
		:id="menuId"
		:close-on-content-click="false"
		:items="processedOptions"
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
				:value="displayValue as string"
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
				:loading="loading"
				:disabled="disabled"
				@init="activatorElement = $event"
				@focus="onFocus"
				@blur="onBlur"
				@click:clear="clearSelected"
				@click:prepend-icon="emits('click:prependIcon', $event)"
				@keydown="onKeydown"
			>
				<template #default>
					<slot name="selection" :value="selectedAsArray">
						<template v-if="chip">
							<FmChip
								v-for="(chip, index) in displayValue"
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
			<!-- @vue-ignore -->
			<FmCheckbox :model-value="isItemSelected(item)" />
		</template>

		<template #item="{ item, index }">
			<slot name="item" :item="item as T" :index="index">
				<span>{{ (item as T)[titleKey as K] }}</span>
			</slot>
		</template>
	</FmMenu>
</template>

<script
	lang="ts"
	setup
	generic="T extends FmSelectOption, K extends string & keyof T"
>
	import { computed, onBeforeMount, ref, type Ref, watch } from 'vue'
	import cloneDeep from 'lodash/cloneDeep'
	import get from 'lodash/get'
	import omit from 'lodash/omit'
	import isEmpty from 'lodash/isEmpty'
	import { getRandomString } from '@/utils'
	import FmMenu from '../Menu/Menu.vue'
	import FmSelectActivator from './SelectActivator.vue'
	import FmChip from '../Chip/Chip.vue'
	import FmCheckbox from '../Checkbox/Checkbox.vue'
	import type {
		FmSelectOption,
		FmSelectProps,
		FmSelectEmits,
		FmSelectSlots
	} from './types'

	type SelOption = T & { isSelected: boolean; isActive: boolean }

	const menuId = getRandomString(4)

	const props = withDefaults(defineProps<FmSelectProps<T, K>>(), {
		itemSize: 'medium',
		variant: 'standard',
		titleKey: 'title',
		valueKey: 'value'
	})
	const emits = defineEmits<FmSelectEmits<T, K>>()
	defineSlots<FmSelectSlots<T>>()

	const isMenuOpen = ref(false)
	const isDirty = ref(false)
	const activatorElement = ref<HTMLDivElement | null>(null)

	// https://github.com/vuejs/core/issues/1324 - ref returns incorrect type when using generic type variables #1324
	const processedOptions = ref([]) as Ref<SelOption[]>
	const activeOptionIndex = ref<number | null>(null)
	const selected: Ref<Set<SelOption>> = ref(new Set([]))

	const selectedAsArray = computed(() => [...selected.value])

	const displayValue = computed(() => {
		if (!selected.value.size) {
			return ''
		}

		if (props.multiple) {
			const value = selectedAsArray.value.map(
				(item) => item[props.titleKey as K]
			) as string[]
			return props.chip ? value : value.join(', ')
		}

		const value = get(
			selectedAsArray.value,
			[0, props.titleKey],
			JSON.stringify(selectedAsArray.value[0])
		) as string
		return props.chip ? [value] : value
	})

	function toggleDropdown(val: boolean) {
		isMenuOpen.value = val
	}

	function checkAndAddOneItem(item: T | T[K]) {
		const desiredValue = props.returnObject
			? ((item as T)[props.valueKey as K] as T[K])
			: (item as T)

		processedOptions.value.forEach((i) => {
			const v = i[props.valueKey as K]
			if (v === desiredValue) {
				selected.value.add(i)
			}
		})
	}

	function initialOptions() {
		if (isEmpty(props.modelValue)) {
			return
		}

		if (props.multiple) {
			;((props.modelValue as T[] | Array<T[K]>) || []).forEach(
				(item: T | T[K]) => {
					checkAndAddOneItem(item)
				}
			)
			return
		}

		checkAndAddOneItem(props.modelValue as T | T[K])
	}

	function isItemSelected(item: SelOption) {
		return selected.value.has(item)
	}

	function markSelectedItems() {
		processedOptions.value.forEach((item, index) => {
			item.isSelected = isItemSelected(item)
			item.isActive = index === activeOptionIndex.value
		})
	}

	function clearSelected(ev: MouseEvent) {
		selected.value.clear()
		activeOptionIndex.value = null
		emits('click:clear', ev)
		emits('update:modelValue', props.multiple ? [] : null)
		emits('change', props.multiple ? [] : null)

		markSelectedItems()
	}

	function transformData(item: SelOption): T {
		// @ts-ignore
		return omit(item, ['isSelected', 'isActive'])
	}

	function onItemClick({ item, index }: { item: SelOption; index: number }) {
		if (props.multiple) {
			if (selected.value.has(item)) {
				selected.value.delete(item)
			} else {
				selected.value.add(item)
			}
			isDirty.value = true
			const value = selectedAsArray.value.map((i) => transformData(i))
			emits(
				'update:modelValue',
				props.returnObject ? value : value.map((i) => i[props.valueKey as K])
			)
		} else {
			if (selected.value.has(item)) {
				return
			}

			selected.value.clear()
			selected.value.add(item)
			isDirty.value = true
			isMenuOpen.value = false
			const value = transformData(selectedAsArray.value[0])
			emits(
				'update:modelValue',
				props.returnObject ? value : value[props.valueKey as K]
			)
		}

		activeOptionIndex.value = index
		markSelectedItems()
	}

	function onChipClick(index: number) {
		const currentItem = selectedAsArray.value[index]
		selected.value.forEach((item) => {
			const isEqual = Object.keys(currentItem).every(
				(field) =>
					JSON.stringify(currentItem[field as K]) ===
					JSON.stringify(item[field as K])
			)
			if (isEqual) {
				selected.value.delete(item)
				isDirty.value = true
				const value = selectedAsArray.value.map((i) => transformData(i))
				emits(
					'update:modelValue',
					props.returnObject ? value : value.map((i) => i[props.valueKey as K])
				)
				emits(
					'change',
					props.returnObject ? value : value.map((i) => i[props.valueKey as K])
				)
			}
		})

		markSelectedItems()
	}

	function onFocus(ev: FocusEvent) {
		emits('focus', ev)
	}

	function onBlur(ev: FocusEvent) {
		emits('blur', ev)
	}

	function onKeydown({
		event,
		key
	}: {
		event: KeyboardEvent
		key: 'down' | 'up' | 'esc' | 'enter' | 'space' | 'tab'
	}) {
		event.preventDefault()
		event.stopPropagation()

		if (isEmpty(processedOptions.value)) {
			return
		}

		switch (key) {
			case 'down':
				if (activeOptionIndex.value === null) {
					activeOptionIndex.value = 0
					const menuContentEl = document.getElementById(`${menuId}-content`)
					menuContentEl && menuContentEl.focus()
				} else if (
					activeOptionIndex.value >= 0 &&
					activeOptionIndex.value < processedOptions.value.length - 1
				) {
					activeOptionIndex.value += 1
				}
				break
			case 'up':
				if (activeOptionIndex.value === null) {
					activeOptionIndex.value = processedOptions.value.length - 1
					const menuContentEl = document.getElementById(`${menuId}-content`)
					menuContentEl && menuContentEl.focus()
				} else if (
					activeOptionIndex.value > 0 &&
					activeOptionIndex.value < processedOptions.value.length
				) {
					activeOptionIndex.value -= 1
				}
				break
			case 'esc':
			case 'tab':
				if (props.multiple && isDirty.value) {
					const value = selectedAsArray.value.map((i) => transformData(i))
					emits(
						'change',
						props.returnObject
							? value
							: value.map((i) => i[props.valueKey as K])
					)
				}
				activeOptionIndex.value = null
				isMenuOpen.value = false
				isDirty.value = false
				activatorElement.value && activatorElement.value.blur()
				break
			case 'enter':
			case 'space':
				const item = processedOptions.value[activeOptionIndex.value!]
				onItemClick({ item, index: activeOptionIndex.value! })
				break
		}

		const el = document.getElementById(`${menuId}-${activeOptionIndex.value}`)
		el && el.scrollIntoView({ behavior: 'auto', block: 'center' })

		markSelectedItems()
	}

	defineExpose({
		toggleDropdown
	})

	onBeforeMount(() => {
		initialOptions()
	})

	watch(
		() => props.modelValue,
		() => {
			const val = Array.isArray(props.modelValue)
				? props.modelValue
				: [props.modelValue as T | T[K]]

			const processedVal = val.map((i) => ({
				...i,
				isSelected: true,
				isActive: false
			}))

			selected.value = new Set(processedVal) as Set<SelOption>
		},
		{ immediate: true }
	)

	watch(
		() => isMenuOpen.value,
		(val, oldVal) => {
			emits('update:menu', val)

			if (val !== oldVal && !val) {
				activeOptionIndex.value = null
				markSelectedItems()
			}

			if (val !== oldVal && !val && isDirty.value) {
				const value = props.multiple
					? selectedAsArray.value.map((i) => transformData(i))
					: transformData(selectedAsArray.value[0])

				emits(
					'change',
					props.multiple
						? props.returnObject
							? (value as T[])
							: (value as T[]).map((i) => i[props.valueKey as K])
						: props.returnObject
							? (value as T)
							: (value as T)[props.valueKey as K]
				)
				isDirty.value = false
				activeOptionIndex.value = null
				markSelectedItems()
			}
		}
	)

	watch(
		() => props.options,
		(val) => {
			processedOptions.value = cloneDeep(val).map((i) => ({
				...i,
				isSelected: false,
				isActive: false
			}))
			selected.value.clear()
			activeOptionIndex.value = null

			markSelectedItems()
		},
		{ immediate: true }
	)
</script>
