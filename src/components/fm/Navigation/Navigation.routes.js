export const NavigationRoutes = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'mdi-view-dashboard-outline',
    action: undefined,
    to: '',
    href: '/dashboard',
    style: {},
    classes: 'first-side-nav'
  },
  {
    key: 'reports',
    label: 'Reports',
    icon: 'mdi-chart-box-outline',
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
        label: 'Transactions',
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
    key: 'add-ons',
    label: 'Add-ons',
    icon: 'mdi-puzzle-outline',
    action: undefined,
    to: '',
    href: '',
    children: [

    ]
  },
  {
    key: 'data-quality',
    label: 'Data Quality',
    action: undefined,
    icon: 'mdi-check-decagram-outline',
    to: '/data-quality',
    href: '',
    children: [
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
            label: 'Portfolio Reconcile Groups',
            action: undefined,
            to: '',
            href: '/data/portfolio-reconcile-group'
          },
          {
            key: 'Reconcile',
            label: 'Portfolio Reconciliation',
            action: undefined,
            href: '',
            to: '/reconcile'
          },
          {
            key: 'Reconciliation-History',
            label: 'Reconciliation History',
            action: undefined,
            to: '',
            href: '/data/portfolio-reconcile-history'
          }
        ]
      },
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
        key: 'Portfolio-History',
        label: 'Portfolio History',
        action: undefined,
        to: '',
        href: '/data/portfolio-history'
      },
      {
        key: 'prices',
        label: 'Prices',
        action: undefined,
        to: '',
        href: '/data/price-history'
      },
      {
        key: 'FX-Rates',
        label: 'FX Rates',
        action: undefined,
        to: '',
        href: '/data/currency-history'
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
    key: 'data',
    label: 'Data',
    icon: 'mdi-file-tree-outline',
    action: undefined,
    to: '',
    href: '',
    children: [
      {
        key: 'instruments',
        label: 'Instruments',
        action: undefined,
        to: '',
        href: '/data/instrument'
      },
      {
        key: 'registers',
        label: 'Registers',
        action: undefined,
        to: '',
        href: '/data/portfolio-register'
      },
      {
        key: 'portfolios',
        label: 'Portfolios',
        action: undefined,
        to: '',
        href: '/data/portfolio'
      },

      {
        key: 'accounts',
        label: 'Accounts',
        action: undefined,
        to: '',
        href: '/data/account'
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
      },
      {
        key: 'responsibles',
        label: 'Responsibles',
        action: undefined,
        to: '',
        href: '/data/responsible'
      },
      {
        key: 'counterparties',
        label: 'Counterparties',
        action: undefined,
        to: '',
        href: '/data/counterparty'
      },
      {
        key: 'Client-Entity',
        label: 'Client Entities',
        action: undefined,
        to: '/settings/client-entity',
        href: ''
      },
      {
        key: 'currencies',
        label: 'Currencies',
        action: undefined,
        to: '',
        href: '/data/currency'
      },

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
        key: 'transactions-from-file',
        label: 'Import Transactions from File',
        action: undefined,
        to: '/system/transaction-import',
        href: ''
      },
      {
        key: 'data-from-file',
        label: 'Import Data from File',
        action: undefined,
        to: '/system/simple-import',
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
    key: 'marketplace',
    label: 'Marketplace',
    action: undefined,
    icon: 'mdi-store-outline',
    to: '/marketplace',
    href: ''
  },
  {
    key: 'initial-member-configuration',
    label: 'Installed New User Setups',
    icon: 'mdi-ballot-outline',
    action: undefined,
    to: '/configuration/initial',
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
        key: 'workflows',
        label: 'Workflows',
        action: undefined,
        relative_link: false,
        to: '',
        href: '',
        children: [
          {
            key: 'Workflow-Dashboard',
            label: 'Workflow Dashboard',
            action: undefined,
            to: '',
            app_code: 'w',
            href: '/workflow'
          },
          {
            key: 'Workflow-Templates',
            label: 'Workflow Templates',
            action: undefined,
            to: '',
            app_code: 'w',
            href: '/workflow-template'
          },
          {
            key: 'Workflow-Schedules',
            label: 'Workflow Schedules',
            action: undefined,
            to: '',
            app_code: 'w',
            href: '/schedule'
          },
          {
            key: 'Workflow-Definitions',
            label: 'Workflow Definitions',
            action: undefined,
            to: '',
            app_code: 'w',
            href: '/home'
          },
        ]
      },
      {
        key: 'layouts',
        label: 'Layouts',
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
            key: 'White-Label',
            label: 'White Label',
            action: undefined,
            to: '/system/settings/general/',
            href: ''
          },
          {
            key: 'Dashboard-Layouts',
            label: 'Dashboard Layouts',
            action: undefined,
            to: '',
            href: '/dashboard-layout/'
          },
          {
            key: 'Entity-Viewer-Layouts',
            label: 'Entity Viewer Layouts',
            action: undefined,
            to: '',
            href: '/settings/layout'
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
        key: 'Default-settings',
        label: 'Default settings',
        action: undefined,
        to: '/settings/default-settings',
        href: ''
      },
      {
        key: 'Data-Settings',
        label: 'Data Settings',
        action: undefined,
        to: '',
        href: '',
        children: [
          {
            key: 'User-Attributes',
            label: 'User Attributes',
            action: undefined,
            to: '/configuration/user-attribute',
            href: ''
          },
          {
            key: 'Transaction-Type-Groups',
            label: 'Transaction Type Groups',
            action: undefined,
            to: '/configuration/transaction-type-group',
            href: ''
          },
          {
            key: 'Templates',
            label: 'Transaction Templates',
            action: undefined,
            to: '',
            href: '/template-layout'
          },
          {
            key: 'Transaction-Types',
            label: 'Transaction Types',
            action: undefined,
            to: '',
            href: '/data/transaction-type'
          },
          {
            key: 'Instrument-Types',
            label: 'Instrument Types',
            action: undefined,
            to: '',
            href: '/data/instrument-type'
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
          },
          {
            key: 'Account-Types',
            label: 'Account Types',
            action: undefined,
            to: '',
            href: '/data/account-type'
          }
        ]
      },
      {
        key: 'Specifications',
        label: 'Data References',
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
            key: 'Reference-Tables',
            label: 'Dropdown Values',
            action: undefined,
            to: '/configuration/reference-table',
            href: ''
          },
          {
            key: 'Mapping-Tables',
            label: 'Lookup Mappings',
            action: undefined,
            to: '',
            href: '/import/mapping-tables-import'
          }
        ]
      },
      {
        key: 'Pricing-Policies',
        label: 'Pricing Policies',
        action: undefined,
        to: '/data/pricing-policy',
        href: ''
      },
      {
        key: 'Import-schemes',
        label: 'Import Schemes',
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
        key: 'code-editor',
        label: 'Code editor',
        action: undefined,
        to: '',
        href: '/editor'
      },
      {
        key: 'Configuration',
        label: 'Add-ons Control',
        action: undefined,
        to: '',
        href: '',
        children: [
          {
            key: 'Manage',
            label: 'Manage Add-ons',
            action: undefined,
            to: '/configuration/manage-configuration',
            href: ''
          },
          {
            key: 'Import',
            label: 'Import Add-ons',
            action: undefined,
            to: '/configuration/import',
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
            label: 'Access Policies',
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
          // {
          //   key: 'navigation',
          //   label: 'Navigation',
          //   action: undefined,
          //   href: '',
          //   to: '/system/iam/navigation'
          // }
        ]
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
        label: 'Workspace Settings',
        action: undefined,
        to: '/system/dashboard',
        href: ''
      },
      {
        key: 'Vault-Record',
        label: 'Finmars Vault',
        action: undefined,
        to: '/settings/vault-record',
        href: ''
      },
      {
        key: 'journal',
        label: 'Journal',
        action: undefined,
        to: '',
        href: '/journal'
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
            label: 'Balance Report Instances',
            action: undefined,
            to: '',
            href: '/balance-report-instance'
          },
          {
            key: 'P&L-Report-Instance',
            label: 'P&L Report Instances',
            action: undefined,
            to: '',
            href: '/pl-report-instance'
          }
        ]
      },
    ]
  }
];
