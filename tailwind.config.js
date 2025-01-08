/** @type {import('tailwindcss').Config} */
import cssVariablesPlugin from './tailwind/cssVariablesPlugin.tw';

export default {
	content: ['./index.js', './src/**/*.{vue,js}', './stories/**/*.{vue,js}'],
	theme: {
		extend: {}
	},
	plugins: [cssVariablesPlugin]
};
