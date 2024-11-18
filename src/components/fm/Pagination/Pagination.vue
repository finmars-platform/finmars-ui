<template>
	<div
		class="fm-pagination w-full h-[var(--height-fmPagination)] px-4 flex justify-between items-center bg-[--backgroundColor-fmPagination]">
		<div class="w-max">
			<span
				v-if="withInfo"
				class="text-[14px] text-[var(--color-fmPagination)]"
			>
				{{ infoText }}
			</span>
		</div>

		<div class="w-max flex justify-center items-center">
			<FmButton
				type="secondary"
				class="btn mr-1"
				:disabled="currentPage === 1 || disabled"
				@click="onCLickControlButton('first')"
			>
				<VIcon icon="mdi-page-first" size="24" color="var(--iconColor-fmPagination)" />
			</FmButton>

			<FmButton
				type="secondary"
				class="btn mr-1"
				:disabled="currentPage === 1 || disabled"
				@click="onCLickControlButton('prev')"
			>
				<VIcon icon="mdi-chevron-left" size="24" color="var(--iconColor-fmPagination)" />
			</FmButton>

			<span class="text-[14px] text-[var(--color-fmPagination)] font-medium">
				{{ locals?.page }}
			</span>

			<FmButton
				type="secondary"
				class="btn mx-2"
				:disabled="disabled"
			>
				{{ currentPage }}

				<FmMenu
					activator="parent"
					:items="pages"
					item-size="small"
					content-class="fm-pagination-menu"
					:disabled="disabled"
				>
					<div
						class="fm-pagination-menu relative w-[40] max-h-[160px] py-0.5 rounded overflow-y-auto scroll-variant-thin">
						<div
							v-for="item in pages"
							:key="item"
							class="relative w-full h-[32px] text-[14px] flex justify-center items-center cursor-pointer hover:bg-[var(--itemColorHover-fmPagination)]"
							@click="changePage(item)"
						>
							{{ item }}
						</div>
					</div>
				</FmMenu>

				<template #append>
					<VIcon icon="mdi-menu-down" size="16" color="var(--iconColor-fmPagination)" />
				</template>
			</FmButton>

			<span class="text-[14px] text-[var(--color-fmPagination)] font-medium">
				{{ locals?.of }}&nbsp;{{ totalPages }}
			</span>

			<FmButton
				type="secondary"
				class="btn ml-1"
				:disabled="currentPage === totalPages || disabled"
				@click="onCLickControlButton('next')"
			>
				<VIcon icon="mdi-chevron-right" size="24" color="var(--iconColor-fmPagination)" />
			</FmButton>

			<FmButton
				type="secondary"
				class="btn ml-1"
				:disabled="currentPage === totalPages || disabled"
				@click="onCLickControlButton('last')"
			>
				<VIcon icon="mdi-page-last" size="24" color="var(--iconColor-fmPagination)" />
			</FmButton>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { computed, ref, watch } from 'vue'
	import { VIcon } from 'vuetify/components'
	import FmButton from '../Button/Button.vue'
	import FmMenu from '../Menu/Menu.vue'
	import type { FmPaginationProps, FmPaginationEmits } from './types'

	const props = withDefaults(defineProps<FmPaginationProps>(), {
		modelValue: 1,
		itemsPerPage: 10,
		totalItems: 0,
		withInfo: true,
		locals: {
			// @ts-ignore
			of: 'of',
			entities: 'entities',
			page: 'Page',
		},
	})

	const emits = defineEmits<FmPaginationEmits>()

	const currentPage = ref(props.modelValue)

	const totalPages = computed(() => {
		if (!props.itemsPerPage) {
			return 0
		}

		return Math.ceil(props.totalItems / props.itemsPerPage)
	})

	const pages = computed(() => {
		if (!totalPages.value) {
			return []
		}

		return Array(totalPages.value).fill(0).map((_, index) => index + 1)
	})

	const infoText = computed(() => {
		const from = (currentPage.value - 1) * props.itemsPerPage + 1
		const to = currentPage.value * props.itemsPerPage

		return `${from}-${to <= props.totalItems ? to : props.totalItems} ${props.locals?.of} ${props.totalItems ?? 0} ${props.locals?.entities}`
	})

	function changePage(val: number) {
		currentPage.value = val
		emits('update:modelValue', currentPage.value)
	}

	function onCLickControlButton(button: 'first' | 'last' | 'prev' | 'next') {
		switch (button) {
			case 'first':
				changePage(1)
				emits('first', 1)
				break
			case 'last':
				changePage(totalPages.value)
				emits('last', totalPages.value)
				break
			case 'prev':
				if (currentPage.value > 1) {
					changePage(currentPage.value - 1)
					emits('prev', currentPage.value)
				}
				break
			case 'next':
				if (currentPage.value < totalPages.value) {
					changePage(currentPage.value + 1)
					emits('next', currentPage.value)
				}
				break
		}

	}

	watch(
		[() => props.totalItems, () => props.itemsPerPage, () => props.modelValue],
		([totalItems, itemsPerPage, modelValue], [totalItemsOld, itemsPerPageOld, modelValueOld]) => {
			const isTotalValueChanged = totalItemsOld !== totalItems
			const isPerPageValueChanged = itemsPerPageOld !== itemsPerPage
			const isValueChanged = modelValueOld !== modelValue

			if (
				(
					(isTotalValueChanged && totalItemsOld !== 0) ||
					(isPerPageValueChanged && itemsPerPageOld !== 0)
				) &&
				!isValueChanged &&
				currentPage.value !== 1
		 	) {
				currentPage.value = 1
				emits('update:modelValue', 1)
			}

			if (
				isValueChanged &&
				currentPage.value !== modelValue &&
				modelValue > 0 &&
				modelValue <= totalPages.value
			) {
				currentPage.value = modelValue
			}
		},
	)
</script>

<style lang="scss" scoped>
	.fm-pagination {
		--height-fmPagination: 64px;
		--backgroundColor-fmPagination: var(--surface);
		--color-fmPagination: var(--on-surface);
		--iconColor-fmPagination: var(--primary);
		--itemColorHover-fmPagination: var(--surface-container-highest);
	}

	.btn {
		min-width: 0 !important;
		padding: 0 4px !important;
	}
</style>

<style>
	.fm-pagination-menu {
		--itemColorHover-fmPagination: var(--surface-container-highest);
	}
</style>
