<template>

    <button
        class="icon-btn
block leading-none rounded-full outline-none
        "
        :class="[type]"
    >
        <!-- Without .block height for the <button> above calculated
        more than required  -->
        <fm-icon class="block" :icon="icon" :size="size" />
    </button>

</template>

<script setup>
    import FmIcon from "./Icon.vue"

    // stores
    // props, emits
    defineProps({
        icon: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            default: 1.5,
        },
        type: {
            type: String,
            default: 'basic',
            validator: (value) => ['basic', 'filled'].includes(value),
        }
    })

    //# region variables, refs, computed

    //# endregion

    //# region hooks
    //# endregion

    // watchers
</script>

<style>

:root {
    --iconButton-color: var(--primary-color);
    --iconButton-padding: 0.25rem;
    --iconButton-backgroundColor: initial;
    --iconButton-state-backgroundColor-rgb: 73, 69, 79;
    --iconButton-hover-backgroundColor: rgba(var(--iconButton-state-backgroundColor-rgb), 0.08);
    --iconButton-focus-backgroundColor: rgba(var(--iconButton-state-backgroundColor-rgb), 0.12);
    --iconButton-active-backgroundColor: rgba(var(--iconButton-state-backgroundColor-rgb), 0.12);
    --iconButton-hover-color: var(--iconButton-color);
    --iconButton-focus-color: var(--iconButton-color);
    --iconButton-active-color: var(--iconButton-color);
    --iconButton-disabled-color: var(--baseText-color);
    --iconButton-disabled-backgroundColor: unset;

    --iconButton-filled-color: var(--onPrimary-color);
    --iconButton-filled-backgroundColor: var(--primary-color);
    --iconButton-filled-state-backgroundColor-rgb: var(--primary-color-rgb);
    --iconButton-filled-hover-backgroundColor: rgb(var(--iconButton-filled-state-backgroundColor-rgb));
    --iconButton-filled-focus-backgroundColor: rgb(var(--iconButton-filled-state-backgroundColor-rgb));
    --iconButton-filled-active-backgroundColor: rgb(var(--iconButton-filled-state-backgroundColor-rgb));
    --iconButton-filled-hover-color: var(--iconButton-filled-color);
    --iconButton-filled-focus-color: var(--iconButton-filled-color);
    --iconButton-filled-active-color: var(--iconButton-filled-color);
    --iconButton-filled-disabled-color: var(--baseText-color);
    --iconButton-filled-disabled-backgroundColor: rgba(29, 27, 32, 0.50);
}

body.dark {
    --iconButton-color: var(--primary-color);
    --iconButton-state-backgroundColor-rgb: 202, 196, 208;
    --iconButton-hover-backgroundColor: rgba(var(--iconButton-state-backgroundColor-rgb), 0.08);
    --iconButton-focus-backgroundColor: rgba(var(--iconButton-state-backgroundColor-rgb), 0.12);
    --iconButton-active-backgroundColor: rgba(var(--iconButton-state-backgroundColor-rgb), 0.12);
    --iconButton-disabled-color: var(--baseText-color);

    --iconButton-filled-color: var(--onPrimary-color);
    --iconButton-filled-backgroundColor: var(--primary-color);
    --iconButton-filled-state-backgroundColor-rgb: var(--primary-color-rgb);
    --iconButton-filled-hover-backgroundColor: rgb(var(--iconButton-filled-state-backgroundColor-rgb));
    --iconButton-filled-focus-backgroundColor: rgb(var(--iconButton-filled-state-backgroundColor-rgb));
    --iconButton-filled-active-backgroundColor: rgb(var(--iconButton-filled-state-backgroundColor-rgb));
    --iconButton-filled-disabled-color: var(--baseText-color);
    --iconButton-filled-disabled-backgroundColor: rgba(230, 224, 233, 0.50);
}
</style>

<style lang=postcss scoped>
    .icon-btn {
        padding: theme('padding.--iconButton-padding');

        &.basic {
            color: theme('colors.--iconButton-color');
            background-color: theme('colors.--iconButton-backgroundColor');

            &:hover {
                background-color: theme('colors.--iconButton-hover-backgroundColor');
            }

            &:focus {
                background-color: theme('colors.--iconButton-focus-backgroundColor');
            }

            &:active {
                background-color: theme('colors.--iconButton-active-backgroundColor');
            }

            &:disabled {
                opacity: theme('opacity.--icon-disabled');
                color: theme('colors.--iconButton-disabled-color');
                background-color: theme('colors.--iconButton-disabled-backgroundColor');
            }
        }

        &.filled {
            color: theme('colors.--iconButton-filled-color');
            background-color: theme('colors.--iconButton-filled-backgroundColor');

            &:hover {
                background-color: theme('colors.--iconButton-filled-hover-backgroundColor');
            }

            &:focus {
                background-color: theme('colors.--iconButton-filled-focus-backgroundColor');
            }

            &:active {
                background-color: theme('colors.--iconButton-filled-active-backgroundColor');
            }

            &:disabled {
                opacity: theme('opacity.--icon-disabled');
                color: theme('colors.--iconButton-filled-disabled-color');
                background-color: theme('colors.--iconButton-filled-disabled-backgroundColor');
            }
        }

    }
</style>