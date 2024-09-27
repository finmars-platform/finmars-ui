<template>
  <VBadge color="var(--backgroundColor-badge)" text-color="var(--color-badge)" :content="content" :dot="dot">
    <slot></slot>
  </VBadge>
</template>

<script setup>
import {VBadge} from 'vuetify/components'

defineProps({
  content: String,
  dot: Boolean
})
</script>

<style>
:root {
  --backgroundColor-badge: var(--error-color);
  --color-badge: var(--on-primary-color)
}

body.dark {
  --backgroundColor-badge: var(--error-color);
  --color-badge: var(--on-error-color)
}
</style>