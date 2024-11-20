<template>
	<div class="dialog-container">
		<VDialog max-width="25%">
			<template #activator="{ props: activatorProps }">
				<FmIconButton
					v-bind="activatorProps"
					icon="mdi-close"
					size="small"
					variant="text"
				/>
			</template>

			<template #default="{ isActive }">
				<VCard :title="title" class="card-container">
					<template #text>
						<span class="text-sm" style="color: var(--on-surface)">
							{{ content }}
						</span>
					</template>

					<VCardActions>
						<div class="">
							<FmButton
								type="secondary"
								rounded
								@click="
									() => {
										isActive.value = false
										$emit('isConfirm', true)
									}
								"
							>
								Continue
							</FmButton>
							<FmButton
								type="secondary"
								rounded
								@click="
									() => {
										isActive.value = false
										$emit('isConfirm', false)
									}
								"
							>
								Cancel
							</FmButton>
						</div>
					</VCardActions>
				</VCard>
			</template>
		</VDialog>
	</div>
</template>

<script setup lang="ts">
	import { VCard, VCardActions, VDialog } from 'vuetify/components'
	import FmIconButton from '@/components/fm/IconButton/IconButton.vue'
	import FmButton from '@/components/fm/Button/Button.vue'

	defineProps({
		title: { type: String },
		content: { type: String }
	})
</script>

<style scoped lang="scss">
	.dialog-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card-container {
		display: flex;
		justify-content: flex-end;
		gap: 4var (--spacing-4);
		background-color: var(--surface-container);
		border-radius: var(--spacing-24) !important;
	}
</style>
