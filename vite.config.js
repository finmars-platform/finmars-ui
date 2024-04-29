import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    build: {
        cssCodeSplit: false, // Important: Forces all CSS into a single file
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
                },
                assetFileNames: `finmars-ui.css`
            }
        }
    }
});