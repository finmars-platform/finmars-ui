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
			style: {}
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
				},
				{
					key: 'events',
					label: 'Events',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/report/check-for-events')
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
						}
					]
				},
				{
					key: 'events',
					label: 'Events',
					action: undefined,
					to: '',
					href: getUrlToOldApp('data/generated-event')
				},
				{
					key: 'stats',
					label: 'Stats',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data-stats')
				},
				{
					key: 'calendar',
					label: 'Calendar',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/calendar')
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
				},
				{
					key: 'transactions-performance',
					label: 'Performance',
					action: undefined,
					to: '',
					href: ''
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
					key: 'prices-journal',
					label: 'Prices journal',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data/pricing-errors')
				},
				{
					key: 'FX-Rates',
					label: 'FX rates',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data/currency-history')
				},
				{
					key: 'FX-Rates-Journal',
					label: 'FX rates Journal',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/data/currencies-errors')
				},
				{
					key: 'Run-Pricing',
					label: 'Run Pricing',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/run-pricing-procedures')
				},
				{
					key: 'Procedures-status',
					label: 'Procedures status',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/pricing-parent-procedures')
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
				},
				{
					key: 'Data-and-Transactions-from-file',
					label: 'Import data and transactions',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/import/complex-import')
				},
				{
					key: 'Instrument-from-provider',
					label: 'Import instrument from provider',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/import/instrument-import')
				},
				{
					key: 'Instrument-from-Finmars-Database',
					label: 'Import instrument from database',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/import/instrument-import-cbonds')
				},
				{
					key: 'Import-From-Bank',
					label: 'Import from bank',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/run-data-procedures')
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
					to: '',
					href: getUrlToOldApp('/task')
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
						},
						{
							key: 'Manual-Sorting',
							label: 'Manual Sorting',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/manual-sorting-layout')
						},
						{
							key: 'Mobile',
							label: 'Mobile',
							action: undefined,
							to: useGetNuxtLink('/dashboard/mobile', route.value.params),
							href: ''
						},
						{
							key: 'Notifications',
							label: 'Notifications',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/settings/notification')
						},
						{
							key: 'Interface-Complexity',
							label: 'Interface Complexity',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/settings/interface')
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
					key: 'Pricing',
					label: 'Pricing',
					action: undefined,
					to: '',
					href: '',
					children: [
						{
							key: 'Schemes',
							label: 'Schemes',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/pricing-schemes')
						},
						{
							key: 'Policies',
							label: 'Policies',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/pricing-policy')
						},
						{
							key: 'Manage',
							label: 'Manage',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/pricing-manage')
						}
					]
				},
				{
					key: 'Import-settings',
					label: 'Import settings',
					action: undefined,
					to: '',
					href: '',
					children: [
						{
							key: 'Instrument-Schemes',
							label: 'Instrument Schemes',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/settings/instrument-import')
						},
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
					key: 'procedures',
					label: 'Procedures',
					action: undefined,
					to: '',
					href: '',
					children: [
						{
							key: 'Pricing-Procedures',
							label: 'Pricing Procedures',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/pricing-procedure')
						},
						{
							key: 'Data-Procedures',
							label: 'Data Procedures',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/data-procedure')
						},
						{
							key: 'Expression-Procedures',
							label: 'Expression Procedures',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/expression-procedure')
						},
						{
							key: 'Schedules',
							label: 'Schedules',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/schedule')
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
							key: 'Reports',
							label: 'Reports',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/settings/cross-entity-attribute-extension')
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
							key: 'Export-Deprecated',
							label: 'Export (Deprecated)',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/settings/export-configuration')
						},
						{
							key: 'Update',
							label: 'Update',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/update-configuration')
						},
						{
							key: 'Manage',
							label: 'Manage',
							action: undefined,
							to: '',
							href: getUrlToOldApp('/manage-configuration')
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
					key: 'Data-providers',
					label: 'Data providers',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/settings/data-providers')
				},
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
							to: useGetNuxtLink(
								'/settings/permission/member',
								route.value.params
							)
						},
						{
							key: 'Group',
							label: 'Groups',
							action: undefined,
							href: '',
							to: useGetNuxtLink(
								'/settings/permission/group',
								route.value.params
							)
						},
						{
							key: 'Role',
							label: 'Roles',
							action: undefined,
							href: '',
							to: useGetNuxtLink(
								'/settings/permission/role',
								route.value.params
							)
						},
						{
							key: 'Access-policy',
							label: 'Access Policy',
							action: undefined,
							href: '',
							to: useGetNuxtLink(
								'/settings/permission/access-policy',
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
					key: 'Balance-Report-Instance',
					label: 'Balance Report Instance',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/balance-report-instance')
				},
				{
					key: 'PL-Report-Instance',
					label: 'PL Report Instance',
					action: undefined,
					to: '',
					href: getUrlToOldApp('/pl-report-instance')
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
					key: 'White-Label',
					label: 'White Label',
					action: undefined,
					to: useGetNuxtLink('/system/settings/general/', route.value.params),
					href: ''
				},
				{
					key: 'resource-groups',
					label: 'Resource Groups',
					action: undefined,
					to: useGetNuxtLink(
						'/settings/iam/resource-group',
						route.value.params
					),
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
	.separator-side-nav {
		@apply mb-[8px];

		&::after {
			content: '';
			@apply block h-px bg-[var(--sidenav-borderColor)] my-2 mx-4;
		}
	}
</style>
