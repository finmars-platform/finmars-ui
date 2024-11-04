export const categories = [
	{
		id: '1',
		label: 'Account',
		children: [
			{
				id: '10',
				label: 'Type',
				children: [
					{
						id: '101',
						label: 'Type 01',
					},
					{
						id: '102',
						label: 'Type 02',
					},
					{
						id: '103',
						label: 'Type 03',
					},
					{
						id: '104',
						label: 'Type 04',
						children: [
							{
								id: '1040',
								label: 'Type 04-01',
							},
							{
								id: '1041',
								label: 'Type 04-02',
							},
						],
					}
				],
			},
			{
				id: '11',
				label: 'Name',
				tooltip: 'The user name'
			},
			{
				id: '12',
				label: 'Notes',
			},
			{
				id: '13',
				label: 'Public name',
			},
			{
				id: '14',
				label: 'Short name',
			},
			{
				id: '15',
				label: 'User code',
				tooltip: 'The user code',
			},
		],
	},
	{
		id: '2',
		label: 'Allocation',
		children: [
			{
				id:	'20',
				label: 'Instrument type',
				children: [
					{
						id: '201',
						label: 'Accrues multiplier',
					},
					{
						id: '202',
						label: 'Underlying long multiplier',
					},
					{
						id: '203',
						label: 'Underlying short multiplier',
					},
				],
			},
		],
	},
	{
		id: '3',
		label: 'Currency',
		children: [
			{
				id: '30',
				label: 'Name',
			},
			{
				id: '31',
				label: 'Code',
			},
		],
	},
	{
		id: '4',
		label: 'Portfolio',
		children: [
			{
				id: '40',
				label: 'Works',
			}
		]
	},
]

export const singleSelect = [{
	id: '101',
	label: 'Type 01',
}]

export const multipleSelect = [
	{
		id: '13',
		label: 'Public name',
	},
	{
		id: '102',
		label: 'Type 02',
	},
	{
		id: '31',
		label: 'Code',
	},
]
