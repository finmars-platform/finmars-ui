<template>
    <button
        class="fm-icon p-2 block rounded-full text-sm btn relative group outline-none"
        :class="[
                    type,
                    type === 'basic' ? 'cursor-default' : 'cursor-pointer',
                ]"
    >

        <div class="material-icons color-[inherit]" :style="{ fontSize: size + 'px' }">{{ icon }}</div>
    </button>
</template>

<script setup>
defineProps({
    icon: String,
    size: String,
    error: Boolean,
    type: {
        type: String,
        default: 'basic',
        validator: (value) => ['basic', 'button', 'filledButton'].includes(value),
    }
})
</script>

<style scoped>



.fm-icon {
    &.basic {
        color: theme('colors.--icon-basic-color');

        &:hover {
            background-color: theme('colors.--button-filled-hover-backgroundColor');
        }

        &:focus {
            background-color: theme('colors.--button-filled-focus-backgroundColor');
        }

        &:active {
            background-color: theme('colors.--button-filled-active-backgroundColor');
        }

        &:disabled {
            opacity: theme('opacity.--button-disabled');
            color: theme('colors.--button-filled-disabled-color');
            background-color: theme('colors.--button-filled-disabled-backgroundColor');
        }
    }

    &.error {
        color: theme('colors.--error-color');
    }

    &.button {
        color: theme('colors.--button-text-color');
        background-color: theme('colors.--button-text-backgroundColor');

        &:hover {
            background-color: theme('colors.--button-text-hover-backgroundColor');
        }

        &:focus {
            background-color: theme('colors.--button-text-focus-backgroundColor');
        }

        &:active {
            background-color: theme('colors.--button-text-active-backgroundColor');
        }

        &:disabled {
            opacity: theme('opacity.--button-disabled');
            color: theme('colors.--button-text-disabled-color');
            background-color: theme('colors.--button-text-disabled-backgroundColor');
        }
    }

    &.filledButton {
        color: theme('colors.--button-filled-color');
        background-color: theme('colors.--button-filled-backgroundColor');

        &:hover {
            background-color: theme('colors.--button-filled-hover-backgroundColor');
        }

        &:focus {
            background-color: theme('colors.--button-filled-focus-backgroundColor');
        }

        &:active {
            background-color: theme('colors.--button-filled-active-backgroundColor');
        }

        &:disabled {
            opacity: theme('opacity.--button-disabled');
            color: theme('colors.--button-filled-disabled-color');
            background-color: theme('colors.--button-filled-disabled-backgroundColor');
        }
    }

}

</style>
