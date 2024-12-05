import { computed, onMounted, ref, watch } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import size from 'lodash/size'
import { getRandomString } from '@/utils'
import type { FmSelectProps, FmSelectEmits, FmSelectOption } from './types'

export default function useSelect<
	T extends any & FmSelectOption,
	K extends string & keyof T
>(props: FmSelectProps<T, K>, emits: FmSelectEmits<T, K>) {
	type FmSelectOptionTransformed = T & {
		isSelected?: boolean
		isActive?: boolean
	}

	const menuId = getRandomString(4)

	const menuContentEl = ref<HTMLElement | null>(null)
	const activatorElement = ref<HTMLDivElement | null>(null)

	const isMenuOpen = ref(false)
	const isDirty = ref(false)
	const isActivatorFocused = ref(false)
	const focused = ref(false)

	// https://github.com/vuejs/core/issues/1324 - ref returns incorrect type when using generic type variables #1324
	const initialSelectedOptions = ref([]) as Ref<T[]>
	const selectedOptions = ref([]) as Ref<T[]>
	const activeOptionIndex = ref<number | null>(null)

	const transformedOptions = computed(() =>
		props.options.map((option: T, index) => ({
			// @ts-ignore
			...option,
			isSelected: isOptionSelected(option),
			isActive: index === activeOptionIndex.value
		}))
	) as ComputedRef<FmSelectOptionTransformed[]>

	const selectedOptionsValues = computed(() =>
		selectedOptions.value.map((o) => o[props.valueKey as keyof T])
	) as ComputedRef<Array<T[K]>>

	const displaySelection = computed(() => {
		if (
			isEmpty(props.modelValue) &&
			typeof props.modelValue !== 'boolean' &&
			typeof props.modelValue !== 'number'
		) {
			return ''
		}

		const currentModel = getSelectedOptions()
		if (isEmpty(currentModel)) {
			return ''
		}

		if (props.multiple) {
			const value = currentModel.map((o) => o[props.titleKey as K]) as string[]
			return props.chip ? value : value.join(', ')
		}

		const value = currentModel[0][props.titleKey as K] as string
		return props.chip ? [value] : value
	})

	function toggleDropdown(val: boolean) {
		isMenuOpen.value = val
	}

	function getSelectedOptions(): T[] {
		if (props.returnObject) {
			const data = Array.isArray(props.modelValue ?? [])
				? ((props.modelValue || []) as T[])
				: ([props.modelValue] as T[])
			return data.reduce((res: T[], item: T) => {
				const option = props.options.find(
					(o) => o[props.valueKey as K] === item[props.valueKey as K]
				)
				option && res.push(option)
				return res
			}, [] as T[])
		}

		const data = Array.isArray(props.modelValue ?? [])
			? ((props.modelValue || []) as Array<T[K]>)
			: ([props.modelValue] as Array<T[K]>)

		return data.reduce((res: T[], val: T[K]) => {
			const option = props.options.find((o) => o[props.valueKey as K] === val)
			option && res.push(option)
			return res
		}, [] as T[])
	}

	function isOptionSelected(option: T) {
		const optionValue = option[props.valueKey as K]
		return selectedOptionsValues.value.includes(optionValue)
	}

	function onActivatorFocus() {
		isActivatorFocused.value = true
	}

	function onActivatorBlur() {
		isActivatorFocused.value = false
	}

	function onItemClick({ item, index }: { item: T; index: number }) {
		activeOptionIndex.value = index

		if (props.multiple) {
			isDirty.value = true
			const clickedOptionIndex = selectedOptionsValues.value.findIndex(
				(v) => v === item[props.valueKey as K]
			)
			clickedOptionIndex === -1
				? selectedOptions.value.push(item)
				: selectedOptions.value.splice(clickedOptionIndex, 1)
			return
		}

		const clickedOptionIndex = selectedOptionsValues.value.findIndex(
			(v) => v === item[props.valueKey as K]
		)

		if (clickedOptionIndex !== -1 && !props.anyUpdateEmits) {
			return
		}

		isDirty.value = true
		selectedOptions.value = [item]
		emits(
			'update:modelValue',
			props.returnObject ? item : item[props.valueKey as K]
		)
		isMenuOpen.value = false
	}

	function clearSelected(ev: MouseEvent) {
		selectedOptions.value = []
		activeOptionIndex.value = null
		emits('click:clear', ev)
		emits('update:modelValue', props.multiple ? [] : null)
	}

	function onChipClick(index: number) {
		selectedOptions.value.splice(index, 1)
		let value: T[K] | Array<T[K]> | T | T[] | null = null
		if (props.multiple) {
			value = props.returnObject
				? selectedOptions.value
				: selectedOptions.value.map((o) => o[props.valueKey as K])
		}
		emits('update:modelValue', value)
	}

	/* keydown handlers */

	function handlePressingDownKey() {
		if (activeOptionIndex.value === null) {
			activeOptionIndex.value = 0
			menuContentEl.value && menuContentEl.value.focus()
			return
		}

		if (
			activeOptionIndex.value >= 0 &&
			activeOptionIndex.value < size(props.options) - 1
		) {
			activeOptionIndex.value += 1
		}
	}

	function handlePressingUpKey() {
		if (activeOptionIndex.value === null) {
			activeOptionIndex.value = size(props.options) - 1
			menuContentEl.value && menuContentEl.value.focus()
			return
		}

		if (
			activeOptionIndex.value > 0 &&
			activeOptionIndex.value < size(props.options)
		) {
			activeOptionIndex.value -= 1
		}
	}

	function executeAfterHandleEscOrTabKeysPress() {
		isMenuOpen.value = false
		isDirty.value = false
		activeOptionIndex.value = null
		activatorElement.value && activatorElement.value.blur()
	}

	function handlePressingEscOrTabKeys(key: 'esc' | 'tab') {
		if (!isDirty.value || isEmpty(selectedOptions.value) || key === 'esc') {
			selectedOptions.value = cloneDeep(initialSelectedOptions.value)
			executeAfterHandleEscOrTabKeysPress()
			return
		}

		if (props.multiple) {
			emits(
				'update:modelValue',
				props.returnObject
					? selectedOptions.value
					: selectedOptions.value.map((o) => o[props.valueKey as K])
			)
			executeAfterHandleEscOrTabKeysPress()
		}
	}

	function handlePressingSpaceOrEnterKeys() {
		if (activeOptionIndex.value === null) {
			isMenuOpen.value = true
			activeOptionIndex.value = 0
			menuContentEl.value && menuContentEl.value.focus()
			return
		}

		const item = props.options[activeOptionIndex.value!]
		onItemClick({ item, index: activeOptionIndex.value! })
	}

	function onKeydown({
		event,
		key
	}: {
		event: KeyboardEvent
		key: 'down' | 'up' | 'esc' | 'enter' | 'space' | 'tab'
	}) {
		if (isEmpty(props.options)) {
			return
		}

		switch (key) {
			case 'down':
				event.preventDefault()
				event.stopPropagation()
				handlePressingDownKey()
				break
			case 'up':
				event.preventDefault()
				event.stopPropagation()
				handlePressingUpKey()
				break
			case 'esc':
			case 'tab':
				handlePressingEscOrTabKeys(key)
				break
			case 'enter':
			case 'space':
				event.preventDefault()
				event.stopPropagation()
				handlePressingSpaceOrEnterKeys()
				break
		}

		const optionEl = document.getElementById(
			`${menuId}-${activeOptionIndex.value}`
		)
		optionEl && optionEl.scrollIntoView({ behavior: 'auto', block: 'center' })
	}

	onMounted(() => {
		menuContentEl.value = document.getElementById(`${menuId}-content`)
	})

	watch(
		[() => props.modelValue, () => props.options],
		() => {
			selectedOptions.value = getSelectedOptions()
			initialSelectedOptions.value = cloneDeep(selectedOptions.value)
		},
		{ immediate: true }
	)

	watch(
		() => isMenuOpen.value,
		(val, oVal) => {
			if (val !== oVal && !val) {
				if (isDirty.value && props.multiple) {
					emits(
						'update:modelValue',
						props.returnObject
							? selectedOptions.value
							: selectedOptions.value.map((o) => o[props.valueKey as K])
					)
					isDirty.value = false
					activeOptionIndex.value = null
				}
			}
		}
	)

	watch(
		[() => isActivatorFocused.value, () => isMenuOpen.value],
		(val, oVal) => {
			const [isFocusedPrev] = oVal
			const [isFocused, opened] = val
			if (isFocused && isFocused !== isFocusedPrev && !opened) {
				emits('focus')
				focused.value = true
				return
			}

			if (!isFocused && !opened) {
				emits('blur')
				focused.value = false
			}
		}
	)

	return {
		menuId,
		focused,
		isMenuOpen,
		isDirty,
		activatorElement,
		transformedOptions,
		selectedOptions,
		activeOptionIndex,
		displaySelection,
		toggleDropdown,
		onKeydown,
		onItemClick,
		onActivatorFocus,
		onActivatorBlur,
		clearSelected,
		onChipClick,
		isOptionSelected
	}
}
