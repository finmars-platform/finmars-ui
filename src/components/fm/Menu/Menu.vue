<template>
	<VMenu
		v-bind="vMenuProps"
		v-model="innerValue"
		@update:model-value="emits('update:model-value', $event)"
	>
		<template #activator="{ isActive, props, targetRef }">
			<slot
				name="activator"
				:props="props"
				:is-active="isActive"
				:target-ref="targetRef"
			/>
		</template>

		<template #default>
			<div
				class="relative w-full rounded py-2 bg-[var(--surface-container)] shadow-[0_2px_6px_2px_rgba(0,0,0,0.15),0_1px_2px_0_rgba(0,0,0,0.3)]"
			>
				<slot>
					<MenuItem
						v-for="(item, index) in items"
						:key="index"
						:index="index"
						:item="item"
						:title="item.title"
						:itemDisabled="item.disabled"
						:itemSize="itemSize"
						:disabled="disabled"
						v-on="
							disabled
								? {}
								: { click: (ev) => onItemClick(ev, { item, index }) }
						"
					/>
				</slot>
			</div>
		</template>
	</VMenu>
</template>

<script setup>
	import { computed, ref, watch } from 'vue'
	import { VMenu } from 'vuetify/components'
	import MenuItem from './MenuItem.vue'

	const props = defineProps({
		modelValue: {
			type: Boolean
		},
		items: {
			type: Array, // { title: string; [key: string]: any }[]
			default: () => []
		},
		itemSize: {
			type: String,
			validator(value) {
				return ['small', 'medium', 'large'].includes(value)
			},
			default: 'large'
		},
		activator: {
			type: [String, Object]
		},
		attach: {
			type: [String, Object, Boolean],
			default: false
		},
		closeOnBack: {
			type: Boolean,
			default: true
		},
		closeOnContentClick: {
			type: Boolean,
			default: true
		},
		contentClass: {
			type: String,
		},
		contentClass: {
			type: String,
		},
		height: {
			type: [String, Number]
		},
		minHeight: {
			type: [String, Number]
		},
		maxHeight: {
			type: [String, Number]
		},
		width: {
			type: [String, Number]
		},
		minWidth: {
			type: [String, Number]
		},
		maxWidth: {
			type: [String, Number]
		},
		offset: {
			type: [String, Number, Array]
		},
		location: {
			type: String,
			validator(value) {
				return [
					'top',
					'bottom',
					'start',
					'end',
					'left',
					'right',
					'center',
					'center center',
					'top start | center',
					'top end | center',
					'bottom start | center',
					'bottom end | center',
					'start top | center',
					'end top | center',
					'left top | center',
					'right top | center',
					'start bottom | center',
					'end bottom | center',
					'left bottom | center',
					'right bottom | center'
				].includes(value)
			}
		},
		locationStrategy: {
			type: [String, Function],
			validator(value) {
				if (typeof value === 'string') {
					return ['static', 'connected'].includes(value)
				}

				return true
			},
			default: 'connected'
		},
		openDelay: {
			type: [String, Number],
			default: 300
		},
		openOnClick: {
			type: Boolean,
			default: true
		},
		openOnFocus: {
			type: Boolean
		},
		openOnHover: {
			type: Boolean,
			default: false
		},
		origin: {
			type: String,
			validator(value) {
				return [
					'top',
					'bottom',
					'start',
					'end',
					'left',
					'right',
					'center',
					'center center',
					'top start | center',
					'top end | center',
					'bottom start | center',
					'bottom end | center',
					'start top | center',
					'end top | center',
					'left top | center',
					'right top | center',
					'start bottom | center',
					'end bottom | center',
					'left bottom | center',
					'right bottom | center',
					'auto',
					'overlap'
				].includes(value)
			},
			default: 'auto'
		},
		persistent: {
			type: Boolean,
			default: false
		},
		scrollStrategy: {
			type: [String, Function],
			validator(value) {
				if (typeof value === 'string') {
					return ['close', 'block', 'none', 'reposition'].includes(value)
				}

				return true
			},
			default: 'reposition'
		},
		zIndex: {
			type: [String, Number],
			default: 2000
		},
		disabled: {
			type: Boolean
		}
	})

	const emits = defineEmits(['update:modelValue', 'click:item'])

	const innerValue = ref(props.modelValue)

	const vMenuProps = computed(() => ({
		activator: props.activator,
		attach: props.attach,
		contentClass: props.contentClass,
		height: props.height,
		minHeight: props.minHeight,
		maxHeight: props.maxHeight,
		width: props.width,
		minWidth: props.minWidth,
		maxWidth: props.maxWidth,
		offset: props.offset,
		location: props.location,
		locationStrategy: props.locationStrategy,
		openDelay: props.openDelay,
		origin: props.origin,
		scrollStrategy: props.scrollStrategy,
		zIndex: props.zIndex,
		closeOnBack: props.closeOnBack,
		closeOnContentClick: props.closeOnContentClick,
		openOnClick: props.openOnClick,
		openOnFocus: props.openOnFocus,
		openOnHover: props.openOnHover,
		persistent: props.persistent,
		disabled: props.disabled
	}))

	function onItemClick(ev, { item, index }) {
		ev.stopPropagation()
		ev.preventDefault()

		emits('click:item', { item, index })

		if (props.closeOnContentClick) {
			innerValue.value = false
			emits('update:modelValue', false)
		}
	}

	watch(
		() => props.modelValue,
		(val) => {
			if (val !== innerValue.value) {
				innerValue.value = val
			}
		},
		{ immediate: true }
	)
</script>

<!--<style>-->
<!--	.v-overlay-container {-->
<!--		.v-overlay.v-menu {-->
<!--			.v-overlay__content {-->
<!--				overflow-y: hidden;-->
<!--			}-->
<!--		}-->
<!--	}-->
<!--</style>-->
