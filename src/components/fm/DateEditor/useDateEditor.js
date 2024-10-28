import { nextTick, ref } from 'vue'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isoWeek from 'dayjs/plugin/isoWeek'
import { displayingDateFormat } from '@/components/fm/DateEditor/constants'
import { processedDate } from '@/components/fm/DateEditor/utils'

export default function useDateEditor(props, emits) {
	dayjs.extend(customParseFormat)
	dayjs.extend(isoWeek)

	const currentMenuItem = ref('custom')

	const initialValue = ref(props.modelValue)

	const innerValue = ref(props.modelValue)

	const textFieldInput = ref(props.modelValue ? dayjs(props.modelValue).format(displayingDateFormat) : null)

	function allowedDates(val) {
		const date = dayjs(val)
		const dayOfWeek = date.isoWeekday();

		if ([6, 7].includes(dayOfWeek)) {
			return false
		}

		return !(props.nonWorkingDays || []).some(d => dayjs(d).isSame(date, 'day'))
	}

	function selectMenuItem(item) {
		currentMenuItem.value = item
		if (item === 'today') {
			innerValue.value = dayjs().format(displayingDateFormat)
			textFieldInput.value = innerValue.value
			return
		}

		if (item === 'previous') {
			let count = 0
			let selectedDay = innerValue.value
			let isDayAvailable = false
			while (!isDayAvailable && count < 90) {
				selectedDay = dayjs(selectedDay).add(-1, 'day')
				isDayAvailable = allowedDates(selectedDay)
				count++
			}
			if (isDayAvailable) {
				innerValue.value = dayjs(selectedDay).format(displayingDateFormat)
				textFieldInput.value = innerValue.value
			}
		}
	}

	function onUpdate(val) {
		innerValue.value = val
		textFieldInput.value = dayjs(val).format(displayingDateFormat)
		if (currentMenuItem.value !== 'custom') {
			currentMenuItem.value = 'custom'
		}
	}

	function onUpdateByKeyboard(val) {
		textFieldInput.value = val
		const processedVal = processedDate(val)

		nextTick(() => {
			textFieldInput.value = processedVal
		})
	}

	function onKeydownEsc() {
		textFieldInput.value = innerValue.value
	}

	function onChange(key) {
		const isDateValid = dayjs(textFieldInput.value, displayingDateFormat, true).isValid()
		if (!isDateValid && key === 'tab') {
			textFieldInput.value = innerValue.value
		} else if (isDateValid) {
			innerValue.value = textFieldInput.value
		}
	}

	function cancelDateSelection() {
		innerValue.value = initialValue
		textFieldInput.value = initialValue
	}

	function confirmDateSelection() {
		emits('update:modelValue', innerValue.value)
	}

	return {
		currentMenuItem,
		initialValue,
		innerValue,
		textFieldInput,
		allowedDates,
		selectMenuItem,
		onUpdate,
		onUpdateByKeyboard,
		onKeydownEsc,
		onChange,
		cancelDateSelection,
		confirmDateSelection,
	}
}
