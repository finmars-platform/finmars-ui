import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import vuetify from 'vite-plugin-vuetify';
import dts from 'vite-plugin-dts';
import svgLoader from 'vite-svg-loader';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
	plugins: [
		vue(),
		nodePolyfills({
			include: ['fs', 'http', 'path', 'url'],
			protocolImports: true
		}),
		vuetify(),
		svgLoader(),
		vueDevTools(),
		dts({ insertTypesEntry: true })
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
			'~': resolve(__dirname, '/'),
			'source-map-js': 'source-map'
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler'
			}
		}
	},
	build: {
		cssCodeSplit: false,
		outDir: 'dist',
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			formats: ['es'],
			name: 'FinmarsUi',
			fileName: (format) => `finmars-ui.${format}.js`
		},
		rollupOptions: {
			external: ['vue', 'floating-vue', 'vuetify'],
			output: {
				globals: {
					vue: 'Vue',
					vuetify: 'Vuetify'
				},
				assetFileNames: 'finmars-ui.css'
			}
		}
	}
});
