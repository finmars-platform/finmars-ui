<template>
    <button
        class="p-2 block rounded-full text-sm btn relative group outline-none"
        :class="[
                    type,
                    type === 'basic' ? 'cursor-default' : 'cursor-pointer',
                    {'has-tooltip': tooltip}
                ]"
    >
        <div
            class="items-center icon flex"
            :class="[
                    type,
                    {error}
                ]"
        >
            <div class="material-icons" :style="{ fontSize: size + 'px' }">{{ icon }}</div>
            <span
                v-if="tooltip"
                class="-bottom-6 left-1/2 -translate-x-1/2 text-[#e6e6e6] bg-[#1a1a1a] p-1
                       leading-4 rounded text-sm transition duration-300 whitespace-nowrap invisible
                       absolute invisible z-10 group-hover:visible group-hover:z-50"
            >
                {{ tooltip }}
            </span>
        </div>
    </button>
</template>

<script setup>
defineProps({
    icon: String,
    size: String,
    tooltip: String,
    error: Boolean,
    type: {
        type: String,
        default: 'basic',
        validator: (value) => ['basic', 'button', 'filledButton'].includes(value),
    }
})
</script>

<style scoped>

.icon {
    &.basic {
        color: theme('colors.--primary-color');
    }

    &.error {
        color: red;
    }
}

.btn {

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
