import { nextTick, ref } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import { processedDate } from '@/components/fm/DateEditor/utils';
import type { FmDateEditorEmits, FmDateEditorProps } from '@/components/fm/DateEditor/types';
import type { Nullable } from '@/types';

export default function useDateEditor(props: FmDateEditorProps, emits: FmDateEditorEmits) {
  dayjs.extend(customParseFormat);
  dayjs.extend(isoWeek);

  const currentMenuItem = ref('custom');

  const DATE_FORMAT = 'YYYY-MM-DD';
  const TIME_FORMAT = 'HH:mm';
  const VALUE_FORMAT = props.includeTime ? 'YYYY-MM-DD[T]HH:mm' : 'YYYY-MM-DD';

  const initialValue = ref(props.modelValue ? dayjs(props.modelValue).format(DATE_FORMAT) : '');
  const initialTime = ref(props.modelValue ? dayjs(props.modelValue).format(TIME_FORMAT) : '00:00');

  const innerValue = ref(initialValue.value);
  const innerTime = ref(initialTime.value);

  const textFieldInput = ref(props.modelValue ? dayjs(props.modelValue).format(DATE_FORMAT) : null);

  function isDateWithinAllowedRange({
    val,
    min = props.min,
    max = props.max
  }: {
    val: Nullable<string>;
    min?: string;
    max?: string;
  }) {
    if (!val) {
      return true;
    }

    const selectedDate = dayjs(val);
    const minDateValue = min ? dayjs(min) : null;
    const maxDateValue = max ? dayjs(max) : null;

    const isDateMoreThanMin = minDateValue ? selectedDate.diff(minDateValue, 'day') >= 0 : true;
    const isDateLessThanMax = maxDateValue ? maxDateValue.diff(selectedDate, 'day') > 0 : true;

    return isDateMoreThanMin && isDateLessThanMax;
  }

  function allowedDates(val: Dayjs | string, ignoreWeekends?: boolean) {
    const date = dayjs(val);
    const dayOfWeek = date.isoWeekday();

    if ((!props.allowWeekendSelection || ignoreWeekends) && [6, 7].includes(dayOfWeek)) {
      return false;
    }

    return !(props.nonWorkingDays || []).some((d) => dayjs(d).isSame(date, 'day'));
  }

  function selectMenuItem(item: 'today' | 'previous') {
    currentMenuItem.value = item;
    if (item === 'today') {
      innerValue.value = dayjs().format(DATE_FORMAT);
      textFieldInput.value = innerValue.value;
      return;
    }

    if (item === 'previous') {
      let count = 0;
      let selectedDay = props.calculatePreviousDayFromToday ? dayjs() : innerValue.value;
      let isDayAvailable = false;
      while (!isDayAvailable && count < 90) {
        selectedDay = dayjs(selectedDay).add(-1, 'day').format(DATE_FORMAT);
        isDayAvailable = allowedDates(selectedDay, true);
        count++;
      }
      if (isDayAvailable) {
        innerValue.value = dayjs(selectedDay).format(DATE_FORMAT);
        textFieldInput.value = innerValue.value;
      }
    }
  }

  function onUpdate(val: string) {
    innerValue.value = val;
    textFieldInput.value = dayjs(val).format(DATE_FORMAT);
    if (currentMenuItem.value !== 'custom') {
      currentMenuItem.value = 'custom';
    }
  }

  function onUpdateByKeyboard(val: string) {
    textFieldInput.value = val;
    const processedVal = processedDate(val);

    nextTick(() => {
      textFieldInput.value = processedVal;
      const isDateValid = dayjs(textFieldInput.value, DATE_FORMAT, true).isValid();

      if (isDateValid) {
        if (isDateWithinAllowedRange({ val: textFieldInput.value })) {
          innerValue.value = textFieldInput.value ?? '';
        }
      }
    });
  }

  function onKeydownEsc() {
    textFieldInput.value = innerValue.value;
  }

  function onChange(key: 'tab' | 'enter') {
    const isDateValid = dayjs(textFieldInput.value, DATE_FORMAT, true).isValid();
    if (!isDateValid && key === 'tab') {
      textFieldInput.value = innerValue.value;
    } else if (isDateValid) {
      if (isDateWithinAllowedRange({ val: textFieldInput.value })) {
        innerValue.value = textFieldInput.value ?? '';
        confirmDateSelection();
      }
    }
  }

  function cancelDateSelection() {
    innerValue.value = initialValue.value;
    textFieldInput.value = initialValue.value;
    innerTime.value = initialTime.value;
    emits('cancel');
  }

  function confirmDateSelection() {
    const [hours, minutes] = innerTime.value.split(':');
    const updatedValue = innerValue.value;
    const value = props.includeTime
      ? dayjs(updatedValue)
          .set('hour', Number(hours))
          .set('minute', Number(minutes))
          .format(VALUE_FORMAT)
      : dayjs(updatedValue).format(DATE_FORMAT);
    emits('update:modelValue', value);
  }

  return {
    DATE_FORMAT,
    TIME_FORMAT,
    currentMenuItem,
    initialValue,
    innerValue,
    initialTime,
    innerTime,
    textFieldInput,
    selectMenuItem,
    onUpdate,
    onUpdateByKeyboard,
    onKeydownEsc,
    onChange,
    cancelDateSelection,
    confirmDateSelection
  };
}
