import { computed, ref } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import isEmpty from 'lodash/isEmpty'
import set from 'lodash/set'
import keyBy from 'lodash/keyBy'

export default function useItemPicker(props: any, emits: any) {
	const searchText = ref('')

	const initialSelectedItems = ref(cloneDeep(props.modelValue))
	const selectedItems = ref(cloneDeep(props.modelValue))

	const widthValue = computed(() => {
		if (['auto', '100%'].includes(props.width)) {
			return props.width
		}

		return `${props.width}px`
	})
	const heightValue = computed(() => {
		if (['auto', '100%'].includes(props.height)) {
			return props.height
		}

		return `${props.height}px`
	})

	const initialSelectedItemsIds = computed(() => initialSelectedItems.value.map((i: any) => i.id))
	const selectedItemsIds = computed(() => selectedItems.value.map((i: any) => i.id))

	const addBtnDisabled = computed(() => {
		return JSON.stringify(initialSelectedItemsIds.value.sort()) === JSON.stringify(selectedItemsIds.value.sort())
	})

	const allDataFlattened = computed(() => prepareFlatData(props.categories))

	const allDataFlattenedById = computed(() => keyBy(allDataFlattened.value, 'id'))

	const allDataFlattenedFiltered = computed(() => allDataFlattened.value.filter(i => {
		if (i.type) {
			return false
		}

		if (!searchText.value) {
			return true
		}

		return i.label.toLocaleLowerCase().includes(searchText.value.toLocaleLowerCase())
	}))

	const dataRestoredFromFlattenedData = computed(() => {
		const val = [] as any[]

		if (isEmpty(allDataFlattenedFiltered.value)) {
			return val
		}

		if (!searchText.value) {
			props.suggested && !isEmpty(props.suggested) && val.push({
				id: 'suggested',
				label: props.locals.suggestedLabel,
				children: props.suggested
			})

			props.multiple && val.push({
				id: 'selected',
				label: isEmpty(selectedItemsIds.value)
					? props.locals.selectedLabel
					: `${props.locals.selectedLabel} (${selectedItemsIds.value.length})`,
				children: selectedItems.value
			})
		} else {
			val.push({
				id: 'search-result',
				label: props.locals.allCategoriesLabel,
				children: allDataFlattenedFiltered.value
			})
		}

		return [
			...val,
			...restoreFromFlatData(allDataFlattenedFiltered.value)
		]
	})

	const focusedItems = ref([dataRestoredFromFlattenedData.value[0]?.id])

	const currentCategory = computed(() => {
		if (!dataRestoredFromFlattenedData.value.length) {
			return null
		}

		return dataRestoredFromFlattenedData.value.find(c => c.id === focusedItems.value[0])
	})

	function prepareFlatData(categories: any[]) {
		const value = [] as any[]

		const transformCategoryItems = (parentId: string, items: any[]) => {
			items.forEach(item => {
				const { id, label, children, tooltip } = item
				if (children) {
					value.push({
						id,
						compositeId: `${parentId}.${id}`,
						label,
						type: 'group'
					})

					children.length && transformCategoryItems(`${parentId}.${id}`, children)
				} else {
					value.push({
						id,
						compositeId: `${parentId}.${id}`,
						label,
						...(tooltip && { tooltip })
					})
				}
			})
		}

		categories.forEach(category => {
			const { id, label, children } = category
			value.push({
				id,
				compositeId: `${id}`,
				label,
				type: 'category'
			})

			children && children.length && transformCategoryItems(id, children)
		})

		return value
	}

	function mergeCategoryData(v1: any, v2: any) {
		const mergedData = cloneDeep(v1)

		const foo = (data: any, children: any) => {
			children.forEach((item: any) => {
				const { id } = item
				const possibleIndex = data.children.findIndex((i: any) => i.id === id)
				if (possibleIndex === -1) {
					data.children.push(item)
				} else {
					if ('children' in item) {
						return foo(data.children[possibleIndex], item.children)
					} else {
						merge(data.children[possibleIndex], item)
					}
				}
			})

			return data
		}

		return foo(mergedData, v2.children)
	}

	function restoreFromFlatData(data: any) {
		const categoryIds = [] as any[]
		const value = [] as any[]

		const restoreCategoryBranch = (ids: string[], val: any): any => {
			const itemId = ids[0]
			const { label, tooltip } = allDataFlattenedById.value[itemId]

			if (isEmpty(val)) {
				const restoredItem = {
					id: itemId,
					label: label || '',
					...(tooltip && { tooltip })
				}
				return restoreCategoryBranch(ids.slice(1), restoredItem)
			}

			const restoredItem = {
				id: itemId,
				label,
				children: [val]
			}
			return ids.length === 1 ? restoredItem : restoreCategoryBranch(ids.slice(1), restoredItem)
		}

		data.forEach((item: any) => {
			const { compositeId } = item
			const extractedIds = compositeId.split('.')

			const categoryId = extractedIds[0]
			let availableCurrentCategoryData = null
			let currentCategoryDataIndex
			if (categoryIds.includes(categoryId)) {
				currentCategoryDataIndex = value.findIndex(c => c.id === categoryId)
				availableCurrentCategoryData = value[currentCategoryDataIndex]
			} else {
				categoryIds.push(categoryId)
				currentCategoryDataIndex = value.length
			}

			const categoryBranch = restoreCategoryBranch(extractedIds.reverse(), {})
			const mergedCategory = availableCurrentCategoryData
				? mergeCategoryData(availableCurrentCategoryData, categoryBranch)
				: categoryBranch

			set(value, currentCategoryDataIndex, mergedCategory)
		})

		return value
	}

	function select(itemId: string) {
		const item = cloneDeep(allDataFlattenedById.value[itemId])
		delete item.compositeId

		if (!props.multiple) {
			selectedItems.value = [item]
			emits('update:modelValue', selectedItems.value)
			emits('close')

			return
		}

		const itemIndex = selectedItems.value.findIndex((i: any) => i.id === itemId)
		if (itemIndex === -1) {
			selectedItems.value.push(item)
		} else {
			selectedItems.value.splice(itemIndex, 1)
		}
	}

	function updateValue() {
		emits('update:modelValue', selectedItems.value)
		emits('close')
	}

	return {
		searchText,
		initialSelectedItems,
		focusedItems,

		selectedItems,
		widthValue,
		heightValue,
		initialSelectedItemsIds,
		selectedItemsIds,
		addBtnDisabled,

		allDataFlattenedById,
		allDataFlattenedFiltered,
		dataRestoredFromFlattenedData,
		currentCategory,

		select,
		updateValue,
	}
}
