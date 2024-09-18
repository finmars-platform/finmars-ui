<template>
  <component
      v-if="to && !children"
      :is="linkTag"
      :to="to"
      :href="to"
      class="sidebar-item"
      :class="classes"
  >
    <SideNavItemLabel
        :level="level"
        :isActive="isActive"
        :isOnlyIcon="isOnlyIcon"
        :icon="icon"
    >{{ label }}
    </SideNavItemLabel>
  </component>
  <a v-if="href && !children && !to" :href="href" class="sidebar-item"
     :class="classes">
    <SideNavItemLabel
        :level="level"
        :isActive="isActive"
        :isOnlyIcon="isOnlyIcon"
        :icon="icon"
    >{{ label }}
    </SideNavItemLabel>
  </a>
  <div v-if="children" class="sidebar-item"
       :class="classes">
    <div>
      <SideNavItemLabel
          @click="isOpen = !isOpen"
          :isActive="isOnlyIcon && isNestedActive"
          :isOnlyIcon="isOnlyIcon"
          :appendIcon="iconFirstLevel"
          :icon="iconSecondLevel"
          :level="level"
      >
        {{ label }}
      </SideNavItemLabel>
    </div>
    <div v-show="isOpen && !isOnlyIcon">
      <SideNavItem
          v-for="(item, index) in children"
          :key="item.key"
          :ref="getRefSetter(index)"
          :label="item.label"
          :action="item.action"
          :to="item.to"
          :href="item.href"
          :alternativeLink="alternativeLink"
          :route="route"
          :style="item.style"
          :isOnlyIcon="isOnlyIcon"
          :level="1 + level"
          :children="item.children"
          :icon="level === 1 && item.children ? 'assessment' : undefined"
      />
    </div>
  </div>

  <div v-if="!to && !children && !href" class="sidebar-item"
       :class="classes">
    <SideNavItemLabel
        :level="level"
        :isActive="isActive"
        :isOnlyIcon="isOnlyIcon"
        :icon="icon"
    >{{ label }}
    </SideNavItemLabel>
  </div>
</template>

<script setup>
import SideNavItem from '@/components/base/sideNav/Item.vue'
import SideNavItemLabel from '@/components/base/sideNav/ItemLabel.vue'
import {ref, computed, defineExpose, onMounted, onUnmounted, resolveComponent} from 'vue'

const props = defineProps({
  label: String,
  icon: String,
  action: Function,
  to: String,
  href: String,
  classes: String,
  style: Object,
  children: Array,
  isOnlyIcon: Boolean,
  level: Number, // 1, 2
  alternativeLink: String,
  route: Object
})

const isOpen = ref(false)
const nestedItemsRefs = ref([])

const isActive = computed(() => props.route?.path === props.to || !!props.href && window.location?.href?.includes(props.href))
const isNestedActive = computed(() => {
  for (const el of nestedItemsRefs.value) {
    if (el.isActive || el.isNestedActive) return true
  }

  return false
})
const iconFirstLevel = computed(() => {
  if (props.level === 1) return undefined

  return isOpen.value ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
})
const iconSecondLevel = computed(() => {
  if (props.level !== 1) return props.icon

  return isOpen.value ? 'arrow_drop_down' : 'arrow_right'
})

const linkTag = computed(() => (props.alternativeLink ? resolveComponent(props.alternativeLink) : resolveComponent('a')))

function setItemRef(index, el) {
  if (el) {
    nestedItemsRefs.value[index] = el
  } else {
    nestedItemsRefs.value.splice(index, 1)
  }
}

function getRefSetter(index) {
  return (el) => {
    setItemRef(index, el)
  }
}

onMounted(() => {
  if (isNestedActive.value) isOpen.value = true
})

onUnmounted(() => {
  nestedItemsRefs.value = []
})

defineExpose({
  isActive,
  isNestedActive
})
</script>

<style scoped lang="postcss">
.sidebar-item {
}
</style>
