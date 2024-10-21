<template>
	<header
		class="flex w-full items-center max-h-20 h-20 py-3 px-[22px] gap-x-4 border-b-[1px] border-[var(--boredColor-header)] border-solid"
	>
		<div></div>
		<FmLogo :logo="logo" class="mr-12" />
		<FmSearch
			v-if="false"
			class="max-w-[360px]"
			rounded
			:hideDetails="false"
			variant="solo"
		/>
		<VSwitch
			class="ml-auto"
			:modelValue="isDark"
			@update:modelValue="emit('setTheme', !isDark)"
			hide-details
			inset
		></VSwitch>
		<FmMenu>
			<template v-slot:activator="{ props }">
				<FmIconButton
					v-bind="props"
					icon="mdi-bell-outline"
					size="normal"
					variant="text"
				/>
			</template>

			<VCard>
				<VCardText>
					<div class="mx-auto text-center flex flex-col">
						<template v-if="notifications.length">
							<div
								class="fm_message_item"
								v-for="(item, index) in notifications"
								:key="index"
							>
								<div class="flex sb">
									<div class="fm_message_item_date">
										{{ formatDate(item.created) }}
									</div>
									<div class="fm_message_item_section">
										{{ SECTIONS[item.section] }}
									</div>
								</div>
								<div class="fm_message_item_h">{{ item.title }}</div>
								<div class="fm_message_item_t">
									{{
										item.description.length > 65
											? item.description.slice(0, 65) + '...'
											: item.description
									}}
								</div>
							</div>
							<div class="tac p-8">
								<FmBtn to="/home" type="action">Show ALL</FmBtn>
							</div>
						</template>
						<div class="p-16" v-else>No new messages</div>
					</div>
				</VCardText>
			</VCard>
		</FmMenu>
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
						<FmBtn
							:href="documentationUrl"
							@click="emit('documentation')"
							variant="text"
							rounded
						>
							Documentation
						</FmBtn>
						<FmBtn
							:href="apiReferenceUrl"
							@click="emit('apiReference')"
							variant="text"
							rounded
						>
							API Reference
						</FmBtn>
					</div>
				</VCardText>
			</VCard>
		</FmMenu>

		<FmMenu v-if="currentWorkspaceName">
			<template v-slot:activator="{ props }">
				<FmBtn v-bind="props" variant="text">
					{{ currentWorkspaceName }}
				</FmBtn>
			</template>

			<VCard>
				<VCardText>
					<div
						v-for="(item, index) in workspaces"
						:key="index"
						@click="emit('setCurrent', item)"
					>
						{{ item.name }}
					</div>
				</VCardText>
			</VCard>
		</FmMenu>
		<FmMenu>
			<template v-slot:activator="{ props }">
				<FmBtn icon v-bind="props">
					<FmAvatar :image="avatar">
						<span class="text-h5">{{ letters }}</span>
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
						<FmBtn :href="logoutUrl" variant="text" rounded> Log Out</FmBtn>
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
	import dayjs from 'dayjs'
	import relativeTime from 'dayjs/plugin/relativeTime'

	dayjs.extend(relativeTime)

	defineProps({
		notifications: {
			type: Array
		},
		currentWorkspaceName: {
			type: String
		},
		workspaces: {
			type: Array
		},
		isDark: {
			type: Boolean
		},
		documentationUrl: {
			type: String
		},
		apiReferenceUrl: {
			type: String
		},
		logo: {
			type: String
		},
		logoutUrl: {
			type: String
		},
		avatar: {
			type: String
		},
		letters: {
			type: String
		}
	})

	const emit = defineEmits(['profile', 'setTheme', 'security', 'setCurrent'])

	const SECTIONS = {
		1: 'Events',
		2: 'Transactions',
		3: 'Instruments',
		4: 'Data',
		5: 'Prices',
		6: 'Report',
		7: 'Import',
		8: 'Activity log',
		9: 'Schedules',
		10: 'Other'
	}

	function formatDate(date) {
		if (dayjs().diff(dayjs(date), 'hours') > 12)
			return dayjs(date).format('DD.MM.YYYY HH:mm')

		return dayjs(date).fromNow()
	}
</script>

<style>
	:root {
		--boredColor-header: #d8c2bc;
	}

	body.dark-mode {
		--boredColor-header: var(--on-secondary-color);
	}
</style>
