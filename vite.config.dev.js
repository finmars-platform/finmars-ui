import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import {fileURLToPath, URL} from "node:url";

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '~': fileURLToPath(new URL('./', import.meta.url)),
        },
    },
    server: {
        port: 3000,
    },
    build: {
        sourcemap: true,
        cssCodeSplit: false,
    }
});