import cloneDeep from 'lodash/cloneDeep';

export const presetFilters = [
	{
		content_type: 'portfolios.portfolio',
		key: 'portfolio.user_code',
		layout_name: 'Portfolio',
		name: 'Portfolio. User code',
		options: {
			enabled: true,
			exclude_empty_cells: false,
			filter_type: 'contains',
			filter_values: [],
			use_from_above: {
				attrs_entity_type: 'balance-report',
				key: 'portfolio.user_code'
			}
		},
		value_type: 10
	},
	{
		content_type: 'accounts.account',
		key: 'account.user_code',
		layout_name: 'Account',
		name: 'Account. User code',
		options: {
			enabled: true,
			exclude_empty_cells: false,
			filter_type: 'equal',
			filter_values: [],
			use_from_above: {
				attrs_entity_type: 'balance-report',
				key: 'account.user_code'
			}
		},
		value_type: 10
	},
	{
		content_type: 'currencies.currency',
		key: 'pricing_currency.user_code',
		layout_name: 'Pricing Currency',
		name: 'Balance. Pricing Currency. User code',
		options: {
			enabled: true,
			exclude_empty_cells: false,
			filter_type: 'equal',
			filter_values: [],
			use_from_above: {
				attrs_entity_type: 'balance-report',
				key: 'pricing_currency.user_code'
			}
		},
		value_type: 10
	}
];

export const mockData = {
	selectedAttributes: ['portfolio.user_code', 'account.user_code', 'pricing_currency.user_code'],
	favoriteAttributes: [],
	title: 'Add filters',
	attributes: [
		{
			key: 'name',
			name: 'Balance. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'short_name',
			name: 'Balance. Short name',
			value_type: 10,
			description: '',
			layout_name: 'Instrument/CCY'
		},
		{
			key: 'user_code',
			name: 'Balance. User code',
			value_type: 10,
			description: '',
			layout_name: 'Balance UC'
		},
		{
			key: 'item_type_name',
			name: 'Balance. Item Type',
			value_type: 10,
			description: ''
		},
		{
			key: 'fx_rate',
			name: 'Balance. FX Rate',
			value_type: 20,
			description: '',
			layout_name: 'FX Rate'
		},
		{
			key: 'position_size',
			name: 'Balance. Position size',
			value_type: 20,
			description: 'Some description',
			layout_name: 'Position size'
		},
		{
			key: 'nominal_position_size',
			name: 'Balance. Nominal Position size',
			value_type: 20,
			description: '',
			layout_name: 'Nominal Position size'
		},
		{
			key: 'pricing_currency.id',
			name: 'Balance. Pricing Currency. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'pricing_currency.name',
			name: 'Balance. Pricing Currency. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'pricing_currency.short_name',
			name: 'Balance. Pricing Currency. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'pricing_currency.user_code',
			name: 'Balance. Pricing Currency. User code',
			value_type: 10,
			description: '',
			layout_name: 'Pricing Currency'
		},
		{
			key: 'pricing_currency.public_name',
			name: 'Balance. Pricing Currency. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'pricing_currency.notes',
			name: 'Balance. Pricing Currency. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'pricing_currency.reference_for_pricing',
			name: 'Balance. Pricing Currency. Reference for pricing',
			value_type: 10,
			description: ''
		},
		{
			key: 'pricing_currency.default_fx_rate',
			name: 'Balance. Pricing Currency. Default FX rate',
			value_type: 20,
			description: ''
		},
		{
			key: 'pricing_currency.created_at',
			name: 'Balance. Pricing Currency. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'pricing_currency.modified_at',
			name: 'Balance. Pricing Currency. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'pricing_currency.deleted_at',
			name: 'Balance. Pricing Currency. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'instrument_pricing_currency_fx_rate',
			name: 'Balance. Pricing currency fx rate',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument_accrued_currency_fx_rate',
			name: 'Balance. Accrued currency fx rate',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument_accrual_object_accrual_size',
			name: 'Balance. Current Payment Size',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument_accrual_object_periodicity_object_name',
			name: 'Balance. Current Payment Frequency',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument_accrual_object_periodicity_n',
			name: 'Balance. Current Payment Periodicity N',
			value_type: 20,
			description: ''
		},
		{
			key: 'date',
			name: 'Balance. Date',
			value_type: 40,
			description: ''
		},
		{
			key: 'ytm',
			name: 'Balance. YTM',
			value_type: 20,
			description: ''
		},
		{
			key: 'modified_duration',
			name: 'Balance. Modified duration',
			value_type: 20,
			description: '',
			layout_name: 'Modified duration'
		},
		{
			key: 'last_notes',
			name: 'Balance. Last notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'gross_cost_price_loc',
			name: 'Balance. Gross cost price (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'ytm_at_cost',
			name: 'Balance. YTM at cost',
			value_type: 20,
			description: ''
		},
		{
			key: 'time_invested',
			name: 'Balance. Time invested',
			value_type: 20,
			description: ''
		},
		{
			key: 'return_annually',
			name: 'Balance. Return annually',
			value_type: 20,
			description: ''
		},
		{
			key: 'return_annually_fixed',
			name: 'Balance. Return Annually Fixed',
			value_type: 20,
			description: ''
		},
		{
			key: 'net_cost_price_loc',
			name: 'Balance. Net cost price (Pricing Currency)',
			value_type: 20,
			description: '',
			layout_name: 'Cost'
		},
		{
			key: 'exposure_currency.id',
			name: 'Balance.  Exposure Currency. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'exposure_currency.name',
			name: 'Balance.  Exposure Currency. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'exposure_currency.short_name',
			name: 'Balance.  Exposure Currency. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'exposure_currency.user_code',
			name: 'Balance.  Exposure Currency. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'exposure_currency.public_name',
			name: 'Balance.  Exposure Currency. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'exposure_currency.notes',
			name: 'Balance.  Exposure Currency. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'exposure_currency.reference_for_pricing',
			name: 'Balance.  Exposure Currency. Reference for pricing',
			value_type: 10,
			description: ''
		},
		{
			key: 'exposure_currency.default_fx_rate',
			name: 'Balance.  Exposure Currency. Default FX rate',
			value_type: 20,
			description: ''
		},
		{
			key: 'exposure_currency.created_at',
			name: 'Balance.  Exposure Currency. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'exposure_currency.modified_at',
			name: 'Balance.  Exposure Currency. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'exposure_currency.deleted_at',
			name: 'Balance.  Exposure Currency. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'principal_invested',
			name: 'Balance. Principal invested',
			value_type: 20,
			description: ''
		},
		{
			key: 'principal_invested_loc',
			name: 'Balance. Principal invested (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'amount_invested',
			name: 'Balance. Amount invested',
			value_type: 20,
			description: ''
		},
		{
			key: 'amount_invested_loc',
			name: 'Balance. Amount invested (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'principal_invested_fixed',
			name: 'Balance. Principal invested Fixed',
			value_type: 20,
			description: ''
		},
		{
			key: 'principal_invested_fixed_loc',
			name: 'Balance. Principal invested Fixed (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'amount_invested_fixed',
			name: 'Balance. Amount invested Fixed',
			value_type: 20,
			description: ''
		},
		{
			key: 'amount_invested_fixed_loc',
			name: 'Balance. Amount invested Fixed (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'market_value',
			name: 'Balance. Market value',
			value_type: 20,
			description: '',
			layout_name: 'Market value'
		},
		{
			key: 'market_value_loc',
			name: 'Balance. Market value (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'market_value_percent',
			name: 'Balance. Market value %',
			value_type: 20,
			description: '',
			layout_name: 'MV%'
		},
		{
			key: 'exposure',
			name: 'Balance. Exposure',
			value_type: 20,
			description: ''
		},
		{
			key: 'exposure_percent',
			name: 'Balance. Exposure %',
			value_type: 20,
			description: ''
		},
		{
			key: 'exposure_loc',
			name: 'Balance. Exposure (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument_principal_price',
			name: 'Balance. Current Price',
			value_type: 20,
			description: '',
			layout_name: 'Current Price'
		},
		{
			key: 'instrument_accrued_price',
			name: 'Balance. Current Accrued',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument_factor',
			name: 'Balance. Factor',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument_ytm',
			name: 'Balance. Current YTM',
			value_type: 20,
			description: ''
		},
		{
			key: 'detail',
			name: 'Balance. Transaction Detail',
			value_type: 10,
			description: ''
		},
		{
			key: 'mismatch',
			name: 'Mismatch. Mismatch',
			value_type: 20,
			description: ''
		},
		{
			key: 'mismatch_portfolio',
			name: 'Mismatch. Mismatch Portfolio',
			value_type: 'field',
			description: ''
		},
		{
			key: 'mismatch_account',
			name: 'Mismatch. Mismatch Account',
			value_type: 'field',
			description: ''
		},
		{
			key: 'net_position_return',
			name: 'Performance. Net position return',
			value_type: 20,
			description: ''
		},
		{
			key: 'net_position_return_loc',
			name: 'Performance. Net position return (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'position_return',
			name: 'Performance. Position return',
			value_type: 20,
			description: ''
		},
		{
			key: 'position_return_loc',
			name: 'Performance. Position return (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'net_position_return_fixed',
			name: 'Performance. Net Position Return Fixed',
			value_type: 20,
			description: ''
		},
		{
			key: 'net_position_return_fixed_loc',
			name: 'Performance. Net Position Return Fixed (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'position_return_fixed',
			name: 'Performance. Position Return Fixed',
			value_type: 20,
			description: ''
		},
		{
			key: 'position_return_fixed_loc',
			name: 'Performance. Position Return Fixed (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'daily_price_change',
			name: 'Performance. Daily price change',
			value_type: 20,
			description: ''
		},
		{
			key: 'mtd_price_change',
			name: 'Performance. MTD price change',
			value_type: 20,
			description: ''
		},
		{
			key: 'principal_fx',
			name: 'Performance. Principal FX',
			value_type: 20,
			description: ''
		},
		{
			key: 'principal_fx_loc',
			name: 'Performance. Principal FX (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'principal_fixed',
			name: 'Performance. Principal fixed',
			value_type: 20,
			description: ''
		},
		{
			key: 'principal_fixed_loc',
			name: 'Performance. Principal fixed (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'carry_fx',
			name: 'Performance. Carry FX',
			value_type: 20,
			description: ''
		},
		{
			key: 'carry_fx_loc',
			name: 'Performance. Carry FX (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'carry_fixed',
			name: 'Performance. Carry fixed',
			value_type: 20,
			description: ''
		},
		{
			key: 'carry_fixed_loc',
			name: 'Performance. Carry fixed (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'overheads_fx',
			name: 'Performance. Overheads FX',
			value_type: 20,
			description: ''
		},
		{
			key: 'overheads_fx_loc',
			name: 'Performance. Overheads FX (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'overheads_fixed',
			name: 'Performance. Overheads fixed',
			value_type: 20,
			description: ''
		},
		{
			key: 'overheads_fixed_loc',
			name: 'Performance. Overheads fixed (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'principal',
			name: 'Performance. Principal',
			value_type: 20,
			description: ''
		},
		{
			key: 'carry',
			name: 'Performance. Carry',
			value_type: 20,
			description: '',
			layout_name: 'Carry'
		},
		{
			key: 'overheads',
			name: 'Performance. Overheads',
			value_type: 20,
			description: ''
		},
		{
			key: 'total',
			name: 'Performance. Total',
			value_type: 20,
			description: ''
		},
		{
			key: 'principal_loc',
			name: 'Performance. Pricnipal (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'carry_loc',
			name: 'Performance. Carry (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'overheads_loc',
			name: 'Performance. Overheads (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'total_loc',
			name: 'Performance. Total (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'total_fx',
			name: 'Performance. Total FX',
			value_type: 20,
			description: ''
		},
		{
			key: 'total_fx_loc',
			name: 'Performance. Total FX (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'total_fixed',
			name: 'Performance. Total fixed',
			value_type: 20,
			description: ''
		},
		{
			key: 'total_fixed_loc',
			name: 'Performance. Total fixed (Pricing Currency)',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.id',
			name: 'Allocation. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.name',
			name: 'Allocation. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.short_name',
			name: 'Allocation. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.user_code',
			name: 'Allocation. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.public_name',
			name: 'Allocation. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.notes',
			name: 'Allocation. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.instrument_type.id',
			name: 'Allocation. Instrument type. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.instrument_type.name',
			name: 'Allocation. Instrument type. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.instrument_type.short_name',
			name: 'Allocation. Instrument type. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.instrument_type.user_code',
			name: 'Allocation. Instrument type. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.instrument_type.configuration_code',
			name: 'Allocation. Instrument type. Configuration code',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.instrument_type.public_name',
			name: 'Allocation. Instrument type. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.instrument_type.notes',
			name: 'Allocation. Instrument type. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.instrument_type.is_active',
			name: 'Allocation. Instrument type. Is active',
			value_type: 50,
			description: ''
		},
		{
			key: 'allocation.instrument_type.has_second_exposure_currency',
			name: 'Allocation. Instrument type. Has second exposure currency',
			value_type: 50,
			description: ''
		},
		{
			key: 'allocation.instrument_type.underlying_long_multiplier',
			name: 'Allocation. Instrument type. Underlying long multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.instrument_type.underlying_short_multiplier',
			name: 'Allocation. Instrument type. Underlying short multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.instrument_type.long_underlying_exposure',
			name: 'Allocation. Instrument type. Long Underlying Exposure',
			value_type: 'field',
			description: ''
		},
		{
			key: 'allocation.instrument_type.short_underlying_exposure',
			name: 'Allocation. Instrument type. Short Underlying Exposure',
			value_type: 'field',
			description: ''
		},
		{
			key: 'allocation.instrument_type.exposure_calculation_model',
			name: 'Allocation. Instrument type. Exposure Calculation Model',
			value_type: 'field',
			description: ''
		},
		{
			key: 'allocation.instrument_type.long_underlying_instrument',
			name: 'Allocation. Instrument type. Long Underlying Instrument',
			value_type: 'field',
			description: ''
		},
		{
			key: 'allocation.instrument_type.short_underlying_instrument',
			name: 'Allocation. Instrument type. Short Underlying Instrument',
			value_type: 'field',
			description: ''
		},
		{
			key: 'allocation.instrument_type.accrued_multiplier',
			name: 'Allocation. Instrument type. Accrued multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.instrument_type.default_accrued',
			name: 'Allocation. Instrument type. Default accrued',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.instrument_type.default_price',
			name: 'Allocation. Instrument type. Default price',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.instrument_type.maturity_date',
			name: 'Allocation. Instrument type. Maturity date',
			value_type: 40,
			description: ''
		},
		{
			key: 'allocation.instrument_type.maturity_price',
			name: 'Allocation. Instrument type. Maturity price',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.instrument_type.created_at',
			name: 'Allocation. Instrument type. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'allocation.instrument_type.modified_at',
			name: 'Allocation. Instrument type. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'allocation.instrument_type.deleted_at',
			name: 'Allocation. Instrument type. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'allocation.is_active',
			name: 'Allocation. Is active',
			value_type: 50,
			description: ''
		},
		{
			key: 'allocation.has_linked_with_portfolio',
			name: 'Allocation. Has linked with portfolio',
			value_type: 50,
			description: ''
		},
		{
			key: 'allocation.reference_for_pricing',
			name: 'Allocation. Reference for pricing',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.pricing_currency.id',
			name: 'Allocation. Pricing currency. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.pricing_currency.name',
			name: 'Allocation. Pricing currency. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.pricing_currency.short_name',
			name: 'Allocation. Pricing currency. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.pricing_currency.user_code',
			name: 'Allocation. Pricing currency. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.pricing_currency.public_name',
			name: 'Allocation. Pricing currency. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.pricing_currency.notes',
			name: 'Allocation. Pricing currency. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.pricing_currency.reference_for_pricing',
			name: 'Allocation. Pricing currency. Reference for pricing',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.pricing_currency.default_fx_rate',
			name: 'Allocation. Pricing currency. Default FX rate',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.pricing_currency.created_at',
			name: 'Allocation. Pricing currency. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'allocation.pricing_currency.modified_at',
			name: 'Allocation. Pricing currency. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'allocation.pricing_currency.deleted_at',
			name: 'Allocation. Pricing currency. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'allocation.price_multiplier',
			name: 'Allocation. Price multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.position_reporting',
			name: 'Allocation. Position reporting',
			value_type: 'field',
			description: ''
		},
		{
			key: 'allocation.accrued_currency.id',
			name: 'Allocation. Accrued currency. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.accrued_currency.name',
			name: 'Allocation. Accrued currency. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.accrued_currency.short_name',
			name: 'Allocation. Accrued currency. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.accrued_currency.user_code',
			name: 'Allocation. Accrued currency. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.accrued_currency.public_name',
			name: 'Allocation. Accrued currency. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.accrued_currency.notes',
			name: 'Allocation. Accrued currency. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.accrued_currency.reference_for_pricing',
			name: 'Allocation. Accrued currency. Reference for pricing',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.accrued_currency.default_fx_rate',
			name: 'Allocation. Accrued currency. Default FX rate',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.accrued_currency.created_at',
			name: 'Allocation. Accrued currency. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'allocation.accrued_currency.modified_at',
			name: 'Allocation. Accrued currency. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'allocation.accrued_currency.deleted_at',
			name: 'Allocation. Accrued currency. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'allocation.maturity_date',
			name: 'Allocation. Maturity date',
			value_type: 40,
			description: ''
		},
		{
			key: 'allocation.maturity_price',
			name: 'Allocation. Maturity price',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.accrued_multiplier',
			name: 'Allocation. Accrued multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.default_price',
			name: 'Allocation. Default price',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.default_accrued',
			name: 'Allocation. Default accrued',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.user_text_1',
			name: 'Allocation. User text 1',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.user_text_2',
			name: 'Allocation. User text 2',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.user_text_3',
			name: 'Allocation. User text 3',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.underlying_long_multiplier',
			name: 'Allocation. Underlying long multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.underlying_short_multiplier',
			name: 'Allocation. Underlying short multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.co_directional_exposure_currency.id',
			name: 'Allocation. Exposure Co-Directional Currency. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.co_directional_exposure_currency.name',
			name: 'Allocation. Exposure Co-Directional Currency. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.co_directional_exposure_currency.short_name',
			name: 'Allocation. Exposure Co-Directional Currency. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.co_directional_exposure_currency.user_code',
			name: 'Allocation. Exposure Co-Directional Currency. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.co_directional_exposure_currency.public_name',
			name: 'Allocation. Exposure Co-Directional Currency. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.co_directional_exposure_currency.notes',
			name: 'Allocation. Exposure Co-Directional Currency. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.co_directional_exposure_currency.reference_for_pricing',
			name: 'Allocation. Exposure Co-Directional Currency. Reference for pricing',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.co_directional_exposure_currency.default_fx_rate',
			name: 'Allocation. Exposure Co-Directional Currency. Default FX rate',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.co_directional_exposure_currency.created_at',
			name: 'Allocation. Exposure Co-Directional Currency. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'allocation.co_directional_exposure_currency.modified_at',
			name: 'Allocation. Exposure Co-Directional Currency. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'allocation.co_directional_exposure_currency.deleted_at',
			name: 'Allocation. Exposure Co-Directional Currency. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'allocation.counter_directional_exposure_currency.id',
			name: 'Allocation. Exposure Counter-Directional Currency. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.counter_directional_exposure_currency.name',
			name: 'Allocation. Exposure Counter-Directional Currency. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.counter_directional_exposure_currency.short_name',
			name: 'Allocation. Exposure Counter-Directional Currency. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.counter_directional_exposure_currency.user_code',
			name: 'Allocation. Exposure Counter-Directional Currency. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.counter_directional_exposure_currency.public_name',
			name: 'Allocation. Exposure Counter-Directional Currency. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.counter_directional_exposure_currency.notes',
			name: 'Allocation. Exposure Counter-Directional Currency. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.counter_directional_exposure_currency.reference_for_pricing',
			name: 'Allocation. Exposure Counter-Directional Currency. Reference for pricing',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.counter_directional_exposure_currency.default_fx_rate',
			name: 'Allocation. Exposure Counter-Directional Currency. Default FX rate',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.counter_directional_exposure_currency.created_at',
			name: 'Allocation. Exposure Counter-Directional Currency. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'allocation.counter_directional_exposure_currency.modified_at',
			name: 'Allocation. Exposure Counter-Directional Currency. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'allocation.counter_directional_exposure_currency.deleted_at',
			name: 'Allocation. Exposure Counter-Directional Currency. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'allocation.long_underlying_exposure',
			name: 'Allocation. Long Underlying Exposure',
			value_type: 'field',
			description: ''
		},
		{
			key: 'allocation.short_underlying_exposure',
			name: 'Allocation. Short Underlying Exposure',
			value_type: 'field',
			description: ''
		},
		{
			key: 'allocation.exposure_calculation_model',
			name: 'Allocation. Exposure Calculation Model',
			value_type: 'field',
			description: ''
		},
		{
			key: 'allocation.long_underlying_instrument',
			name: 'Allocation. Long Underlying Instrument',
			value_type: 'field',
			description: ''
		},
		{
			key: 'allocation.short_underlying_instrument',
			name: 'Allocation. Short Underlying Instrument',
			value_type: 'field',
			description: ''
		},
		{
			key: 'allocation.country.id',
			name: 'Allocation. Country. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'allocation.country.name',
			name: 'Allocation. Country. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.country.user_code',
			name: 'Allocation. Country. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.country.country_code',
			name: 'Allocation. Country. Country Code',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.country.region',
			name: 'Allocation. Country. Region',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.country.region_code',
			name: 'Allocation. Country. Region Code',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.country.sub_region',
			name: 'Allocation. Country. Sub Region',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.country.sub_region_code',
			name: 'Allocation. Country. Sub Region Code',
			value_type: 10,
			description: ''
		},
		{
			key: 'allocation.identifier',
			name: 'Allocation. Identifier',
			value_type: 'json',
			description: ''
		},
		{
			key: 'allocation.first_transaction_date',
			name: 'Allocation. First Transaction Date',
			value_type: 40,
			description: ''
		},
		{
			key: 'allocation.created_at',
			name: 'Allocation. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'allocation.modified_at',
			name: 'Allocation. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'allocation.deleted_at',
			name: 'Allocation. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'instrument.id',
			name: 'Instrument. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.name',
			name: 'Instrument. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.short_name',
			name: 'Instrument. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.user_code',
			name: 'Instrument. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.public_name',
			name: 'Instrument. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.notes',
			name: 'Instrument. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.instrument_type.id',
			name: 'Instrument. Instrument type. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.instrument_type.name',
			name: 'Instrument. Instrument type. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.instrument_type.short_name',
			name: 'Instrument. Instrument type. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.instrument_type.user_code',
			name: 'Instrument. Instrument type. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.instrument_type.configuration_code',
			name: 'Instrument. Instrument type. Configuration code',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.instrument_type.public_name',
			name: 'Instrument. Instrument type. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.instrument_type.notes',
			name: 'Instrument. Instrument type. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.instrument_type.is_active',
			name: 'Instrument. Instrument type. Is active',
			value_type: 50,
			description: ''
		},
		{
			key: 'instrument.instrument_type.has_second_exposure_currency',
			name: 'Instrument. Instrument type. Has second exposure currency',
			value_type: 50,
			description: ''
		},
		{
			key: 'instrument.instrument_type.underlying_long_multiplier',
			name: 'Instrument. Instrument type. Underlying long multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.instrument_type.underlying_short_multiplier',
			name: 'Instrument. Instrument type. Underlying short multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.instrument_type.long_underlying_exposure',
			name: 'Instrument. Instrument type. Long Underlying Exposure',
			value_type: 'field',
			description: ''
		},
		{
			key: 'instrument.instrument_type.short_underlying_exposure',
			name: 'Instrument. Instrument type. Short Underlying Exposure',
			value_type: 'field',
			description: ''
		},
		{
			key: 'instrument.instrument_type.exposure_calculation_model',
			name: 'Instrument. Instrument type. Exposure Calculation Model',
			value_type: 'field',
			description: ''
		},
		{
			key: 'instrument.instrument_type.long_underlying_instrument',
			name: 'Instrument. Instrument type. Long Underlying Instrument',
			value_type: 'field',
			description: ''
		},
		{
			key: 'instrument.instrument_type.short_underlying_instrument',
			name: 'Instrument. Instrument type. Short Underlying Instrument',
			value_type: 'field',
			description: ''
		},
		{
			key: 'instrument.instrument_type.accrued_multiplier',
			name: 'Instrument. Instrument type. Accrued multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.instrument_type.default_accrued',
			name: 'Instrument. Instrument type. Default accrued',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.instrument_type.default_price',
			name: 'Instrument. Instrument type. Default price',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.instrument_type.maturity_date',
			name: 'Instrument. Instrument type. Maturity date',
			value_type: 40,
			description: ''
		},
		{
			key: 'instrument.instrument_type.maturity_price',
			name: 'Instrument. Instrument type. Maturity price',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.instrument_type.created_at',
			name: 'Instrument. Instrument type. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'instrument.instrument_type.modified_at',
			name: 'Instrument. Instrument type. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'instrument.instrument_type.deleted_at',
			name: 'Instrument. Instrument type. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'instrument.is_active',
			name: 'Instrument. Is active',
			value_type: 50,
			description: ''
		},
		{
			key: 'instrument.has_linked_with_portfolio',
			name: 'Instrument. Has linked with portfolio',
			value_type: 50,
			description: ''
		},
		{
			key: 'instrument.reference_for_pricing',
			name: 'Instrument. Reference for pricing',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.pricing_currency.id',
			name: 'Instrument. Pricing currency. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.pricing_currency.name',
			name: 'Instrument. Pricing currency. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.pricing_currency.short_name',
			name: 'Instrument. Pricing currency. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.pricing_currency.user_code',
			name: 'Instrument. Pricing currency. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.pricing_currency.public_name',
			name: 'Instrument. Pricing currency. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.pricing_currency.notes',
			name: 'Instrument. Pricing currency. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.pricing_currency.reference_for_pricing',
			name: 'Instrument. Pricing currency. Reference for pricing',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.pricing_currency.default_fx_rate',
			name: 'Instrument. Pricing currency. Default FX rate',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.pricing_currency.created_at',
			name: 'Instrument. Pricing currency. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'instrument.pricing_currency.modified_at',
			name: 'Instrument. Pricing currency. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'instrument.pricing_currency.deleted_at',
			name: 'Instrument. Pricing currency. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'instrument.price_multiplier',
			name: 'Instrument. Price multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.position_reporting',
			name: 'Instrument. Position reporting',
			value_type: 'field',
			description: ''
		},
		{
			key: 'instrument.accrued_currency.id',
			name: 'Instrument. Accrued currency. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.accrued_currency.name',
			name: 'Instrument. Accrued currency. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.accrued_currency.short_name',
			name: 'Instrument. Accrued currency. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.accrued_currency.user_code',
			name: 'Instrument. Accrued currency. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.accrued_currency.public_name',
			name: 'Instrument. Accrued currency. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.accrued_currency.notes',
			name: 'Instrument. Accrued currency. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.accrued_currency.reference_for_pricing',
			name: 'Instrument. Accrued currency. Reference for pricing',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.accrued_currency.default_fx_rate',
			name: 'Instrument. Accrued currency. Default FX rate',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.accrued_currency.created_at',
			name: 'Instrument. Accrued currency. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'instrument.accrued_currency.modified_at',
			name: 'Instrument. Accrued currency. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'instrument.accrued_currency.deleted_at',
			name: 'Instrument. Accrued currency. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'instrument.maturity_date',
			name: 'Instrument. Maturity date',
			value_type: 40,
			description: ''
		},
		{
			key: 'instrument.maturity_price',
			name: 'Instrument. Maturity price',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.accrued_multiplier',
			name: 'Instrument. Accrued multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.default_price',
			name: 'Instrument. Default price',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.default_accrued',
			name: 'Instrument. Default accrued',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.user_text_1',
			name: 'Instrument. User text 1',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.user_text_2',
			name: 'Instrument. User text 2',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.user_text_3',
			name: 'Instrument. User text 3',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.underlying_long_multiplier',
			name: 'Instrument. Underlying long multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.underlying_short_multiplier',
			name: 'Instrument. Underlying short multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.co_directional_exposure_currency.id',
			name: 'Instrument. Exposure Co-Directional Currency. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.co_directional_exposure_currency.name',
			name: 'Instrument. Exposure Co-Directional Currency. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.co_directional_exposure_currency.short_name',
			name: 'Instrument. Exposure Co-Directional Currency. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.co_directional_exposure_currency.user_code',
			name: 'Instrument. Exposure Co-Directional Currency. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.co_directional_exposure_currency.public_name',
			name: 'Instrument. Exposure Co-Directional Currency. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.co_directional_exposure_currency.notes',
			name: 'Instrument. Exposure Co-Directional Currency. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.co_directional_exposure_currency.reference_for_pricing',
			name: 'Instrument. Exposure Co-Directional Currency. Reference for pricing',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.co_directional_exposure_currency.default_fx_rate',
			name: 'Instrument. Exposure Co-Directional Currency. Default FX rate',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.co_directional_exposure_currency.created_at',
			name: 'Instrument. Exposure Co-Directional Currency. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'instrument.co_directional_exposure_currency.modified_at',
			name: 'Instrument. Exposure Co-Directional Currency. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'instrument.co_directional_exposure_currency.deleted_at',
			name: 'Instrument. Exposure Co-Directional Currency. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'instrument.counter_directional_exposure_currency.id',
			name: 'Instrument. Exposure Counter-Directional Currency. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.counter_directional_exposure_currency.name',
			name: 'Instrument. Exposure Counter-Directional Currency. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.counter_directional_exposure_currency.short_name',
			name: 'Instrument. Exposure Counter-Directional Currency. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.counter_directional_exposure_currency.user_code',
			name: 'Instrument. Exposure Counter-Directional Currency. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.counter_directional_exposure_currency.public_name',
			name: 'Instrument. Exposure Counter-Directional Currency. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.counter_directional_exposure_currency.notes',
			name: 'Instrument. Exposure Counter-Directional Currency. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.counter_directional_exposure_currency.reference_for_pricing',
			name: 'Instrument. Exposure Counter-Directional Currency. Reference for pricing',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.counter_directional_exposure_currency.default_fx_rate',
			name: 'Instrument. Exposure Counter-Directional Currency. Default FX rate',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.counter_directional_exposure_currency.created_at',
			name: 'Instrument. Exposure Counter-Directional Currency. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'instrument.counter_directional_exposure_currency.modified_at',
			name: 'Instrument. Exposure Counter-Directional Currency. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'instrument.counter_directional_exposure_currency.deleted_at',
			name: 'Instrument. Exposure Counter-Directional Currency. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'instrument.long_underlying_exposure',
			name: 'Instrument. Long Underlying Exposure',
			value_type: 'field',
			description: ''
		},
		{
			key: 'instrument.short_underlying_exposure',
			name: 'Instrument. Short Underlying Exposure',
			value_type: 'field',
			description: ''
		},
		{
			key: 'instrument.exposure_calculation_model',
			name: 'Instrument. Exposure Calculation Model',
			value_type: 'field',
			description: ''
		},
		{
			key: 'instrument.long_underlying_instrument',
			name: 'Instrument. Long Underlying Instrument',
			value_type: 'field',
			description: ''
		},
		{
			key: 'instrument.short_underlying_instrument',
			name: 'Instrument. Short Underlying Instrument',
			value_type: 'field',
			description: ''
		},
		{
			key: 'instrument.country.id',
			name: 'Instrument. Country. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.country.name',
			name: 'Instrument. Country. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.country.user_code',
			name: 'Instrument. Country. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.country.country_code',
			name: 'Instrument. Country. Country Code',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.country.region',
			name: 'Instrument. Country. Region',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.country.region_code',
			name: 'Instrument. Country. Region Code',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.country.sub_region',
			name: 'Instrument. Country. Sub Region',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.country.sub_region_code',
			name: 'Instrument. Country. Sub Region Code',
			value_type: 10,
			description: ''
		},
		{
			key: 'instrument.identifier',
			name: 'Instrument. Identifier',
			value_type: 'json',
			description: ''
		},
		{
			key: 'instrument.first_transaction_date',
			name: 'Instrument. First Transaction Date',
			value_type: 40,
			description: ''
		},
		{
			key: 'instrument.created_at',
			name: 'Instrument. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'instrument.modified_at',
			name: 'Instrument. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'instrument.deleted_at',
			name: 'Instrument. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'linked_instrument.id',
			name: 'Linked Instrument. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.name',
			name: 'Linked Instrument. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.short_name',
			name: 'Linked Instrument. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.user_code',
			name: 'Linked Instrument. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.public_name',
			name: 'Linked Instrument. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.notes',
			name: 'Linked Instrument. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.id',
			name: 'Linked Instrument. Instrument type. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.name',
			name: 'Linked Instrument. Instrument type. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.short_name',
			name: 'Linked Instrument. Instrument type. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.user_code',
			name: 'Linked Instrument. Instrument type. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.configuration_code',
			name: 'Linked Instrument. Instrument type. Configuration code',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.public_name',
			name: 'Linked Instrument. Instrument type. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.notes',
			name: 'Linked Instrument. Instrument type. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.is_active',
			name: 'Linked Instrument. Instrument type. Is active',
			value_type: 50,
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.has_second_exposure_currency',
			name: 'Linked Instrument. Instrument type. Has second exposure currency',
			value_type: 50,
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.underlying_long_multiplier',
			name: 'Linked Instrument. Instrument type. Underlying long multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.underlying_short_multiplier',
			name: 'Linked Instrument. Instrument type. Underlying short multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.long_underlying_exposure',
			name: 'Linked Instrument. Instrument type. Long Underlying Exposure',
			value_type: 'field',
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.short_underlying_exposure',
			name: 'Linked Instrument. Instrument type. Short Underlying Exposure',
			value_type: 'field',
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.exposure_calculation_model',
			name: 'Linked Instrument. Instrument type. Exposure Calculation Model',
			value_type: 'field',
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.long_underlying_instrument',
			name: 'Linked Instrument. Instrument type. Long Underlying Instrument',
			value_type: 'field',
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.short_underlying_instrument',
			name: 'Linked Instrument. Instrument type. Short Underlying Instrument',
			value_type: 'field',
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.accrued_multiplier',
			name: 'Linked Instrument. Instrument type. Accrued multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.default_accrued',
			name: 'Linked Instrument. Instrument type. Default accrued',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.default_price',
			name: 'Linked Instrument. Instrument type. Default price',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.maturity_date',
			name: 'Linked Instrument. Instrument type. Maturity date',
			value_type: 40,
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.maturity_price',
			name: 'Linked Instrument. Instrument type. Maturity price',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.created_at',
			name: 'Linked Instrument. Instrument type. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.modified_at',
			name: 'Linked Instrument. Instrument type. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'linked_instrument.instrument_type.deleted_at',
			name: 'Linked Instrument. Instrument type. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'linked_instrument.is_active',
			name: 'Linked Instrument. Is active',
			value_type: 50,
			description: ''
		},
		{
			key: 'linked_instrument.has_linked_with_portfolio',
			name: 'Linked Instrument. Has linked with portfolio',
			value_type: 50,
			description: ''
		},
		{
			key: 'linked_instrument.reference_for_pricing',
			name: 'Linked Instrument. Reference for pricing',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.pricing_currency.id',
			name: 'Linked Instrument. Pricing currency. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.pricing_currency.name',
			name: 'Linked Instrument. Pricing currency. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.pricing_currency.short_name',
			name: 'Linked Instrument. Pricing currency. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.pricing_currency.user_code',
			name: 'Linked Instrument. Pricing currency. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.pricing_currency.public_name',
			name: 'Linked Instrument. Pricing currency. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.pricing_currency.notes',
			name: 'Linked Instrument. Pricing currency. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.pricing_currency.reference_for_pricing',
			name: 'Linked Instrument. Pricing currency. Reference for pricing',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.pricing_currency.default_fx_rate',
			name: 'Linked Instrument. Pricing currency. Default FX rate',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.pricing_currency.created_at',
			name: 'Linked Instrument. Pricing currency. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'linked_instrument.pricing_currency.modified_at',
			name: 'Linked Instrument. Pricing currency. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'linked_instrument.pricing_currency.deleted_at',
			name: 'Linked Instrument. Pricing currency. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'linked_instrument.price_multiplier',
			name: 'Linked Instrument. Price multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.position_reporting',
			name: 'Linked Instrument. Position reporting',
			value_type: 'field',
			description: ''
		},
		{
			key: 'linked_instrument.accrued_currency.id',
			name: 'Linked Instrument. Accrued currency. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.accrued_currency.name',
			name: 'Linked Instrument. Accrued currency. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.accrued_currency.short_name',
			name: 'Linked Instrument. Accrued currency. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.accrued_currency.user_code',
			name: 'Linked Instrument. Accrued currency. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.accrued_currency.public_name',
			name: 'Linked Instrument. Accrued currency. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.accrued_currency.notes',
			name: 'Linked Instrument. Accrued currency. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.accrued_currency.reference_for_pricing',
			name: 'Linked Instrument. Accrued currency. Reference for pricing',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.accrued_currency.default_fx_rate',
			name: 'Linked Instrument. Accrued currency. Default FX rate',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.accrued_currency.created_at',
			name: 'Linked Instrument. Accrued currency. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'linked_instrument.accrued_currency.modified_at',
			name: 'Linked Instrument. Accrued currency. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'linked_instrument.accrued_currency.deleted_at',
			name: 'Linked Instrument. Accrued currency. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'linked_instrument.maturity_date',
			name: 'Linked Instrument. Maturity date',
			value_type: 40,
			description: ''
		},
		{
			key: 'linked_instrument.maturity_price',
			name: 'Linked Instrument. Maturity price',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.accrued_multiplier',
			name: 'Linked Instrument. Accrued multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.default_price',
			name: 'Linked Instrument. Default price',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.default_accrued',
			name: 'Linked Instrument. Default accrued',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.user_text_1',
			name: 'Linked Instrument. User text 1',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.user_text_2',
			name: 'Linked Instrument. User text 2',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.user_text_3',
			name: 'Linked Instrument. User text 3',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.underlying_long_multiplier',
			name: 'Linked Instrument. Underlying long multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.underlying_short_multiplier',
			name: 'Linked Instrument. Underlying short multiplier',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.co_directional_exposure_currency.id',
			name: 'Linked Instrument. Exposure Co-Directional Currency. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.co_directional_exposure_currency.name',
			name: 'Linked Instrument. Exposure Co-Directional Currency. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.co_directional_exposure_currency.short_name',
			name: 'Linked Instrument. Exposure Co-Directional Currency. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.co_directional_exposure_currency.user_code',
			name: 'Linked Instrument. Exposure Co-Directional Currency. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.co_directional_exposure_currency.public_name',
			name: 'Linked Instrument. Exposure Co-Directional Currency. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.co_directional_exposure_currency.notes',
			name: 'Linked Instrument. Exposure Co-Directional Currency. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.co_directional_exposure_currency.reference_for_pricing',
			name: 'Linked Instrument. Exposure Co-Directional Currency. Reference for pricing',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.co_directional_exposure_currency.default_fx_rate',
			name: 'Linked Instrument. Exposure Co-Directional Currency. Default FX rate',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.co_directional_exposure_currency.created_at',
			name: 'Linked Instrument. Exposure Co-Directional Currency. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'linked_instrument.co_directional_exposure_currency.modified_at',
			name: 'Linked Instrument. Exposure Co-Directional Currency. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'linked_instrument.co_directional_exposure_currency.deleted_at',
			name: 'Linked Instrument. Exposure Co-Directional Currency. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'linked_instrument.counter_directional_exposure_currency.id',
			name: 'Linked Instrument. Exposure Counter-Directional Currency. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.counter_directional_exposure_currency.name',
			name: 'Linked Instrument. Exposure Counter-Directional Currency. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.counter_directional_exposure_currency.short_name',
			name: 'Linked Instrument. Exposure Counter-Directional Currency. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.counter_directional_exposure_currency.user_code',
			name: 'Linked Instrument. Exposure Counter-Directional Currency. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.counter_directional_exposure_currency.public_name',
			name: 'Linked Instrument. Exposure Counter-Directional Currency. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.counter_directional_exposure_currency.notes',
			name: 'Linked Instrument. Exposure Counter-Directional Currency. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.counter_directional_exposure_currency.reference_for_pricing',
			name: 'Linked Instrument. Exposure Counter-Directional Currency. Reference for pricing',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.counter_directional_exposure_currency.default_fx_rate',
			name: 'Linked Instrument. Exposure Counter-Directional Currency. Default FX rate',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.counter_directional_exposure_currency.created_at',
			name: 'Linked Instrument. Exposure Counter-Directional Currency. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'linked_instrument.counter_directional_exposure_currency.modified_at',
			name: 'Linked Instrument. Exposure Counter-Directional Currency. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'linked_instrument.counter_directional_exposure_currency.deleted_at',
			name: 'Linked Instrument. Exposure Counter-Directional Currency. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'linked_instrument.long_underlying_exposure',
			name: 'Linked Instrument. Long Underlying Exposure',
			value_type: 'field',
			description: ''
		},
		{
			key: 'linked_instrument.short_underlying_exposure',
			name: 'Linked Instrument. Short Underlying Exposure',
			value_type: 'field',
			description: ''
		},
		{
			key: 'linked_instrument.exposure_calculation_model',
			name: 'Linked Instrument. Exposure Calculation Model',
			value_type: 'field',
			description: ''
		},
		{
			key: 'linked_instrument.long_underlying_instrument',
			name: 'Linked Instrument. Long Underlying Instrument',
			value_type: 'field',
			description: ''
		},
		{
			key: 'linked_instrument.short_underlying_instrument',
			name: 'Linked Instrument. Short Underlying Instrument',
			value_type: 'field',
			description: ''
		},
		{
			key: 'linked_instrument.country.id',
			name: 'Linked Instrument. Country. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'linked_instrument.country.name',
			name: 'Linked Instrument. Country. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.country.user_code',
			name: 'Linked Instrument. Country. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.country.country_code',
			name: 'Linked Instrument. Country. Country Code',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.country.region',
			name: 'Linked Instrument. Country. Region',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.country.region_code',
			name: 'Linked Instrument. Country. Region Code',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.country.sub_region',
			name: 'Linked Instrument. Country. Sub Region',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.country.sub_region_code',
			name: 'Linked Instrument. Country. Sub Region Code',
			value_type: 10,
			description: ''
		},
		{
			key: 'linked_instrument.identifier',
			name: 'Linked Instrument. Identifier',
			value_type: 'json',
			description: ''
		},
		{
			key: 'linked_instrument.first_transaction_date',
			name: 'Linked Instrument. First Transaction Date',
			value_type: 40,
			description: ''
		},
		{
			key: 'linked_instrument.created_at',
			name: 'Linked Instrument. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'linked_instrument.modified_at',
			name: 'Linked Instrument. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'linked_instrument.deleted_at',
			name: 'Linked Instrument. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'currency.id',
			name: 'Currency. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'currency.name',
			name: 'Currency. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'currency.short_name',
			name: 'Currency. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'currency.user_code',
			name: 'Currency. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'currency.public_name',
			name: 'Currency. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'currency.notes',
			name: 'Currency. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'currency.reference_for_pricing',
			name: 'Currency. Reference for pricing',
			value_type: 10,
			description: ''
		},
		{
			key: 'currency.default_fx_rate',
			name: 'Currency. Default FX rate',
			value_type: 20,
			description: ''
		},
		{
			key: 'currency.country.id',
			name: 'Currency. Country. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'currency.country.name',
			name: 'Currency. Country. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'currency.country.user_code',
			name: 'Currency. Country. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'currency.country.country_code',
			name: 'Currency. Country. Country Code',
			value_type: 10,
			description: ''
		},
		{
			key: 'currency.country.region',
			name: 'Currency. Country. Region',
			value_type: 10,
			description: ''
		},
		{
			key: 'currency.country.region_code',
			name: 'Currency. Country. Region Code',
			value_type: 10,
			description: ''
		},
		{
			key: 'currency.country.sub_region',
			name: 'Currency. Country. Sub Region',
			value_type: 10,
			description: ''
		},
		{
			key: 'currency.country.sub_region_code',
			name: 'Currency. Country. Sub Region Code',
			value_type: 10,
			description: ''
		},
		{
			key: 'currency.created_at',
			name: 'Currency. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'currency.modified_at',
			name: 'Currency. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'currency.deleted_at',
			name: 'Currency. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'account.id',
			name: 'Account. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'account.name',
			name: 'Account. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'account.short_name',
			name: 'Account. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'account.user_code',
			name: 'Account. User code',
			value_type: 10,
			description: '',
			layout_name: 'Account'
		},
		{
			key: 'account.public_name',
			name: 'Account. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'account.notes',
			name: 'Account. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'account.type.id',
			name: 'Account. Type. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'account.type.name',
			name: 'Account. Type. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'account.type.short_name',
			name: 'Account. Type. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'account.type.user_code',
			name: 'Account. Type. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'account.type.configuration_code',
			name: 'Account. Type. Configuration code',
			value_type: 10,
			description: ''
		},
		{
			key: 'account.type.public_name',
			name: 'Account. Type. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'account.type.notes',
			name: 'Account. Type. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'account.type.show_transaction_details',
			name: 'Account. Type. Show transaction details',
			value_type: 50,
			description: ''
		},
		{
			key: 'account.type.transaction_details_expr',
			name: 'Account. Type. Transaction details expr',
			value_type: 10,
			description: ''
		},
		{
			key: 'account.type.created_at',
			name: 'Account. Type. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'account.type.modified_at',
			name: 'Account. Type. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'account.type.deleted_at',
			name: 'Account. Type. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'account.created_at',
			name: 'Account. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'account.modified_at',
			name: 'Account. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'account.deleted_at',
			name: 'Account. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'portfolio.id',
			name: 'Portfolio. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'portfolio.name',
			name: 'Portfolio. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'portfolio.short_name',
			name: 'Portfolio. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'portfolio.user_code',
			name: 'Portfolio. User code',
			value_type: 10,
			description: '',
			layout_name: 'Portfolio'
		},
		{
			key: 'portfolio.public_name',
			name: 'Portfolio. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'portfolio.notes',
			name: 'Portfolio. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'portfolio.first_transaction_date',
			name: 'Portfolio. First Transaction Date',
			value_type: 40,
			description: ''
		},
		{
			key: 'portfolio.first_cash_flow_date',
			name: 'Portfolio. First Cash Flow Date',
			value_type: 40,
			description: ''
		},
		{
			key: 'portfolio.portfolio_type.id',
			name: 'Portfolio. Portfolio type. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'portfolio.portfolio_type.name',
			name: 'Portfolio. Portfolio type. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'portfolio.portfolio_type.short_name',
			name: 'Portfolio. Portfolio type. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'portfolio.portfolio_type.user_code',
			name: 'Portfolio. Portfolio type. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'portfolio.portfolio_type.configuration_code',
			name: 'Portfolio. Portfolio type. Configuration code',
			value_type: 10,
			description: ''
		},
		{
			key: 'portfolio.portfolio_type.public_name',
			name: 'Portfolio. Portfolio type. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'portfolio.portfolio_type.notes',
			name: 'Portfolio. Portfolio type. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'portfolio.portfolio_type.is_active',
			name: 'Portfolio. Portfolio type. Is active',
			value_type: 50,
			description: ''
		},
		{
			key: 'portfolio.portfolio_type.created_at',
			name: 'Portfolio. Portfolio type. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'portfolio.portfolio_type.modified_at',
			name: 'Portfolio. Portfolio type. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'portfolio.portfolio_type.deleted_at',
			name: 'Portfolio. Portfolio type. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'portfolio.created_at',
			name: 'Portfolio. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'portfolio.modified_at',
			name: 'Portfolio. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'portfolio.deleted_at',
			name: 'Portfolio. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'strategy1.id',
			name: 'Strategy 1. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'strategy1.name',
			name: 'Strategy 1. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy1.short_name',
			name: 'Strategy 1. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy1.user_code',
			name: 'Strategy 1. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy1.public_name',
			name: 'Strategy 1. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy1.notes',
			name: 'Strategy 1. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy1.subgroup.id',
			name: 'Strategy 1. Group. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'strategy1.subgroup.name',
			name: 'Strategy 1. Group. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy1.subgroup.short_name',
			name: 'Strategy 1. Group. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy1.subgroup.notes',
			name: 'Strategy 1. Group. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy1.subgroup.user_code',
			name: 'Strategy 1. Group. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy1.subgroup.created_at',
			name: 'Strategy 1. Group. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'strategy1.subgroup.modified_at',
			name: 'Strategy 1. Group. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'strategy1.subgroup.deleted_at',
			name: 'Strategy 1. Group. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'strategy1.created_at',
			name: 'Strategy 1. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'strategy1.modified_at',
			name: 'Strategy 1. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'strategy1.deleted_at',
			name: 'Strategy 1. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'strategy2.id',
			name: 'Strategy 2. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'strategy2.name',
			name: 'Strategy 2. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy2.short_name',
			name: 'Strategy 2. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy2.user_code',
			name: 'Strategy 2. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy2.public_name',
			name: 'Strategy 2. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy2.notes',
			name: 'Strategy 2. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy2.subgroup.id',
			name: 'Strategy 2. Group. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'strategy2.subgroup.name',
			name: 'Strategy 2. Group. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy2.subgroup.short_name',
			name: 'Strategy 2. Group. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy2.subgroup.notes',
			name: 'Strategy 2. Group. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy2.subgroup.user_code',
			name: 'Strategy 2. Group. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy2.subgroup.created_at',
			name: 'Strategy 2. Group. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'strategy2.subgroup.modified_at',
			name: 'Strategy 2. Group. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'strategy2.subgroup.deleted_at',
			name: 'Strategy 2. Group. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'strategy2.created_at',
			name: 'Strategy 2. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'strategy2.modified_at',
			name: 'Strategy 2. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'strategy2.deleted_at',
			name: 'Strategy 2. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'strategy3.id',
			name: 'Strategy 3. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'strategy3.name',
			name: 'Strategy 3. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy3.short_name',
			name: 'Strategy 3. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy3.user_code',
			name: 'Strategy 3. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy3.public_name',
			name: 'Strategy 3. Public name',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy3.notes',
			name: 'Strategy 3. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy3.subgroup.id',
			name: 'Strategy 3. Group. ID',
			value_type: 20,
			description: ''
		},
		{
			key: 'strategy3.subgroup.name',
			name: 'Strategy 3. Group. Name',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy3.subgroup.short_name',
			name: 'Strategy 3. Group. Short name',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy3.subgroup.notes',
			name: 'Strategy 3. Group. Notes',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy3.subgroup.user_code',
			name: 'Strategy 3. Group. User code',
			value_type: 10,
			description: ''
		},
		{
			key: 'strategy3.subgroup.created_at',
			name: 'Strategy 3. Group. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'strategy3.subgroup.modified_at',
			name: 'Strategy 3. Group. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'strategy3.subgroup.deleted_at',
			name: 'Strategy 3. Group. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'strategy3.created_at',
			name: 'Strategy 3. Created At',
			value_type: 80,
			description: ''
		},
		{
			key: 'strategy3.modified_at',
			name: 'Strategy 3. Modified At',
			value_type: 80,
			description: ''
		},
		{
			key: 'strategy3.deleted_at',
			name: 'Strategy 3. Delete At',
			value_type: 40,
			description: ''
		},
		{
			key: 'custom_fields.com.finmars.standard-layouts:days_to_maturity',
			name: 'Custom Field. Days to Maturity',
			value_type: 20,
			description: ''
		},
		{
			key: 'custom_fields.com.finmars.standard-layouts:custom_column_asset_type',
			name: 'Custom Field. Asset Type',
			value_type: 10,
			description: '',
			layout_name: 'Asset Type'
		},
		{
			key: 'custom_fields.com.finmars.standard-layouts:collateral_discount',
			name: 'Custom Field. Collateral Discount',
			value_type: 20,
			description: ''
		},
		{
			key: 'custom_fields.com.finmars.standard-layouts:collateral_mv',
			name: 'Custom Field. Collateral MV',
			value_type: 20,
			description: ''
		},
		{
			key: 'instrument.attributes.com.finmars.standard-instrument-type:instruments.instrument:asset_type',
			name: 'Instrument. User Attributes. Asset Type',
			value_type: 30,
			description: ''
		},
		{
			key: 'allocation.attributes.com.finmars.standard-instrument-type:instruments.instrument:asset_type',
			name: 'Allocation. User Attributes. Asset Type',
			value_type: 30,
			description: ''
		},
		{
			key: 'linked_instrument.attributes.com.finmars.standard-instrument-type:instruments.instrument:asset_type',
			name: 'Linked Instrument. User Attributes. Asset Type',
			value_type: 30,
			description: ''
		}
	]
};

export const options = [
	'-',
	'BTC',
	'Convertible Mark (BAM)',
	'Euro (EUR)',
	'Hong Kong Dollar (HKD)',
	'Indian Rupee (INR)',
	'Iranian Rial (IRR)',
	'New Taiwan Dollar (TWD)',
	'Pound Sterling (GBP)',
	'Rand (ZAR)',
	'Russian Ruble (RUB)',
	'Swiss Franc (CHF)',
	'US Dollar (USD)',
	'Yen (JPY)'
];

export const dateTreeOptions = [
	'2023-07-12',
	'2024-11-01',
	'2024-11-03',
	'2024-12-12',
	'2024-12-18'
];

export const dateTimeTreeOptions = [
	'2023-07-12T13:12',
	'2023-07-12T15:47',
	'2024-11-01T16:15',
	'2024-11-03T18:15',
	'2024-12-12T19:01',
	'2024-12-18T12:00'
];

export function getFilterMockOptions(filter) {
	console.log('getFilterMockOptions: ', filter);

	return new Promise((resolve) => {
		setTimeout(() => {
			if (filter.value_type === 40) {
				resolve(cloneDeep(dateTreeOptions));
			}

			if (filter.value_type === 80) {
				resolve(cloneDeep(dateTimeTreeOptions));
			}

			const data = cloneDeep(options.slice(1));
			resolve(data.map((i) => ({ title: i, value: i })));
		}, 1000);
	});
}

export function getSourceLinkedMockGroups(filter) {
	console.log('getSourceLinkedMockGroups: ', filter);
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{ title: 'Balance Report', value: 'balance-report' },
				{ title: 'P&L Report', value: 'pl-report' },
				{ title: 'Transaction Report', value: 'transaction-report' }
			]);
		}, 500);
	});
}

export function getSourceLinkedMockGroupAttributes(filter) {
	console.log('getSourceLinkedMockGroupAttributes: ', filter);
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(cloneDeep(mockData.attributes));
		}, 500);
	});
}
