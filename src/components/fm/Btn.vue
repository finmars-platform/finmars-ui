<template>
    <button
        class="h-10 px-6 flex items-center rounded-3xl text-sm outline-none"
        :class="['btn', type]"
        @mousedown.prevent=""
    >
        <fm-icon
            v-if="icon"
            :icon="icon"
        />
        <slot/>
    </button>
</template>

<script setup>
    import FmIcon from "./Icon.vue";

    defineProps({
        icon: String,
        type: {
            type: String,
            default: 'text',
            validator: (value) => ["text", "filled"].includes(value)
        },
    });

</script>

<style>
    :root {
        --button-disabled-opacity: 0.38;

        --button-text-color: rgb(143, 76, 54);
        --button-text-backgroundColor: initial;
        --button-text-state-backgroundColor-rgb: 103, 80, 164;
        --button-text-hover-backgroundColor: rgba(var(--button-text-state-backgroundColor-rgb), 0.08);
        --button-text-focus-backgroundColor: rgba(var(--button-text-state-backgroundColor-rgb), 0.12);
        --button-text-active-backgroundColor: rgba(var(--button-text-state-backgroundColor-rgb), 0.12);
        --button-text-disabled-color: var(--baseText-color);
        --button-text-disabled-backgroundColor: unset;

        --button-filled-color: var(--onPrimary-color);
        --button-filled-backgroundColor: var(--primary-color);
        --button-filled-hover-backgroundColor: rgba(143, 76, 54, 0.92);
        --button-filled-focus-backgroundColor: rgba(143, 76, 54, 0.88);
        --button-filled-active-backgroundColor: rgba(143, 76, 54, 0.88);
        --button-filled-disabled-color: var(--button-filled-color);
        --button-filled-disabled-backgroundColor: rgba(var(--primary-color-rgb), 0.50);
    }

    body.dark {
        --button-text-color: var(--primary-color);
        --button-text-state-backgroundColor-rgb: 208, 188, 255;
        --button-text-hover-backgroundColor: rgba(var(--button-text-state-backgroundColor-rgb), 0.08);
        --button-text-focus-backgroundColor: rgba(var(--button-text-state-backgroundColor-rgb), 0.12);
        --button-text-active-backgroundColor: rgba(var(--button-text-state-backgroundColor-rgb), 0.12);
        --button-text-hover-color: var(--button-text-color);
        --button-text-focus-color: var(--button-text-color);
        --button-text-active-color: var(--button-text-color);
        --button-text-disabled-color: var(--baseText-color);

        --button-filled-color: var(--onPrimary-color);
        --button-filled-backgroundColor: var(--primary-color);
        --button-filled-hover-color: var(--button-filled-color);
        --button-filled-hover-backgroundColor: rgba(var(--primary-color-rgb), 0.92);
        --button-filled-focus-color: var(--button-filled-color);
        --button-filled-focus-backgroundColor: rgba(var(--primary-color-rgb), 0.88);
        --button-filled-active-color: var(--button-filled-color);
        --button-filled-active-backgroundColor: rgba(var(--primary-color-rgb), 0.88);
        --button-filled-disabled-color: var(--button-filled-color);
        --button-filled-disabled-backgroundColor: rgba(var(--primary-color-rgb), 0.50);
    }
</style>

<style lang="postcss" scoped>
/*$height: 36px;
.fm_btn {
    height: $height;
    line-height: $height;
    padding: 0 16px;
    min-width: 64px;
    //border-radius: 4px;
    border-radius: 100px;
    text-transform: capitalize;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.4px;
    transition: 0.3s;
    user-select: none;

    &.basic {
        color: var(--primary-color);

        &:not([disabled]):hover {
            background: var(--primary-hover);
        }
    }

    &.primary {
        background: var(--primary-color);
        color: var(--base-backgroundColor);

        &:not([disabled]):hover {
            background: var(--primary-hover);
        }
    }

    &.outlined {
        font-weight: 700;
        border-radius: 3px;
        border: 1px solid var(--border-color);
        color: var(--primary-color);

        &:not([disabled]):hover {
            background-color: var(--primary-hover);
        }
    }
    !*&.plain {
        padding: 0;
        background: transparent !important;
        height: auto;
        line-height: 1.5;
        &:not([disabled]):hover {
            color: $text;
        }
    }*!

    &.text {
        color: var(--secondary-color);

        &:not([disabled]):hover {
            background: var(--activeState-backgroundColor);
        }
        &:not([disabled]).active {
            background: var(--activeState-backgroundColor);
        }
    }

    &.action {
        color: var(--primary-color);

        .icon {
            color: var(--primary-color) !important;
        }

        &:not([disabled]):hover {
            background-color: var(--onPrimary-color);
        }
    }

    &.icon {
        padding: 0;
        min-width: 0;
        height: auto;

        &.primaryIcon {
            color: var(--primary-color);

            .icon {
                color: var(--primary-color);
            }
        }
    }

    &[disabled] {
        cursor: default;
        opacity: 0.6;

        &.primary {
            background-color: rgba(var(--primary-color), var(--disabled-opacity));
            opacity: 1;
        }
    }
}

.fm_btn.icon {
    display: flex;
    align-items: center;

    .icon {
        color: var(--baseText-color);
    }

    &:not(.icon) .icon {
        margin-right: 7px;
    }
}*/
.btn {
    &.text {
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

    &.filled {
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
