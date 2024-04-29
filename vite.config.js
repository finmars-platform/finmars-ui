import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: './index.js',
            name: 'FinmarsUI',
            fileName: (format) => `finmars-ui.${format}.js`
        },
        rollupOptions: {
            // Make sure external dependencies are not bundled into your library
            external: ['vue'],
            output: {
                // Provide globals for external modules
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
});