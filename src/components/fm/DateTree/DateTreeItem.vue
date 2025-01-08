<template>
	<div class="fm-date-tree-item" :style="mainStyle" @click.stop.prevent="emits('click', $event)">
		<FmIcon
			v-if="size(item.children) > 0"
			:icon="item.isOpened ? 'mdi-menu-down' : 'mdi-menu-right'"
			color="var(--on-surface-variant)"
			:style="iconStyle"
			class="fm-date-tree-item__icon"
		/>

		<FmCheckbox
			:model-value="item.selectedStatus === 'selected'"
			:indeterminate="item.selectedStatus === 'partially'"
			@click.stop.prevent="emits('select', item)"
		/>

		<span class="fm-date-tree-item__title">{{ item.title }}</span>
	</div>
</template>

<script lang="ts" setup>
	import { computed } from 'vue';
	import size from 'lodash/size';
	import FmCheckbox from '@/components/fm/Checkbox/Checkbox.vue';
	import FmIcon from '@/components/fm/Icon/Icon.vue';
	import type { FmDateTreeItemProps, FmDateTreeItemEmits } from '@/components/fm/DateTree/types';

	const props = defineProps<FmDateTreeItemProps>();
	const emits = defineEmits<FmDateTreeItemEmits>();

	const mainStyle = computed(() => ({
		paddingLeft: `${props.item.level * 16 + 40}px`
	}));

	const iconStyle = computed(() => ({
		left: `${props.item.level * 16 + 16}px`
	}));
</script>

<style lang="scss" scoped>
	.fm-date-tree-item {
		position: relative;
		width: 100%;
		height: 48px;
		display: flex;
		padding-right: 16px;
		justify-content: flex-start;
		align-items: center;
		cursor: pointer;
		border-radius: 28px;

		&__icon {
			position: absolute;
			top: 12px;
		}

		&__title {
			padding-left: 4px;
			font: var(--body-medium-font);
			color: var(--on-surface);
			text-transform: capitalize;
			user-select: none;
		}

		&:hover {
			background-color: color-mix(in srgb, var(--on-surface-variant) 8%, transparent);
		}
	}
</style>
