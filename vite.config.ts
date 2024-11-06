import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import dts from 'vite-plugin-dts'
import svgLoader from 'vite-svg-loader'
import { resolve } from 'node:path'

export default defineConfig({
	plugins: [vue(), vuetify(), svgLoader(), dts({ insertTypesEntry: true })],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
			'~': resolve(__dirname, '/'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
			},
		},
	},
	build: {
		cssCodeSplit: false,
		outDir: 'dist',
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			formats: ['es', 'umd'],
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
	},
})
