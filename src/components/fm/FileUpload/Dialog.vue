<template>
	<div class="flex align-center justify-center">
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
				<VCard :title="title" class="modal-content p-2">
					<template #text>
						<span class="text-sm" style="color: var(--on-surface)">
							{{ content }}
						</span>
					</template>

					<VCardActions>
						<div class="flex justify-end gap-1">
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

<script setup>
	import { VCard, VCardActions, VDialog } from 'vuetify/components'
	import FmIconButton from '@/components/fm/IconButton/IconButton.vue'
	import FmButton from '@/components/fm/Button/Button.vue'

	defineProps({ title: { type: String }, content: { type: String } })
</script>

<style scoped lang="scss">
	.modal-content {
		background-color: var(--surface-container);
		border-radius: var(--spacing-32) !important;
	}
</style>
