<template>
    <div
        class="relative break-words -bg--card-backgroundColor
-p--card-padding -border--card-borderWidth border-solid
-border--card-borderColor -rounded--card-borderRadius box-border
    "
    :class="{
        '-pb--cardFooterSpace-paddingBottom': $slots.footer,
    }"
    >
        <div
            v-if="title"
            class="break-words text-2xl mb-6 -text--cardTitle-fontSize
-font--cardTitle-fontFamily -font--cardTitle-fontWeight
-leading--cardTitle-lineHeight -tracking--cardTitle-letterSpacing
            ">
            {{ title }}
        </div>

        <slot></slot>

        <div v-if="$slots.footer"
             class="absolute bottom-0 left-0 w-full box-border
-h--cardFooter-height -pt--cardFooter-paddingTop -pb--cardFooter-paddingBottom px-5
             "
        >
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script setup>
    import {computed} from "vue";

    let props = defineProps({
        title: String,
    })
</script>

<style>

    :root {
        --card-backgroundColor: rgb(255, 241, 237);

        --card-padding: 1.25rem;

        --cardFooter-height: calc(
            2.5rem +
            var(--cardFooter-paddingTop) +
            var(--cardFooter-paddingBottom)
        );

        --cardFooter-paddingTop: var(--card-padding);
        --cardFooter-paddingBottom: var(--card-padding);
        --cardFooterSpace-paddingBottom: var(--cardFooter-height);

        --card-borderWidth: 0.05rem;
        --card-borderColor: var(--border-color);
        --card-borderRadius: 0.75rem;

        --cardTitle-fontSize: 6rem;
        --cardTitle-fontFamily: var(--baseText-fontFamily);
        --cardTitle-fontWeight: 400;
        --cardTitle-lineHeight: 1.5rem;
        --cardTitle-letterSpacing: var(--baseText-letterSpacing);
    }

    body.dark {
        --card-backgroundColor: rgb(26, 17, 15);
    }

</style>
