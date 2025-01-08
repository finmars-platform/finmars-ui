module.exports = {
	root: true,
	env: {
		node: true,
		browser: true
	},
	extends: [
		'plugin:vue/vue3-essential',
		'@vue/typescript/recommended',
		'eslint:recommended',
		'plugin:prettier/recommended'
	],
	plugins: ['vue', '@typescript-eslint', 'prettier', 'eslint-plugin-prettier'],
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 2020,
		sourceType: 'module'
	},

	rules: {
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				semi: true,
				printWidth: 100,
				tabWidth: 2,
				useTabs: true,
				vueIndentScriptAndStyle: true,
				trailingComma: 'none'
			}
		],
		semi: ['error', 'always', { omitLastInOneLineBlock: true, omitLastInOneLineClassBody: true }],
		'vue/multi-word-component-names': 'off',
		'no-unused-vars': 'off',

		'@typescript-eslint/no-inferrable-types': [
			'error',
			{ ignoreProperties: false, ignoreParameters: false }
		],
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }]
	}
};
