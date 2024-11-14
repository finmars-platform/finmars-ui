<template>
	<VTabs show-arrows v-model="activeTab" :class="`${type}`" class="general-tab">
		<VTab
			v-for="(tab, index) in tabs"
			:key="index"
			:class="`${filteredUnderline}`"
			:disabled="disabled"
			@click="handleTabClick(index)"
			@mousedown="handleMouseDown"
			@mouseup="removeBackgroundEffect"
			@mouseleave="removeBackgroundEffect"
		>
			<div>
				<div :class="dot ? dot : ''">
					<span v-if="dot" class="circle" />
					<span>{{ tab.label }}</span>
				</div>
			</div>
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
		type: {
			type: String,
			default: 'normal',
			validator(value) {
				return ['normal', 'large'].includes(value)
			}
		},
		dot: {
			type: String,
			default: '',
			validator(value) {
				return ['row', 'column'].includes(value)
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

	const filteredUnderline = computed(() => {
		if (props.dot.length && props.dot === 'column') {
			return 'bold'
		} else {
			if (props.underline !== 'thin' && props.underline !== 'bold') {
				return 'thin'
			} else {
				return props.underline
			}
		}
	})

	const handleMouseDown = (event) => {
		const tab = event.currentTarget
		tab.classList.add('ripple-effect')
	}

	const removeBackgroundEffect = (event) => {
		const tab = event.currentTarget
		tab.classList.remove('ripple-effect')
	}

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

		:deep(.v-ripple__container) {
			display: none;
		}

		.circle {
			width: var(--spacing-12);
			height: var(--spacing-12);
			border-radius: 100%;
			background: var(--on-surface-variant);
		}

		:deep(.v-tab__slider) {
			left: unset;
			color: var(--primary);
		}

		.ripple-effect {
			position: relative;
			overflow: hidden;
		}

		.ripple-effect::before {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			width: 51%;
			height: 100%;
			background: var(--on-active-primary);
			border-radius: 45% 0 0 45%;
			transform: scale(1.8);
			transition: background 0.3s ease;
		}

		.v-tab--selected {
			.circle {
				background: var(--primary);
			}

			&.bold {
				color: var(--primary);

				&.ripple-effect::before {
					background: var(--on-active-secondary);
				}

				:deep(.v-tab__slider) {
					height: var(--spacing-4);
					border-top-left-radius: var(--spacing-4);
					border-top-right-radius: var(--spacing-4);
					width: 40%;
				}
			}

			&.thin {
				color: var(--primary);

				:deep(.v-tab__slider) {
					height: 3px;
				}
			}
		}

		.row {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			align-items: center;

			.circle {
				margin-right: var(--spacing-16);
			}
		}

		.column {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 10px;
			margin-bottom: 10px;
		}
	}
</style>
