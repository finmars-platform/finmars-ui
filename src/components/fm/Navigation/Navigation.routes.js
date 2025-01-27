export const NavigationRoutes = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'mdi-view-dashboard',
    action: undefined,
    to: '',
    href: '/dashboard',
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
        href: '/report/balance'
      },
      {
        key: 'p&l',
        label: 'P&L',
        action: undefined,
        to: '',
        href: '/report/profit-and-lost'
      },
      {
        key: 'transaction',
        label: 'Transaction',
        action: undefined,
        to: '',
        href: '/report/transaction'
      },
      {
        key: 'performance',
        label: 'Performance',
        action: undefined,
        to: '/reports/performance',
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
        href: '/data/portfolio'
      },
      {
        key: 'registers',
        label: 'Registers',
        action: undefined,
        to: '',
        href: '/data/portfolio-register'
      },
      {
        key: 'accounts',
        label: 'Accounts',
        action: undefined,
        to: '',
        href: '/data/account'
      },
      {
        key: 'instruments',
        label: 'Instruments',
        action: undefined,
        to: '',
        href: '/data/instrument'
      },
      {
        key: 'counterparties',
        label: 'Counterparties',
        action: undefined,
        to: '',
        href: '/data/counterparty'
      },
      {
        key: 'responsibles',
        label: 'Responsibles',
        action: undefined,
        to: '',
        href: '/data/responsible'
      },
      {
        key: 'currencies',
        label: 'Currencies',
        action: undefined,
        to: '',
        href: '/data/currency'
      },
      {
        key: 'strategies',
        label: 'Strategies',
        action: undefined,
        to: '',
        href: '/data/strategy/1',
        children: [
          {
            key: 'strategies-1',
            label: 'Strategies 1',
            action: undefined,
            to: '',
            href: '/data/strategy/1'
          },
          {
            key: 'strategies-2',
            label: 'Strategies 2',
            action: undefined,
            to: '',
            href: '/data/strategy/2'
          },
          {
            key: 'strategies-3',
            label: 'Strategies 3',
            action: undefined,
            to: '',
            href: '/data/strategy/3'
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
        href: '/data/complex-transaction'
      },
      {
        key: 'base-transactions',
        label: 'Base Transactions',
        action: undefined,
        to: '',
        href: '/data/transaction'
      },
      {
        key: 'register-transactions',
        label: 'Register Records',
        action: undefined,
        to: '',
        href: '/data/portfolio-register-record'
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
        href: '/data/price-history'
      },
      {
        key: 'FX-Rates',
        label: 'FX rates',
        action: undefined,
        to: '',
        href: '/data/currency-history'
      },
      {
        key: 'Run-Pricing',
        label: 'Run Pricing',
        action: undefined,
        to: '',
        href: '/pricing-manage'
      },
      {
        key: 'Portfolio-History',
        label: 'Portfolio History',
        action: undefined,
        to: '',
        href: '/data/portfolio-history'
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
        to: '/system/simple-import',
        href: ''
      },
      {
        key: 'transactions-from-file',
        label: 'Import transactions from file',
        action: undefined,
        to: '/system/transaction-import',
        href: ''
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
        href: '/data/portfolio-reconcile-group'
      },
      {
        key: 'Reconciliation-History',
        label: 'Reconciliation history',
        action: undefined,
        to: '',
        href: '/data/portfolio-reconcile-history'
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
        to: '/marketplace',
        href: ''
      }
    ]
  },
  {
    key: 'explorer',
    label: 'Explorer',
    icon: 'mdi-folder-outline',
    action: undefined,
    to: '/explorer',
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
        to: '/system/task/',
        href: ''
      },
      {
        key: 'initial-member-configuration',
        label: 'Initial Member',
        action: undefined,
        to: '/configuration/initial',
        href: ''
      },
      {
        key: 'workers',
        label: 'Workers',
        action: undefined,
        to: '',
        href: '/worker'
      },
      {
        key: 'workflows',
        label: 'Workflows',
        action: undefined,
        to: '',
        href: '/workflow'
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
            href: '/settings/layout'
          },
          {
            key: 'Dashboard-Layouts',
            label: 'Dashboard Layouts',
            action: undefined,
            to: '',
            href: '/dashboard-layout/'
          },
          {
            key: 'Input-Form-Layouts',
            label: 'Input Form Layouts',
            action: undefined,
            to: '',
            href: '/settings/input-form-layout'
          },
          {
            key: 'Context-Menu-Layouts',
            label: 'Context Menu Layouts',
            action: undefined,
            href: '',
            to: '/configuration/context-menu-layouts'
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
            href: '/data/account-type'
          },
          {
            key: 'Instrument-Types',
            label: 'Instrument Types',
            action: undefined,
            to: '',
            href: '/data/instrument-type'
          },
          {
            key: 'Transaction-Types',
            label: 'Transaction Types',
            action: undefined,
            to: '',
            href: '/data/transaction-type'
          },
          {
            key: 'Transaction-Type-Groups',
            label: 'Transaction Type Groups',
            action: undefined,
            to: '',
            href: '/transaction-type-group'
          },
          {
            key: 'User-Attributes',
            label: 'User Attributes',
            action: undefined,
            to: '/configuration/user-attributes',
            href: ''
          },
          {
            key: 'Reference-Tables',
            label: 'Reference Tables',
            action: undefined,
            to: '',
            href: '/import/reference-tables'
          },
          {
            key: 'Mapping-Tables',
            label: 'Mapping Tables',
            action: undefined,
            to: '',
            href: '/import/mapping-tables-import'
          },
          {
            key: 'Templates',
            label: 'Templates',
            action: undefined,
            to: '',
            href: '/template-layout'
          },
          {
            key: 'Portfolio-Bundles',
            label: 'Portfolio Bundles',
            action: undefined,
            to: '',
            href: '/portfolio-bundle'
          },
          {
            key: 'Portfolio-Types',
            label: 'Portfolio Types',
            action: undefined,
            to: '',
            href: '/data/portfolio-type'
          }
        ]
      },
      {
        key: 'Pricing-Policies',
        label: 'Pricing policies',
        action: undefined,
        to: '/data/pricing-policy',
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
            href: '/settings/data-import'
          },
          {
            key: 'Transactions-Import',
            label: 'Transactions Import',
            action: undefined,
            to: '',
            href: '/settings/transaction-import'
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
            to: '/system/settings/aliases',
            href: ''
          },
          {
            key: 'Tooltips',
            label: 'Tooltips',
            action: undefined,
            to: '',
            href: '/settings/tooltip'
          },
          {
            key: 'Palettes',
            label: 'Palettes',
            action: undefined,
            to: '',
            href: '/settings/palette'
          },
          {
            key: 'code-editor',
            label: 'Code editor',
            action: undefined,
            to: '',
            href: '/editor'
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
            href: '/settings/import-configuration'
          },
          {
            key: 'Manage',
            label: 'Manage',
            action: undefined,
            to: '/configuration/manage-configuration',
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
        href: '',
        to: '/configuration/initial-setup'
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
            to: '/system/iam/member'
          },
          {
            key: 'Group',
            label: 'Groups',
            action: undefined,
            href: '',
            to: '/system/iam/group'
          },
          {
            key: 'Role',
            label: 'Roles',
            action: undefined,
            href: '',
            to: '/system/iam/role'
          },
          {
            key: 'Access-policy',
            label: 'Access Policy',
            action: undefined,
            href: '',
            to: '/system/iam/access-policy'
          },
          {
            key: 'resource-groups',
            label: 'Resource Groups',
            action: undefined,
            href: '',
            to: '/system/iam/resource-group'
          }
        ]
      },
      {
        key: 'Default-settings',
        label: 'Default settings',
        action: undefined,
        to: '/settings/default-settings',
        href: ''
      },
      {
        key: 'Recycle-Bin',
        label: 'Recycle Bin',
        action: undefined,
        to: '/system/recycle-bin',
        href: ''
      },
      {
        key: 'System',
        label: 'System',
        action: undefined,
        to: '/system/dashboard',
        href: ''
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
            href: '/balance-report-instance'
          },
          {
            key: 'P&L-Report-Instance',
            label: 'P&L Report Instance',
            action: undefined,
            to: '',
            href: '/pl-report-instance'
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
            href: '/vault'
          },
          {
            key: 'Vault-Record',
            label: 'Vault Record',
            action: undefined,
            to: '/settings/vault-record',
            href: ''
          }
        ]
      },
      {
        key: 'Client-Entity',
        label: 'Client Entity',
        action: undefined,
        to: '/settings/client-entity',
        href: ''
      },
      {
        key: 'White-Label',
        label: 'White Label',
        action: undefined,
        to: '/system/settings/general/',
        href: ''
      },
      {
        key: 'journal',
        label: 'Journal',
        action: undefined,
        to: '',
        href: '/journal'
      }
    ]
  }
];
