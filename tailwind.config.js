/** @type {import('tailwindcss').Config} */
import baseCssVariablesPlugin from "./tailwind/baseCssVariablesPlugin";

export default {
    content: [
        "./index.js",
        "./src/**/*.{vue,js}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        baseCssVariablesPlugin
    ],
}