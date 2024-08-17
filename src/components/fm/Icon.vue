<template>
    <div class="icon material-icons color-[inherit] w-[inherit]"
         :style="{ fontSize: size + 'rem' }">{{ icon }}</div>
</template>

<script setup>

    defineProps({
        icon: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            default: 1.5,
        },
    })

</script>

<style lang="postcss" scoped>

    .icon {
        cursor: inherit;
        color: inherit;
    }

</style>
