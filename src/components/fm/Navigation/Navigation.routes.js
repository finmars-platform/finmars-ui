export const NavigationRoutes = [
  {
    access: true,
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'mdi-view-dashboard',
    action: undefined,
    to: '',
    href: 'getUrlToOldApp:/dashboard',
    style: {},
    classes: 'first-side-nav'
  },
  {
    access: true,
    key: 'reports',
    label: 'Reports',
    icon: 'mdi-poll',
    action: undefined,
    to: '',
    href: '',
    children: [
      {
        access: true,
        key: 'balance',
        label: 'Balance',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/report/balance'
      },
      {
        access: true,
        key: 'p&l',
        label: 'P&L',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/report/profit-and-lost'
      },
      {
        access: true,
        key: 'transaction',
        label: 'Transaction',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/report/transaction'
      },
      {
        access: true,
        key: 'performance',
        label: 'Performance',
        action: undefined,
        to: 'useGetNuxtLink:/reports/performance',
        href: ''
      }
    ]
  },
  {
    access: true,
    key: 'data',
    label: 'Data',
    icon: 'mdi-file-tree-outline',
    action: undefined,
    to: '',
    href: '',
    children: [
      {
        access: true,
        key: 'portfolios',
        label: 'Portfolios',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/data/portfolio'
      },
      {
        access: true,
        key: 'registers',
        label: 'Registers',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/data/portfolio-register'
      },
      {
        access: true,
        key: 'accounts',
        label: 'Accounts',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/data/account'
      },
      {
        access: true,
        key: 'instruments',
        label: 'Instruments',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/data/instrument'
      },
      {
        access: true,
        key: 'counterparties',
        label: 'Counterparties',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/data/counterparty'
      },
      {
        access: true,
        key: 'responsibles',
        label: 'Responsibles',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/data/responsible'
      },
      {
        access: true,
        key: 'currencies',
        label: 'Currencies',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/data/currency'
      },
      {
        access: true,
        key: 'strategies',
        label: 'Strategies',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/data/strategy/1',
        children: [
          {
            access: true,
            key: 'strategies-1',
            label: 'Strategies 1',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/data/strategy/1'
          },
          {
            access: true,
            key: 'strategies-2',
            label: 'Strategies 2',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/data/strategy/2'
          },
          {
            access: true,
            key: 'strategies-3',
            label: 'Strategies 3',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/data/strategy/3'
          }
        ]
      }
    ]
  },
  {
    access: true,
    key: 'transactions',
    label: 'Transactions',
    icon: 'mdi-swap-vertical',
    action: undefined,
    to: '',
    href: '',
    children: [
      {
        access: true,
        key: 'transactions-transactions',
        label: 'Transactions',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/data/complex-transaction'
      },
      {
        access: true,
        key: 'base-transactions',
        label: 'Base Transactions',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/data/transaction'
      },
      {
        access: true,
        key: 'register-transactions',
        label: 'Register Records',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/data/portfolio-register-record'
      }
    ]
  },
  {
    access: true,
    key: 'valuations',
    label: 'Valuations',
    icon: 'mdi-wallet-outline',
    action: undefined,
    to: '',
    href: '',
    children: [
      {
        access: true,
        key: 'prices',
        label: 'Prices',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/data/price-history'
      },
      {
        access: true,
        key: 'FX-Rates',
        label: 'FX rates',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/data/currency-history'
      },
      {
        access: true,
        key: 'Run-Pricing',
        label: 'Run Pricing',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/pricing-manage'
      },
      {
        access: true,
        key: 'Portfolio-History',
        label: 'Portfolio History',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/data/portfolio-history'
      }
    ]
  },
  {
    access: true,
    key: 'import',
    label: 'Import',
    icon: 'mdi-upload-outline',
    action: undefined,
    to: '',
    href: '',
    children: [
      {
        access: true,
        key: 'data-from-file',
        label: 'Import data from file',
        action: undefined,
        to: 'useGetNuxtLink:/system/simple-import',
        href: ''
      },
      {
        access: true,
        key: 'transactions-from-file',
        label: 'Import transactions from file',
        action: undefined,
        to: 'useGetNuxtLink:/system/transaction-import',
        href: ''
      }
    ]
  },
  {
    access: true,
    key: 'reconciliation',
    label: 'Reconciliation',
    icon: 'mdi-scale-balance',
    action: undefined,
    to: '',
    href: '',
    children: [
      {
        access: true,
        key: 'Portfolio-Reconcile-Groups',
        label: 'Portfolio reconciliation',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/data/portfolio-reconcile-group'
      },
      {
        access: true,
        key: 'Reconciliation-History',
        label: 'Reconciliation history',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/data/portfolio-reconcile-history'
      }
    ]
  },
  {
    access: true,
    key: 'add-ons',
    label: 'Add-ons',
    icon: 'mdi-puzzle-outline',
    action: undefined,
    to: '',
    href: '',
    children: [
      {
        access: true,
        key: 'marketplace',
        label: 'Marketplace',
        action: undefined,
        to: 'useGetNuxtLink:/marketplace',
        href: ''
      }
    ]
  },
  {
    access: true,
    key: 'explorer',
    label: 'Explorer',
    icon: 'mdi-folder-outline',
    action: undefined,
    to: 'useGetNuxtLink:/explorer',
    classes: 'separator-side-nav',
    href: ''
  },
  {
    access: true,
    key: 'configuration',
    label: 'Configuration',
    icon: 'mdi-tune',
    action: undefined,
    to: '',
    href: '',
    children: [
      {
        access: true,
        key: 'tasks',
        label: 'Tasks',
        action: undefined,
        to: 'useGetNuxtLink:/system/task/',
        href: ''
      },
      {
        access: true,
        key: 'initial-member-configuration',
        label: 'Initial Member',
        action: undefined,
        to: 'useGetNuxtLink:/configuration/initial',
        href: ''
      },
      {
        access: true,
        key: 'workers',
        label: 'Workers',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/worker'
      },
      {
        access: true,
        key: 'workflows',
        label: 'Workflows',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/workflow'
      },
      {
        access: true,
        key: 'layouts',
        label: 'Layouts',
        action: undefined,
        to: '',
        href: '',
        children: [
          {
            access: true,
            key: 'Entity-Viewer-Layouts',
            label: 'Entity Viewer Layouts',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/settings/layout'
          },
          {
            access: true,
            key: 'Dashboard-Layouts',
            label: 'Dashboard Layouts',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/dashboard-layout'
          },
          {
            access: true,
            key: 'Input-Form-Layouts',
            label: 'Input Form Layouts',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/settings/input-form-layout'
          },
          {
            access: true,
            key: 'Context-Menu-Layouts',
            label: 'Context Menu Layouts',
            action: undefined,
            href: '',
            to: 'useGetNuxtLink:/configuration/context-menu-layouts'
          }
        ]
      },
      {
        access: true,
        key: 'Data-Settings',
        label: 'Data Settings',
        action: undefined,
        to: '',
        href: '',
        children: [
          {
            access: true,
            key: 'Account-Types',
            label: 'Account Types',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/data/account-type'
          },
          {
            access: true,
            key: 'Instrument-Types',
            label: 'Instrument Types',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/data/instrument-type'
          },
          {
            access: true,
            key: 'Transaction-Types',
            label: 'Transaction Types',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/data/transaction-type'
          },
          {
            access: true,
            key: 'Transaction-Type-Groups',
            label: 'Transaction Type Groups',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/transaction-type-group'
          },
          {
            access: true,
            key: 'User-Attributes',
            label: 'User Attributes',
            action: undefined,
            to: 'useGetNuxtLink:/configuration/user-attributes',
            href: ''
          },
          {
            access: true,
            key: 'Reference-Tables',
            label: 'Reference Tables',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/import/reference-table'
          },
          {
            access: true,
            key: 'Mapping-Tables',
            label: 'Mapping Tables',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/import/mapping-tables-import'
          },
          {
            access: true,
            key: 'Templates',
            label: 'Templates',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/template-layout'
          },
          {
            access: true,
            key: 'Portfolio-Bundles',
            label: 'Portfolio Bundles',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/portfolio-bundle'
          },
          {
            access: true,
            key: 'Portfolio-Types',
            label: 'Portfolio Types',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/data/portfolio-type'
          }
        ]
      },
      {
        access: true,
        key: 'Pricing-Policies',
        label: 'Pricing policies',
        action: undefined,
        to: 'useGetNuxtLink:/data/pricing-policy',
        href: ''
      },
      {
        access: true,
        key: 'Import-schemes',
        label: 'Import schemes',
        action: undefined,
        to: '',
        href: '',
        children: [
          {
            access: true,
            key: 'Data-Import',
            label: 'Data Import',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/settings/data-import'
          },
          {
            access: true,
            key: 'Transactions-Import',
            label: 'Transactions Import',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/settings/transaction-import'
          }
        ]
      },
      {
        access: true,
        key: 'Specifications',
        label: 'Specifications',
        action: undefined,
        to: '',
        href: '',
        children: [
          {
            access: true,
            key: 'Aliases',
            label: 'Aliases',
            action: undefined,
            to: 'useGetNuxtLink:/system/settings/aliases',
            href: ''
          },
          {
            access: true,
            key: 'Tooltips',
            label: 'Tooltips',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/settings/tooltip'
          },
          {
            access: true,
            key: 'Palettes',
            label: 'Palettes',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/settings/palette'
          },
          {
            access: true,
            key: 'code-editor',
            label: 'Code editor',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/editor'
          }
        ]
      },
      {
        access: true,
        key: 'Configuration',
        label: 'Configuration',
        action: undefined,
        to: '',
        href: '',
        children: [
          {
            access: true,
            key: 'Import',
            label: 'Import',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/settings/import-configuration'
          },
          {
            access: true,
            key: 'Manage',
            label: 'Manage',
            action: undefined,
            to: 'useGetNuxtLink:/configuration/manage-configuration',
            href: ''
          }
        ]
      }
    ]
  },
  {
    access: true,
    key: 'administration',
    label: 'Administration',
    icon: 'mdi-shield-account-variant-outline',
    action: undefined,
    to: '',
    href: '',
    children: [
      {
        access: true,
        key: 'New-User-Setups',
        label: 'New User Setups',
        action: undefined,
        href: '',
        to: 'useGetNuxtLink:/configuration/initial-setup'
      },
      {
        access: true,
        key: 'Permission',
        label: 'Permissions',
        action: undefined,
        to: '',
        href: '',
        children: [
          {
            access: true,
            key: 'Member',
            label: 'Members',
            action: undefined,
            href: '',
            to: 'useGetNuxtLink:/system/iam/member'
          },
          {
            access: true,
            key: 'Group',
            label: 'Groups',
            action: undefined,
            href: '',
            to: 'useGetNuxtLink:/system/iam/group'
          },
          {
            access: true,
            key: 'Role',
            label: 'Roles',
            action: undefined,
            href: '',
            to: 'useGetNuxtLink:/system/iam/role'
          },
          {
            access: true,
            key: 'Access-policy',
            label: 'Access Policy',
            action: undefined,
            href: '',
            to: 'useGetNuxtLink:/system/iam/access-policy'
          },
          {
            access: true,
            key: 'resource-groups',
            label: 'Resource Groups',
            action: undefined,
            href: '',
            to: 'useGetNuxtLink:/system/iam/resource-group'
          }
        ]
      },
      {
        access: true,
        key: 'Default-settings',
        label: 'Default settings',
        action: undefined,
        to: 'useGetNuxtLink:/settings/default-settings',
        href: ''
      },
      {
        access: true,
        key: 'Recycle-Bin',
        label: 'Recycle Bin',
        action: undefined,
        to: 'useGetNuxtLink:/system/recycle-bin',
        href: ''
      },
      {
        access: true,
        key: 'System',
        label: 'System',
        action: undefined,
        to: 'useGetNuxtLink:/system/dashboard',
        href: ''
      },
      {
        access: true,
        key: 'Cache',
        label: 'Cache',
        action: undefined,
        to: '',
        href: '',
        children: [
          {
            access: true,
            key: 'Balance-Report-Instance',
            label: 'Balance Report Instance',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/balance-report-instance'
          },
          {
            access: true,
            key: 'P&L-Report-Instance',
            label: 'P&L Report Instance',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/pl-report-instance'
          }
        ]
      },
      {
        access: true,
        key: 'Vault',
        label: 'Vault',
        action: undefined,
        to: '',
        href: '',
        children: [
          {
            access: true,
            key: 'Vault-Vault',
            label: 'Vault',
            action: undefined,
            to: '',
            href: 'getUrlToOldApp:/vault'
          },
          {
            access: true,
            key: 'Vault-Record',
            label: 'Vault Record',
            action: undefined,
            to: 'useGetNuxtLink:/settings/vault-record',
            href: ''
          }
        ]
      },
      {
        access: true,
        key: 'Client-Entity',
        label: 'Client Entity',
        action: undefined,
        to: 'useGetNuxtLink:/settings/client-entity',
        href: ''
      },
      {
        access: true,
        key: 'White-Label',
        label: 'White Label',
        action: undefined,
        to: 'useGetNuxtLink:/system/settings/general/',
        href: ''
      },
      {
        access: true,
        key: 'journal',
        label: 'Journal',
        action: undefined,
        to: '',
        href: 'getUrlToOldApp:/journal'
      }
    ]
  }
];
