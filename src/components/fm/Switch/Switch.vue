<template>
	<div @click="toggle" :class="['switch-wrapper', { checked: isChecked, disabled: disable }]">
		<div :class="['switch-worker', { checked: isChecked, small: !isChecked && !icon }]">
			<span class="icon" v-if="icon">
				<FmIcon
					:icon="isChecked ? defaultIcons.tick : defaultIcons.cross"
					:color="fmIconColor"
					:size="15"
				></FmIcon>
			</span>
		</div>
	</div>
</template>

<script setup>
	import { computed, ref } from 'vue';
	import FmIcon from '@/components/fm/Icon/Icon.vue';

	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false
		},
		icon: {
			type: Boolean,
			default: false
		},
		disable: {
			type: Boolean,
			default: false
		}
	});

	const emit = defineEmits(['update:modelValue']);

	const isChecked = ref(props.modelValue);
	const defaultIcons = {
		tick: 'mdi-check',
		cross: 'mdi-close'
	};

	const fmIconColor = computed(() => {
		return isChecked.value ? 'var(--on-secondary-container)' : 'var(--surface-container-highest)';
	});

	const toggle = () => {
		isChecked.value = !isChecked.value;
		emit('update:modelValue', isChecked.value);
	};
</script>

<style scoped lang="scss">
	.switch-wrapper {
		display: flex;
		align-items: center;
		max-width: 52px;
		height: 30px;
		border-radius: 15px;
		border: 2px solid var(--outline);
		background: var(--surface-container-highest);
		cursor: pointer;
		transition: background-color 0.3s ease-in-out;

		&:active {
			.switch-worker {
				box-shadow: 0 0 1px 10px var(--on-active-primary, rgba(0, 0, 0, 0.2));

				&.checked {
					box-shadow: 1px 0 1px 8px var(--on-active-primary, rgba(0, 0, 0, 0.2));
				}
			}
		}

		&.checked {
			background: var(--primary);
			border: none;
		}

		.switch-worker {
			border-radius: 100%;
			width: 20px;
			height: 20px;
			background: white;
			transition: transform 0.2s ease-in-out;
			background: var(--outline);
			transform: translateX(3px);

			&.small {
				width: 15px;
				height: 15px;
			}

			.icon {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			&.checked {
				transform: translateX(29px);
				background: var(--inverse-primary);
			}
		}
	}

	.switch-wrapper {
		border: 2px solid var(--outline);

		&.disabled {
			pointer-events: none;
			cursor: none;
			opacity: 0.5;
			background: var(--on-active-primary);

			.switch-worker {
				background: var(--outline);
				border: 2px solid var(--outline);
				box-shadow: none;

				&.checked {
					background: var(--surface);
					border: none;
				}
			}
		}
	}
</style>
