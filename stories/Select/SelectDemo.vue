<template>
	<div class="grid grid-cols-2 gap-16">
		<div>
			<h3 class="text-[16px] mb-2">Standard, single, Label</h3>

			<FmSelect v-model="v1" v-on="eventHandlers" :options="options1" label="Label1" />
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Outlined, single, Label</h3>

			<FmSelect
				v-model="v2"
				v-on="eventHandlers"
				variant="outlined"
				:options="options2"
				label="Label2"
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Standard, single, Label, placeholder</h3>

			<FmSelect
				v-model="v3"
				v-on="eventHandlers"
				:options="options1"
				label="Label1"
				placeholder="Select option"
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Outlined, single, Label, placeholder</h3>

			<FmSelect
				v-model="v4"
				v-on="eventHandlers"
				variant="outlined"
				:options="options2"
				label="Label2"
				placeholder="Select option"
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Standard, single, Label, persistent placeholder</h3>

			<FmSelect
				v-model="v5"
				v-on="eventHandlers"
				:options="options1"
				label="Label1"
				placeholder="Select option"
				persistent-placeholder
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Outlined, single, Label, persistent placeholder</h3>

			<FmSelect
				v-model="v6"
				v-on="eventHandlers"
				variant="outlined"
				:options="options2"
				label="Label2"
				placeholder="Select option"
				persistent-placeholder
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Standard, single, Label, persistent placeholder, clearable</h3>

			<FmSelect
				v-model="v7"
				v-on="eventHandlers"
				:options="options1"
				label="Label1"
				placeholder="Select option"
				persistent-placeholder
				clearable
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Outlined, single, Label, persistent placeholder, clearable</h3>

			<FmSelect
				v-model="v8"
				v-on="eventHandlers"
				variant="outlined"
				:options="options2"
				label="Label2"
				placeholder="Select option"
				persistent-placeholder
				clearable
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">
				Standard, single, Label, persistent placeholder, clearable, error
			</h3>

			<FmSelect
				v-model="v9"
				v-on="eventHandlers"
				:options="options1"
				label="Label1"
				placeholder="Select option"
				persistent-placeholder
				clearable
				error
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">
				Outlined, single, Label, persistent placeholder, clearable, error
			</h3>

			<FmSelect
				v-model="v10"
				v-on="eventHandlers"
				variant="outlined"
				:options="options2"
				label="Label2"
				placeholder="Select option"
				persistent-placeholder
				clearable
				error
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Standard, single, Label, disabled</h3>

			<FmSelect v-model="v11" v-on="eventHandlers" :options="options1" label="Label1" disabled />
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Outlined, single, Label, disabled</h3>

			<FmSelect
				v-model="v12"
				v-on="eventHandlers"
				variant="outlined"
				:options="options2"
				label="Label2"
				disabled
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">
				Standard, multiple, label, placeholder, clearable, prepend icon
			</h3>

			<FmSelect
				v-model="v13"
				v-on="eventHandlers"
				:options="options1"
				label="Label1"
				placeholder="Select option"
				clearable
				prepend-icon="mdi-magnify"
				multiple
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Outlined, multiple, label, placeholder, clearable</h3>

			<FmSelect
				v-model="v14"
				v-on="eventHandlers"
				variant="outlined"
				:options="options2"
				label="Label2"
				placeholder="Select option"
				clearable
				multiple
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">
				Standard, multiple, label, placeholder, clearable, prepend icon, chip
			</h3>

			<FmSelect
				v-model="v15"
				v-on="eventHandlers"
				:options="options1"
				label="Label1"
				placeholder="Select option"
				clearable
				prepend-icon="mdi-magnify"
				multiple
				chip
			/>
		</div>

		<div>
			<h3 class="text-[16px] mb-2">Outlined, multiple, label, placeholder, clearable, chip</h3>

			<FmSelect
				v-model="v16"
				v-on="eventHandlers"
				variant="outlined"
				:options="options2"
				label="Label2"
				placeholder="Select option"
				clearable
				multiple
				chip
			/>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import cloneDeep from 'lodash/cloneDeep';
	import FmSelect from '@/components/fm/Select/Select.vue';

	const eventHandlers = {
		'click:prependIcon': (ev) => console.log(`EVENT 'click:prependIcon' :`, ev),
		'click:clear': (ev) => console.log(`EVENT 'click:clear' :`, ev),
		focus: () => console.log(`EVENT 'focus'`),
		blur: () => console.log(`EVENT 'blur'`),
		'update:menu': (ev) => console.log(`EVENT 'update:menu' :`, ev),
		'update:modelValue': (ev) => console.log(`EVENT 'update:modelValue' :`, ev)
	};

	const options1 = [
		{ title: 'Option 1', value: 'o1' },
		{ title: 'Option 2', value: 'o2' },
		{ title: 'Option 3', value: 'o3' },
		{ title: 'Option 4', value: 'o4' },
		{ title: 'Option 5', value: 'o5' }
	];

	const options2 = [
		{
			value: 'attribute_recalculation',
			title: 'attribute_recalculation'
		},
		{
			value: 'bulk_delete',
			title: 'bulk_delete'
		},
		{
			value: 'calculate_balance_report',
			title: 'calculate_balance_report'
		},
		{
			value: 'calculate_pl_report',
			title: 'calculate_pl_report'
		},
		{
			value: 'calculate_portfolio_history',
			title: 'calculate_portfolio_history'
		},
		{
			value: 'calculate_portfolio_reconcile_history',
			title: 'calculate_portfolio_reconcile_history'
		},
		{
			value: 'calculate_portfolio_register_price_history',
			title: 'calculate_portfolio_register_price_history'
		},
		{
			value: 'calculate_portfolio_register_record',
			title: 'calculate_portfolio_register_record'
		},
		{
			value: 'collect_history',
			title: 'collect_history'
		},
		{
			value: 'complex_transaction_user_field_recalculation',
			title: 'complex_transaction_user_field_recalculation'
		},
		{
			value: 'configuration_import',
			title: 'configuration_import'
		},
		{
			value: 'csv_import.simple_import_bulk_insert_final_updates_procedure',
			title: 'csv_import.simple_import_bulk_insert_final_updates_procedure'
		},
		{
			value: 'download_instrument_from_finmars_database',
			title: 'download_instrument_from_finmars_database'
		},
		{
			value: 'execute_expression_procedure',
			title: 'execute_expression_procedure'
		},
		{
			value: 'export_configuration',
			title: 'export_configuration'
		},
		{
			value: 'export_journal_to_storage',
			title: 'export_journal_to_storage'
		},
		{
			value: 'generate_events',
			title: 'generate_events'
		},
		{
			value: 'import_from_database',
			title: 'import_from_database'
		},
		{
			value: 'install_configuration_from_marketplace',
			title: 'install_configuration_from_marketplace'
		},
		{
			value: 'install_initial_configuration',
			title: 'install_initial_configuration'
		},
		{
			value: 'process_bank_file_for_reconcile',
			title: 'process_bank_file_for_reconcile'
		},
		{
			value: 'process_events',
			title: 'process_events'
		},
		{
			value: 'push_configuration_to_marketplace',
			title: 'push_configuration_to_marketplace'
		},
		{
			value: 'simple_import',
			title: 'simple_import'
		},
		{
			value: 'transaction_import',
			title: 'transaction_import'
		},
		{
			value: 'universal_input',
			title: 'universal_input'
		},
		{
			value: 'user_task',
			title: 'user_task'
		},
		{
			value: 'validate_transaction_import',
			title: 'validate_transaction_import'
		}
	];

	const clonedOptions1 = cloneDeep(options1);

	const v1 = ref();
	const v2 = ref();
	const v3 = ref();
	const v4 = ref();
	const v5 = ref();
	const v6 = ref();
	const v7 = ref();
	const v8 = ref();
	const v9 = ref();
	const v10 = ref();
	const v11 = ref();
	const v12 = ref();
	const v13 = ref();
	const v14 = ref();
	const v15 = ref([clonedOptions1[0].value, clonedOptions1[1].value]);
	const v16 = ref();
</script>
