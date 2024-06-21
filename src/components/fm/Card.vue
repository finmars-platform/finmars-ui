<template>
    <div class="fm_card relative rounded-2xl p-5 break-words"
         :class="{with_controls: controls, 'pb-20': controls}"
    >
        <div class="break-words text-2xl mb-6" v-if="title">{{ title }}</div>

        <slot></slot>

        <div class="absolute bottom-0 left-0 w-full pt-0">
            <slot name="controls"></slot>
        </div>
    </div>
</template>

<script setup>

defineProps({
    title: String,
    controls: Boolean
})
</script>

<style lang="scss" scoped>
.fm_card {
    background: var(--base-backgroundColor);
    color: var(--baseText-color);
    border: 1px solid var(--border-color-light);

    &.fm_card_text {
        background: none;
    }
}

.with_controls {
    background: var(--card-background-color);
    color: var(--secondary-color);
}

.settings_block {
    background: var(--card-background-color);
    color: var(--secondary-color);
}
</style>
