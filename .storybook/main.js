import ViteSvgLoader from 'vite-svg-loader'
import { mergeConfig } from 'vite';

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
	stories: [
		'../stories/**/*.mdx',
		'../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)'
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
		'@storybook/addon-toolbars'
	],
	framework: {
		name: '@storybook/vue3-vite',
		options: {}
	},
	async viteFinal(config) {
		return mergeConfig(config, {
			plugins: [ViteSvgLoader()],
		})
	},
	docs: {
		autodocs: true
	}
}
export default config
