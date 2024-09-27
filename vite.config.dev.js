import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
    plugins: [vue(), vuetify()],
    server: {
        port: 3000,
    },
    build: {
        sourcemap: true,
        cssCodeSplit: false,
    }
});