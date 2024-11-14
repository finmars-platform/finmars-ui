<template>
	<VTabs v-model="activeTab" class="general-tab" :class="`${variant}`">
		<VTab
			v-for="(tab, index) in tabs"
			:key="index"
			:class="`${lineClasses}`"
			:disabled="disabled"
			@click="handleTabClick(index)"
		>
			<template #default>
				<slot>
					<div
						class="tab-wrapper"
						:class="{
							row: appendIcon,
							column: prependIcon
						}"
					>
						<VIcon v-if="icon" :icon="icon" :size="iconSize" />
						<span>{{ tab.label }}</span>
					</div>
				</slot>
			</template>
		</VTab>
	</VTabs>
</template>

<script setup>
	import { computed, defineEmits, ref } from 'vue'
	import { VTab, VTabs } from 'vuetify/components'

	const props = defineProps({
		tabs: {
			type: Array,
			required: true
		},
		underline: {
			type: String,
			default: 'thin',
			validator(value) {
				return ['thin', 'bold'].includes(value)
			}
		},
		variant: {
			type: String,
			default: 'normal',
			validator(value) {
				return ['normal', 'large'].includes(value)
			}
		},
		icon: {
			type: String,
			default: undefined
		},
		appendIcon: {
			type: Boolean,
			default: false
		},
		prependIcon: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: 'normal',
			validator(value) {
				return ['normal', 'small'].includes(value)
			}
		},
		defaultTab: {
			type: Number,
			default: 0
		},
		disabled: {
			type: Boolean,
			default: false
		}
	})

	const activeTab = ref(props.defaultTab)
	const emits = defineEmits(['changeTab'])

	const lineClasses = computed(() => {
		if (props.icon === 'column') {
			return 'bold'
		}
		return props.underline === 'thin' || props.underline === 'bold'
			? props.underline
			: 'thin'
	})

	const iconSize = computed(() => {
		if (props.size === 'small') {
			return '12'
		} else {
			return '18'
		}
	})

	const handleTabClick = (index) => {
		activeTab.value = index
		emits('changeTab', activeTab.value)
	}
</script>

<style scoped lang="scss">
	.general-tab {
		min-height: 60px;
		border-bottom: 1px solid var(--outline-variant);

		.v-btn {
			height: 100%;
			flex-grow: 1;
			color: var(--on-surface-variant);
			background: var(--surface);
		}

		&.large {
			padding: 0 var(--spacing-32);
		}

		.tab-wrapper {
			display: flex;
			align-items: center;
			gap: var(--spacing-8);

			&.row {
				flex-direction: row;
				flex-wrap: nowrap;
			}

			&.column {
				flex-direction: column;
			}
		}

		.v-tab--selected {
			:deep(.v-tab__slider) {
				left: unset;
			}

			&.bold {
				color: var(--primary);

				:deep(.v-tab__slider) {
					height: var(--spacing-4);
					border-top-left-radius: var(--spacing-4);
					border-top-right-radius: var(--spacing-4);
					width: 50%;
				}
			}

			&.thin {
				color: var(--primary);

				:deep(.v-tab__slider) {
					height: 3px;
				}
			}
		}
	}
</style>
