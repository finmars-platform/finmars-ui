<template>
	<header class="flex w-full items-center max-h-20 h-20 py-3 px-[22px] gap-x-4">
		<FmLogo class="mr-12" />
		<FmSearch
			class="max-w-[360px]"
			rounded
			:hideDetails="false"
			variant="solo"
		/>
		<FmIconButton
			@click="emit('notification')"
			class="ml-auto"
			icon="mdi-bell-outline"
			size="normal"
			variant="text"
		/>
		<FmMenu>
			<template v-slot:activator="{ props }">
				<FmIconButton
					v-bind="props"
					icon="mdi-help-circle-outline"
					size="normal"
					variant="text"
				/>
			</template>

			<VCard>
				<VCardText>
					<div class="mx-auto text-center flex flex-col">
						<FmBtn @click="emit('documentation')" variant="text" rounded>
							Documentation
						</FmBtn>
						<FmBtn @click="emit('apiReference')" variant="text" rounded>
							API Reference
						</FmBtn>
					</div>
				</VCardText>
			</VCard>
		</FmMenu>

		<FmMenu>
			<template v-slot:activator="{ props }">
				<FmBtn icon v-bind="props">
					<FmAvatar>
						<span class="text-h5">CJ</span>
					</FmAvatar>
				</FmBtn>
			</template>

			<VCard>
				<VCardText>
					<div class="mx-auto text-center flex flex-col">
						<FmBtn @click="emit('profile')" variant="text" rounded>
							Profile
						</FmBtn>
						<FmBtn @click="emit('security')" variant="text" rounded>
							Account Security
						</FmBtn>
						<FmBtn @click="emit('logout')" variant="text" rounded>
							Log Out
						</FmBtn>
					</div>
				</VCardText>
			</VCard>
		</FmMenu>
	</header>
</template>

<script setup>
	import FmLogo from '@/components/fm/Logo/Logo.vue'
	import FmSearch from '@/components/fm/Search/Search.vue'
	import FmIconButton from '@/components/fm/IconButton/IconButton.vue'
	import FmMenu from '@/components/fm/Menu/Menu.vue'
	import FmBtn from '@/components/fm/Btn/Btn.vue'
	import FmAvatar from '@/components/fm/Avatar/Avatar.vue'
	import { VCard, VCardText } from 'vuetify/components'

	const props = defineProps({
		items: Array
	})
	const emit = defineEmits([
		'notification',
		'documentation',
		'apiReference',
		'profile',
		'logout',
		'security'
	])
</script>
