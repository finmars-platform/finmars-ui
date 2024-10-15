import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { fileURLToPath, URL } from 'node:url'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
	plugins: [vue(), vuetify(), svgLoader()],
	build: {
		cssCodeSplit: false,
		lib: {
			entry: './index.js',
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
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'~': fileURLToPath(new URL('./', import.meta.url))
		}
	}
})
