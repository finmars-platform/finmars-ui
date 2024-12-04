<template>
	<Navigation
		:items="items"
		:alternativeLink="alternativeLink"
		:base="base"
		:route="route"
		@resizeSideNav="emit('resizeSideNav', $event)"
	/>
</template>

<script setup>
	import Navigation from '@/components/fm/Navigation/Navigation.vue'
	import { computed, ref } from 'vue'

	const props = defineProps({
		isFloat: {
			type: Boolean
		},
		base: {
			type: String
		},
		alternativeLink: {
			type: String
		},
		route: {
			type: Object
		},
		isVue: {
			type: Boolean
		}
	})

	const emit = defineEmits(['resizeSideNav'])

	const route = computed(() => {
		if (props.route) return props.route
		const segments = window.location.pathname?.split('/')
		const realm_code =
			segments.find((item) => item.includes('realm')) || 'realm03va3'
		const space_code =
			segments.find((item) => item.includes('space')) || 'space027ho'
		return { params: { realm_code, space_code } }
	})

	const items = ref([
		{
			key: 'dashboard',
			label: 'Dashboard',
			icon: 'mdi-view-dashboard',
			action: undefined,
			to: '',
			href: getUrlToOldApp('/dashboard', route.value.params),
			style: {},
			classes: 'first-side-nav'
		},
		{
			key: 'reports',
			label: 'Reports',
			icon: 'mdi-poll',
			action: undefined,
			to: '',
			href: '',
			children: [
				{
					key: 'balance',
					label: 'Balance',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/report/balance')
				},
				{
					key: 'p&l',
					label: 'P&L',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/report/profit-and-lost')
				},
				{
					key: 'transaction',
					label: 'Transaction',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/report/transaction')
				},
				{
					key: 'performance',
					label: 'Performance',
					action: undefined,
					to: useGetNuxtLink('/reports/performance', route.value.params),
					href: ''
				}
			]
		},
		{
			key: 'data',
			label: 'Data',
			icon: 'mdi-file-tree-outline',
			action: undefined,
			to: '',
			href: '',
			children: [
				{
					key: 'portfolios',
					label: 'Portfolios',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data/portfolio')
				},
				{
					key: 'registers',
					label: 'Registers',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data/portfolio-register')
				},
				{
					key: 'accounts',
					label: 'Accounts',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data/account')
				},
				{
					key: 'instruments',
					label: 'Instruments',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data/instrument')
				},
				{
					key: 'counterparties',
					label: 'Counterparties',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data/counterparty')
				},
				{
					key: 'responsibles',
					label: 'Responsibles',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data/responsible')
				},
				{
					key: 'currencies',
					label: 'Currencies',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data/currency')
				},
				{
					key: 'strategies',
					label: 'Strategies',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data/strategy/1'),
					children: [
						{
							key: 'strategies-1',
							label: 'Strategies 1',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/data/strategy/1')
						},
						{
							key: 'strategies-2',
							label: 'Strategies 2',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/data/strategy/2')
						},
						{
							key: 'strategies-3',
							label: 'Strategies 3',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/data/strategy/3')
						}
					]
				}
			]
		},
		{
			key: 'transactions',
			label: 'Transactions',
			icon: 'mdi-swap-vertical',
			action: undefined,
			to: '',
			href: '',
			children: [
				{
					key: 'transactions-transactions',
					label: 'Transactions',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data/complex-transaction')
				},
				{
					key: 'base-transactions',
					label: 'Base Transactions',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data/transaction')
				},
				{
					key: 'register-transactions',
					label: 'Register Records',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data/portfolio-register-record')
				}
			]
		},
		{
			key: 'valuations',
			label: 'Valuations',
			icon: 'mdi-wallet-outline',
			action: undefined,
			to: '',
			href: '',
			children: [
				{
					key: 'prices',
					label: 'Prices',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data/price-history')
				},
				{
					key: 'FX-Rates',
					label: 'FX rates',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data/currency-history')
				},
				{
					key: 'Run-Pricing',
					label: 'Run Pricing',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/pricing-manage')
				},
				{
					key: 'Portfolio-History',
					label: 'Portfolio History',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data/portfolio-history')
				}
			]
		},
		{
			key: 'import',
			label: 'Import',
			icon: 'mdi-upload-outline',
			action: undefined,
			to: '',
			href: '',
			children: [
				{
					key: 'data-from-file',
					label: 'Import data from file',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/import/simple-entity-import')
				},
				{
					key: 'transactions-from-file',
					label: 'Import transactions from file',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/import/transaction-import')
				}
			]
		},
		{
			key: 'reconciliation',
			label: 'Reconciliation',
			icon: 'mdi-scale-balance',
			action: undefined,
			to: '',
			href: '',
			children: [
				{
					key: 'Portfolio-Reconcile-Groups',
					label: 'Portfolio reconciliation',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data/portfolio-reconcile-group')
				},
				{
					key: 'Reconciliation-History',
					label: 'Reconciliation history',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data/portfolio-reconcile-history')
				}
			]
		},
		{
			key: 'add-ons',
			label: 'Add-ons',
			icon: 'mdi-puzzle-outline',
			action: undefined,
			to: '',
			href: '',
			children: [
				{
					key: 'marketplace',
					label: 'Marketplace',
					action: undefined,
					to: useGetNuxtLink('/marketplace', route.value.params),
					href: ''
				}
			]
		},
		{
			key: 'explorer',
			label: 'Explorer',
			icon: 'mdi-folder-outline',
			action: undefined,
			to: useGetNuxtLink('/explorer', route.value.params),
			classes: 'separator-side-nav',
			href: ''
		},
		{
			key: 'configuration',
			label: 'Configuration',
			icon: 'mdi-tune',
			action: undefined,
			to: '',
			href: '',
			children: [
				{
					key: 'tasks',
					label: 'Tasks',
					action: undefined,
					to: useGetNuxtLink('/system/task/', route.value.params),
					href: ''
				},
				{
					key: 'workers',
					label: 'Workers',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/worker')
				},
				{
					key: 'workflows',
					label: 'Workflows',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/workflow')
				},
				{
					key: 'layouts',
					label: 'Layouts',
					action: undefined,
					to: '',
					href: '',
					children: [
						{
							key: 'Entity-Viewer-Layouts',
							label: 'Entity Viewer Layouts',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/settings/layout')
						},
						{
							key: 'Dashboard-Layouts',
							label: 'Dashboard Layouts',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/dashboard-layout')
						},
						{
							key: 'Input-Form-Layouts',
							label: 'Input Form Layouts',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/settings/input-form-layout')
						},
						{
							key: 'Context-Menu-Layouts',
							label: 'Context Menu Layouts',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/context-menu-layout')
						}
					]
				},
				{
					key: 'Data-Settings',
					label: 'Data Settings',
					action: undefined,
					to: '',
					href: '',
					children: [
						{
							key: 'Account-Types',
							label: 'Account Types',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/data/account-type')
						},
						{
							key: 'Instrument-Types',
							label: 'Instrument Types',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/data/instrument-type')
						},
						{
							key: 'Transaction-Types',
							label: 'Transaction Types',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/data/transaction-type')
						},
						{
							key: 'Transaction-Type-Groups',
							label: 'Transaction Type Groups',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/transaction-type-group')
						},
						{
							key: 'User-Attributes',
							label: 'User Attributes',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/settings/user-attribute')
						},
						{
							key: 'Reference-Tables',
							label: 'Reference Tables',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/import/reference-table')
						},
						{
							key: 'Mapping-Tables',
							label: 'Mapping Tables',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/import/mapping-tables-import')
						},
						{
							key: 'Templates',
							label: 'Templates',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/template-layout')
						},
						{
							key: 'Portfolio-Bundles',
							label: 'Portfolio Bundles',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/portfolio-bundle')
						},
						{
							key: 'Portfolio-Types',
							label: 'Portfolio Types',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/data/portfolio-type')
						}
					]
				},
				{
					key: 'Pricing-Policies',
					label: 'Pricing policies',
					action: undefined,
					to: useGetNuxtLink('/data/pricing-policy', route.value.params),
					href: ''
				},
				{
					key: 'Import-schemes',
					label: 'Import schemes',
					action: undefined,
					to: '',
					href: '',
					children: [
						{
							key: 'Data-Import',
							label: 'Data Import',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/settings/data-import')
						},
						{
							key: 'Transactions-Import',
							label: 'Transactions Import',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/settings/transaction-import')
						}
					]
				},
				{
					key: 'Specifications',
					label: 'Specifications',
					action: undefined,
					to: '',
					href: '',
					children: [
						{
							key: 'Aliases',
							label: 'Aliases',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/settings/aliase')
						},
						{
							key: 'Tooltips',
							label: 'Tooltips',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/settings/tooltip')
						},
						{
							key: 'Palettes',
							label: 'Palettes',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/settings/palette')
						},
						{
							key: 'code-editor',
							label: 'Code editor',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/editor')
						}
					]
				},
				{
					key: 'Configuration',
					label: 'Configuration',
					action: undefined,
					to: '',
					href: '',
					children: [
						{
							key: 'Import',
							label: 'Import',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/settings/import-configuration')
						},
						{
							key: 'Manage',
							label: 'Manage',
							action: undefined,
							to: useGetNuxtLink(
								'/configuration/manage-configuration',
								route.value.params
							),
							href: ''
						}
					]
				}
			]
		},
		{
			key: 'administration',
			label: 'Administration',
			icon: 'mdi-shield-account-variant-outline',
			action: undefined,
			to: '',
			href: '',
			children: [
				{
					key: 'New-User-Setups',
					label: 'New User Setups',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/settings/init-configuration')
				},
				{
					key: 'Permission',
					label: 'Permissions',
					action: undefined,
					to: '',
					href: '',
					children: [
						{
							key: 'Member',
							label: 'Members',
							action: undefined,
							href: '',
							to: useGetNuxtLink('/system/iam/member', route.value.params)
						},
						{
							key: 'Group',
							label: 'Groups',
							action: undefined,
							href: '',
							to: useGetNuxtLink('/system/iam/group', route.value.params)
						},
						{
							key: 'Role',
							label: 'Roles',
							action: undefined,
							href: '',
							to: useGetNuxtLink('/system/iam/role', route.value.params)
						},
						{
							key: 'Access-policy',
							label: 'Access Policy',
							action: undefined,
							href: '',
							to: useGetNuxtLink(
								'/system/iam/access-policy',
								route.value.params
							)
						},
						{
							key: 'resource-groups',
							label: 'Resource Groups',
							action: undefined,
							href: '',
							to: useGetNuxtLink(
								'/system/iam/resource-group',
								route.value.params
							)
						}
					]
				},
				{
					key: 'Default-settings',
					label: 'Default settings',
					action: undefined,
					to: useGetNuxtLink('/settings/default-settings', route.value.params),
					href: ''
				},
				{
					key: 'Recycle-Bin',
					label: 'Recycle Bin',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/recycle-bin')
				},
				{
					key: 'System',
					label: 'System',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/system-dashboard')
				},
				{
					key: 'Cache',
					label: 'Cache',
					action: undefined,
					to: '',
					href: '',
					children: [
						{
							key: 'Balance-Report-Instance',
							label: 'Balance Report Instance',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/balance-report-instance')
						},
						{
							key: 'P&L-Report-Instance',
							label: 'P&L Report Instance',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/pl-report-instance')
						}
					]
				},
				{
					key: 'Vault',
					label: 'Vault',
					action: undefined,
					to: '',
					href: '',
					children: [
						{
							key: 'Vault-Vault',
							label: 'Vault',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/vault')
						},
						{
							key: 'Vault-Record',
							label: 'Vault Record',
							action: undefined,
							to: useGetNuxtLink('/settings/vault-record', route.value.params),
							href: ''
						}
					]
				},
				{
					key: 'Client-Entity',
					label: 'Client Entity',
					action: undefined,
					to: useGetNuxtLink('/settings/client-entity', route.value.params),
					href: ''
				},
				{
					key: 'White-Label',
					label: 'White Label',
					action: undefined,
					to: useGetNuxtLink('/system/settings/general/', route.value.params),
					href: ''
				},
				{
					key: 'journal',
					label: 'Journal',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/journal')
				}
			]
		}
	])

	function getUrlToOldApp(suffix) {
		const store = route.value.params

		let apiUrl = ''
		if (props.isVue && props.base !== window.location.origin) {
			apiUrl = props.base
		}
		let baseApiUrl = ''

		if (store.realm_code) {
			baseApiUrl = '/' + store.realm_code + '/' + store.space_code
		} else {
			baseApiUrl = '/' + store.isUrlValid
		}

		return `${apiUrl}${baseApiUrl}/a/#!${suffix}`
	}

	function useGetNuxtLink(linkEnd, params) {
		let apiUrl = ''
		if (!props.isVue && props.base) {
			apiUrl = props.base
		}

		const realm_code = params['realm_code']
		const space_code = params['space_code']

		return apiUrl + '/' + realm_code + '/' + space_code + '/v' + linkEnd
	}
</script>

<style lang="postcss">
	.first-side-nav {
		@apply mt-[16px] block;
	}

	.separator-side-nav {
		@apply mb-[8px];

		&::after {
			content: '';
			@apply block h-px bg-[var(--sidenav-borderColor)] my-2 mx-4;
		}
	}
</style>
