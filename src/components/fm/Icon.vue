<template>
    <button
        class="fm-icon block rounded-full outline-none"
        :class="[
                    type,
                ]"
    >

        <div class="material-icons color-[inherit]" :style="{ fontSize: size + 'rem' }">{{ icon }}</div>
    </button>
</template>

<script setup>

    defineProps({
        icon: String,
        size: {
            type: Number,
            default: 1.5,
        },
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
        .material-icons {
            padding: theme('padding.--icon-padding');
        }

        &.basic {
            cursor: inherit;
            color: inherit;
        }

        &.error {
            color: theme('colors.--error-color');
        }

        &.button {
            color: theme('colors.--icon-button-color');
            background-color: theme('colors.--icon-button-backgroundColor');

            &:hover {
                background-color: theme('colors.--icon-button-hover-backgroundColor');
            }

            &:focus {
                background-color: theme('colors.--icon-button-focus-backgroundColor');
            }

            &:active {
                background-color: theme('colors.--icon-button-active-backgroundColor');
            }

            &:disabled {
                opacity: theme('opacity.--icon-disabled');
                color: theme('colors.--icon-button-disabled-color');
                background-color: theme('colors.--icon-button-disabled-backgroundColor');
            }
        }

        &.filledButton {
            color: theme('colors.--icon-filledButton-color');
            background-color: theme('colors.--icon-filledButton-backgroundColor');

            &:hover {
                background-color: theme('colors.--icon-filledButton-hover-backgroundColor');
            }

            &:focus {
                background-color: theme('colors.--icon-filledButton-focus-backgroundColor');
            }

            &:active {
                background-color: theme('colors.--icon-filledButton-active-backgroundColor');
            }

            &:disabled {
                opacity: theme('opacity.--icon-disabled');
                color: theme('colors.--icon-filledButton-disabled-color');
                background-color: theme('colors.--icon-filledButton-disabled-backgroundColor');
            }
        }

    }

</style>
