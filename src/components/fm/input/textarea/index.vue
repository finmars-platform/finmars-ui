<template>
    <div class="fm-input-textarea">
        <div v-if="label">{{ label }}</div>

        <div class="textarea-borders inline-block leading-none
p-[calc(var(--textarea-thick-borderWidth)-var(--textarea-borderWidth))]
border border-solid -border--textarea-borderColor -rounded--input-borderRadius
focus-within:-border--textarea-focus-borderColor
focus-within:-border--textarea-focus-borderWidth
focus-within:p-0
">
            <!-- p-[calc(--textarea-thick-borderWidth---textarea-borderWidth)] -->
            <textarea
                :value="modelValue"
                :rows="$attrs.rows || 2"
                :cols="$attrs.cols"
                :disabled="disabled"
                :autofocus="autofocus"
                class="-bg--textarea-backgroundColor p-1 focus:outline-0"
                :class="{
                'resize-none': !resize,
                'resize': resize === 'both',
                'resize-x': resize === 'horizontal',
                'resize-y': resize === 'vertical',
                'w-full': !$attrs.cols && (!resize || resize === 'horizontal'),
            }"
                @input="emit('update:modelValue', $event.target.value)"
            ></textarea>
        </div>
    </div>
</template>

<script setup>

// stores
// props, emits
let props = defineProps({
    modelValue: String,
    label: String,
    disabled: Boolean,
    resize: {
        type: String,
        validator(value) {
            return !value ||
                ["both", "vertically", "horizontally"].includes(value);
        }
    },
    autofocus: Boolean,
})

let emit = defineEmits(['update:modelValue']);

//# region variables, refs, computed

//# endregion

//# region hooks
//# endregion

// watchers
</script>

<style>
:root {
    --textarea-backgroundColor: transparent;

    --textarea-borderWidth: theme('borderWidth.--input-borderWidth');
    --textarea-thick-borderWidth: theme('borderWidth.--input-thick-borderWidth');

    --textarea-borderColor: var(--border-color);


    --textarea-color: var(--baseText-color);
    --textareaLabel-fontSize: theme('fontSize.--inputLabel-fontSize');
    --textareaBottomText-fontSize: theme('fontSize.--inputBottomText-fontSize');

    --textarea-focus-borderWidth: var(--textarea-thick-borderWidth);
    --textarea-focus-borderColor: var(--primary-color);
    /*--textarea-focus-padding: calc(var(--textarea-padding) - var(--textarea-thick-borderWidth)); !* prevents movement of elements when width of borders changes *!*/

    --textarea-error-borderColor: var(--error-color);

    --textarea-disabled-opacity: var(--disabled-opacity);
    --textarea-disabled-color: var(--baseText-color);
}

body.dark {

}
</style>

<style lang=postcss scoped>

</style>