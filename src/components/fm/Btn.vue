<template>
    <button
        class="h-10 px-6 flex items-center rounded-3xl text-sm"
        :class="['btn', type]"
    >
        <div v-if="icon"
             class="icon material-icons "
        >
            {{ icon }}
        </div>
        <slot/>
    </button>
</template>

<script setup>

defineProps({
    icon: String,
    type: {
        type: String,
        default: 'text',
        validator: (value) => ["text", "filled"].includes(value)
    },
});
</script>

<style scoped>
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
    outline: none;

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
