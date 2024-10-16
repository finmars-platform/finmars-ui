<template>
	<component
		v-if="to && !children"
		:is="linkTag"
		:to="to"
		:href="to"
		class="sidebar-item"
		:class="classes"
	>
		<NavigationItemLabel
			:level="level"
			:isActive="isActive"
			:isOnlyIcon="isOnlyIcon"
			:icon="icon"
			>{{ label }}
		</NavigationItemLabel>
	</component>
	<a
		v-if="href && !children && !to"
		:href="href"
		class="sidebar-item"
		:class="classes"
	>
		<NavigationItemLabel
			:level="level"
			:isActive="isActive"
			:isOnlyIcon="isOnlyIcon"
			:icon="icon"
			>{{ label }}
		</NavigationItemLabel>
	</a>
	<div v-if="children" class="sidebar-item" :class="classes">
		<div>
			<NavigationItemLabel
				@click="isOpen = !isOpen"
				:isActive="isOnlyIcon && isNestedActive"
				:isOnlyIcon="isOnlyIcon"
				:appendIcon="iconFirstLevel"
				:icon="iconSecondLevel"
				:level="level"
			>
				{{ label }}
			</NavigationItemLabel>
		</div>
		<div v-show="isOpen && !isOnlyIcon">
			<NavigationItem
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

	<div v-if="!to && !children && !href" class="sidebar-item" :class="classes">
		<NavigationItemLabel
			:level="level"
			:isActive="isActive"
			:isOnlyIcon="isOnlyIcon"
			:icon="icon"
			>{{ label }}
		</NavigationItemLabel>
	</div>
</template>

<script setup>
	import NavigationItem from '@/components/fm/Navigation/NavigationItem.vue'
	import NavigationItemLabel from '@/components/fm/Navigation/NavigationItemLabel.vue'
	import {
		ref,
		computed,
		defineExpose,
		onMounted,
		onUnmounted,
		resolveComponent
	} from 'vue'

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

	const isActive = computed(
		() =>
			(props.to && props.route?.path === props.to) ||
			(props.href && props.route?.path?.includes(props.href)) ||
			(!!props.href && window.location?.href?.includes(props.href))
	)
	const isNestedActive = computed(() => {
		for (const el of nestedItemsRefs.value) {
			if (el.isActive || el.isNestedActive) return true
		}

		return false
	})
	const iconFirstLevel = computed(() => {
		if (props.level === 1) return undefined

		return isOpen.value ? 'mdi-chevron-up' : 'mdi-chevron-down'
	})
	const iconSecondLevel = computed(() => {
		if (props.level !== 1) return props.icon

		return isOpen.value ? 'mdi-chevron-down' : 'mdi-chevron-right'
	})

	const linkTag = computed(() =>
		props.alternativeLink ? resolveComponent(props.alternativeLink) : 'a'
	)

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
