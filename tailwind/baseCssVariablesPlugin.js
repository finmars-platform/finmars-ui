import plugin from "tailwindcss/plugin"

export default plugin(
    function () {},
    {
        theme: {
            extend: {
                colors: {
                    '--primary-color': 'var(--primary-color)',
                    '--baseText-color': 'var(--baseText-color)',

                    '--base-background-color': 'var(--base-background-color)',

                    '--button-text-color': 'var(--button-text-color)',
                    '--button-text-backgroundColor': 'var(--button-text-backgroundColor)',

                    '--button-filled-color': 'var(--button-filled-color)',
                    '--button-filled-backgroundColor': 'var(--button-filled-backgroundColor)',
                }
            }
        }
    }
)