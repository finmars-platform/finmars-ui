import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import { fileURLToPath, URL } from 'node:url';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
	plugins: [vue(), vuetify(), svgLoader()],
	server: {
		port: 3000
	},
	build: {
		sourcemap: true,
		cssCodeSplit: false
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'~': fileURLToPath(new URL('./', import.meta.url))
		}
	}
});
