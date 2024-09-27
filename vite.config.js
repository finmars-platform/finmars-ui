import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
    plugins: [vue(), vuetify()],
    build: {
        cssCodeSplit: false, // Important: Forces all CSS into a single file
        lib: {
            entry: "./index.js",
            formats: ["es", "umd"],
            name: "FinmarsUi",
            fileName: (format) => `finmars-ui.${format}.js`
        },
        rollupOptions: {
            // Make sure external dependencies are not bundled into your library
            external: ["vue", "floating-vue"],

            output: {
                // Provide globals for external modules
                globals: {
                    vue: "Vue"
                },
                assetFileNames: "finmars-ui.css"
            }
        }

    }
});