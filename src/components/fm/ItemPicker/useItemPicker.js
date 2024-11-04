import { computed, ref } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import isEmpty from 'lodash/isEmpty'
import set from 'lodash/set'
import keyBy from 'lodash/keyBy'

export default function useItemPicker(props, emits) {
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

	const initialSelectedItemsIds = computed(() => initialSelectedItems.value.map(i => i.id))
	const selectedItemsIds = computed(() => selectedItems.value.map(i => i.id))

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
		const val = []

		if (isEmpty(allDataFlattenedFiltered.value)) {
			return val
		}

		if (!searchText.value) {
			props.suggested && !isEmpty(props.suggested) && val.push({
				id: 'suggested',
				label: props.fieldsTitles.suggestedLabel,
				children: props.suggested
			})

			props.multiple && val.push({
				id: 'selected',
				label: isEmpty(selectedItemsIds.value)
					? props.fieldsTitles.selectedLabel
					: `${props.fieldsTitles.selectedLabel} (${selectedItemsIds.value.length})`,
				children: selectedItems.value
			})
		} else {
			val.push({
				id: 'search-result',
				label: props.fieldsTitles.allCategoriesLabel,
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

	function prepareFlatData(categories) {
		const value = []

		const transformCategoryItems = (parentId, items) => {
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

	function mergeCategoryData(v1, v2) {
		const mergedData = cloneDeep(v1)

		const foo = (data, children) => {
			children.forEach((item) => {
				const { id } = item
				const possibleIndex = data.children.findIndex(i => i.id === id)
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
		//
		// v1.children.forEach(item => {
		// 	const { id } = item
		// 	const possibleIndex = mergedData.children.findIndex(i => i.id === id)
		// 	if (possibleIndex === -1) {
		// 		mergedData.children.push(item)
		// 	} else {
		//
		// 	}
		// })
		//
		//
		// return mergedData
	}

	function restoreFromFlatData(data) {
		const categoryIds = []
		const value = []

		const restoreCategoryBranch = (ids, val) => {
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

		data.forEach((item) => {
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

	function select(itemId) {
		const item = cloneDeep(allDataFlattenedById.value[itemId])
		delete item.compositeId

		if (!props.multiple) {
			selectedItems.value = [item]
			emits('update:modelValue', selectedItems.value)
			emits('close')

			return
		}

		const itemIndex = selectedItems.value.findIndex(i => i.id === itemId)
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
