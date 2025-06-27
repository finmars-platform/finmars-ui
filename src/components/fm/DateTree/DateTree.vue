<template>
	<div class="fm-date-tree">
		<div class="fm-date-tree__header">
			<div class="fm-date-tree__header-block" @click="toggleTreeState">
				<Transition name="fade">
					<FmIcon
						:icon="isExpanded ? 'mdi-menu-down' : 'mdi-menu-right'"
						color="var(--on-surface-variant)"
					/>
				</Transition>

				{{ isExpanded ? 'Collapse All' : 'Expand All' }}
			</div>

			<FmCheckbox v-model="selectedAll" label="Select All" @update:model-value="selectAll" />
		</div>

		<div :class="['fm-date-tree__body', 'scroll-variant-thin']">
			<template v-for="(year, yearIndex) in tree" :key="year.value">
				<FmDateTreeItem
					:item="year"
					@click="toggleItemState(`${yearIndex}`)"
					@select="selectItem([year.value], year.selectedStatus === 'selected')"
				/>

				<template v-if="year.isOpened">
					<template v-for="(month, mothIndex) in year.children" :key="month.value">
						<FmDateTreeItem
							:item="month"
							@click="toggleItemState(`${yearIndex}.children.${mothIndex}`)"
							@select="selectItem([year.value, month.value], month.selectedStatus === 'selected')"
						/>

						<template v-if="month.isOpened">
							<template v-for="(day, dayIndex) in month.children" :key="day.value">
								<FmDateTreeItem
									:item="day"
									@click="
										toggleItemState(`${yearIndex}.children.${mothIndex}.children.${dayIndex}`)
									"
									@select="
										selectItem(
											[year.value, month.value, day.value],
											day.selectedStatus === 'selected'
										)
									"
								/>

								<template v-if="includeTime && day.isOpened">
									<template v-for="(time, timeIndex) in day.children" :key="time.value">
										<FmDateTreeItem
											:item="time"
											@click="
												toggleItemState(
													`${yearIndex}.children.${mothIndex}.children.${dayIndex}.children.${timeIndex}`
												)
											"
											@select="
												selectItem(
													[year.value, month.value, day.value, time.value],
													time.selectedStatus === 'selected'
												)
											"
										/>
									</template>
								</template>
							</template>
						</template>
					</template>
				</template>
			</template>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref, watch } from 'vue';
	import size from 'lodash/size';
	import get from 'lodash/get';
	import set from 'lodash/set';
	import isEqual from 'lodash/isEqual';
	import cloneDeep from 'lodash/cloneDeep';
	import FmCheckbox from '@/components/fm/Checkbox/Checkbox.vue';
	import FmIcon from '@/components/fm/Icon/Icon.vue';
	import FmDateTreeItem from './DateTreeItem.vue';
	import {
		getDateIndexInDateTree,
		getMonthIndexInDateTree,
		getTimeIndexInDateTree,
		getYearIndexInDateTree,
		makeDateTree,
		parseDate
	} from './utils';
	import type { DateTreeItem, FmDateTreeEmits, FmDateTreeProps } from './types';

	const props = withDefaults(defineProps<FmDateTreeProps>(), {
		modelValue: () => []
	});
	const emits = defineEmits<FmDateTreeEmits>();

	const isExpanded = ref(false);
	const selectedAll = ref(false);
	const tree = ref<DateTreeItem[]>(makeDateTree(props.data, props.includeTime));
	const selectedValue = ref<string[]>([]);

	function toggleTreeState() {
		isExpanded.value = !isExpanded.value;
		tree.value.forEach((y) => {
			y.isOpened = isExpanded.value;
			if (size(y.children)) {
				y.children!.forEach((m) => {
					m.isOpened = isExpanded.value;
					if (size(m.children)) {
						m.children!.forEach((d) => {
							d.isOpened = isExpanded.value;
						});
					}
				});
			}
		});
	}

	function toggleItemState(path: string) {
		const currentItemState = get(tree.value, `${path}.isOpened`);
		set(tree.value, `${path}.isOpened`, !currentItemState);
	}

	function setParentSelectedStatus(
		tree: DateTreeItem[],
		path: Array<string | number>
	): DateTreeItem[] {
		if (size(path) === 0) {
			return tree;
		}

		const isCurrentItemSelected = get(tree, path, []).every(
			(c: DateTreeItem) => c.selectedStatus === 'selected'
		);
		const isCurrentItemUnselected = get(tree, path, []).every(
			(c: DateTreeItem) => c.selectedStatus === 'unselected'
		);
		const currentItemSelectedStatus = isCurrentItemSelected
			? 'selected'
			: isCurrentItemUnselected
				? 'unselected'
				: 'partially';
		set(tree, [...path.slice(0, -1), 'selectedStatus'], currentItemSelectedStatus);
		return setParentSelectedStatus(tree, path.slice(0, -2));
	}

	function markTreeItems() {
		if (!size(tree.value)) {
			return;
		}

		let updatedTree = cloneDeep(tree.value);
		updatedTree.forEach((y) => {
			y.selectedStatus = 'unselected';

			size(y.children) &&
				y.children!.forEach((m) => {
					m.selectedStatus = 'unselected';

					size(m.children) &&
						m.children!.forEach((d) => {
							d.selectedStatus = 'unselected';

							size(d.children) &&
								d.children!.forEach((t) => {
									t.selectedStatus = 'unselected';
								});
						});
				});
		});

		selectedValue.value.forEach((value) => {
			const { year, month, date, time } = parseDate(value);
			const yearIndex = getYearIndexInDateTree({ tree: updatedTree, year });
			const monthIndex = getMonthIndexInDateTree({ tree: updatedTree, month, yearIndex });
			const dateIndex = getDateIndexInDateTree({ tree: updatedTree, date, yearIndex, monthIndex });

			const timeIndex = getTimeIndexInDateTree({
				tree: updatedTree,
				time,
				yearIndex,
				monthIndex,
				dateIndex,
				includeTime: props.includeTime
			});

			const leafPath =
				props.includeTime && timeIndex !== -1
					? [
							yearIndex,
							'children',
							monthIndex,
							'children',
							dateIndex,
							'children',
							timeIndex,
							'selectedStatus'
						]
					: [yearIndex, 'children', monthIndex, 'children', dateIndex, 'selectedStatus'];
			set(updatedTree, leafPath, 'selected');
			updatedTree = setParentSelectedStatus(updatedTree, leafPath.slice(0, -2));
		});

		tree.value = updatedTree;
	}

	function selectAll() {
		selectedValue.value = selectedAll.value ? cloneDeep(props.data).sort() : [];
		emits('update:modelValue', selectedValue.value);
		markTreeItems();
	}

	function selectItem(value: number[] = [], currentItemFlagValue?: boolean) {
		const [year, month, date, time] = value;
		let processedValue = `${year}`;

		if (month) {
			const val = `${month + 1}`.padStart(2, '0');
			processedValue += `-${val}`;
		}

		if (date) {
			const val = `${date}`.padStart(2, '0');
			processedValue += `-${val}`;
		}

		if (time) {
			const hours = `${Math.floor(time / 60)}`.padStart(2, '0');
			const minutes = `${time % 60}`.padStart(2, '0');
			const val = `${hours}:${minutes}`;
			processedValue += `T${val}`;
		}

		const processedData = props.data.filter((i) => i.startsWith(processedValue));
		const updatedSelectedValue = cloneDeep(selectedValue.value);
		for (const item of processedData) {
			const itemIndex = updatedSelectedValue.findIndex((v) => v === item);
			if (currentItemFlagValue && itemIndex !== -1) {
				updatedSelectedValue.splice(itemIndex, 1);
			} else if (!currentItemFlagValue && itemIndex === -1) {
				updatedSelectedValue.push(item);
			}
		}

		updatedSelectedValue.sort();
		if (!isEqual(selectedValue.value, updatedSelectedValue)) {
			selectedValue.value = updatedSelectedValue;
			emits('update:modelValue', selectedValue.value);

			if (size(props.data) !== size(selectedValue.value) && selectedAll.value) {
				selectedAll.value = false;
			}
		}
	}

	watch(
		() => props.modelValue,
		() => {
			selectedValue.value = cloneDeep(props.modelValue);
			markTreeItems();
		},
		{ immediate: true }
	);

	watch(
		() => props.data,
		() => {
			tree.value = makeDateTree(props.data, props.includeTime);
			markTreeItems();
		}
	);
</script>

<style lang="scss" scoped>
	.fm-date-tree {
		position: relative;
		width: 100%;
		height: 100%;
		padding: 16px;

		&__header {
			display: flex;
			width: 100%;
			height: 48px;
			padding: 0 16px;
			justify-content: flex-start;
			align-items: center;
			font-size: 16px;
			font-weight: 600;
			color: var(--on-surface-variant);

			&-block {
				position: relative;
				width: 160px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				column-gap: 8px;
				cursor: pointer;
			}

			:deep(.fm-checkbox) {
				.v-checkbox-btn {
					column-gap: 4px;
				}

				label.v-label {
					font-size: 16px !important;
					font-weight: 600;
					color: var(--on-surface-variant) !important;
					opacity: 1;
				}
			}
		}

		&__body {
			position: relative;
			width: 100%;
			height: calc(100% - 48px);
			overflow-y: auto;
		}
	}
</style>
