<template>
	<VDialog max-width="25%">
		<template #activator="{ props: activatorProps }">
			<FmIconButton v-bind="activatorProps" icon="mdi-close" size="small" variant="text" />
		</template>

		<template #default="{ isActive }">
			<VCard :title="title" class="card-container">
				<template #text>
					<span class="text-sm" style="color: var(--on-surface)">
						{{ content }}
					</span>
				</template>

				<VCardActions>
					<div>
						<FmButton
							type="secondary"
							rounded
							@click="
								() => {
									isActive.value = false;
									$emit('isConfirm', true);
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
									isActive.value = false;
									$emit('isConfirm', false);
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
</template>

<script setup lang="ts">
	import { VCard, VCardActions, VDialog } from 'vuetify/components';
	import FmIconButton from '@/components/fm/IconButton/IconButton.vue';
	import FmButton from '@/components/fm/Button/Button.vue';

	defineProps<{ title: string; content: string }>();
</script>

<style scoped lang="scss">
	.card-container {
		display: flex;
		justify-content: flex-end;
		gap: 4var (--spacing-4);
		background-color: var(--surface-container);
		border-radius: var(--spacing-24) !important;
	}
</style>
