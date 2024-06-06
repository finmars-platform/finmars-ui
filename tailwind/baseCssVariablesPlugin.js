import plugin from "tailwindcss/plugin"

export default plugin(
  function () {
  },
  {
    theme: {
      extend: {
        colors: {
          '--primary-color': 'var(--primary-color)',
          '--baseText-color': 'var(--baseText-color)',

          '--base-background-color': 'var(--base-background-color)',

          '--button-text-color': 'var(--button-text-color)',
          '--button-text-disabled-color': 'var(--button-text-disabled-color)',
          '--button-text-backgroundColor': 'var(--button-text-backgroundColor)',
          '--button-text-hover-backgroundColor': 'var(--button-text-hover-backgroundColor)',
          '--button-text-focus-backgroundColor': 'var(--button-text-focus-backgroundColor)',
          '--button-text-pressed-backgroundColor': 'var(--button-text-hover-backgroundColor)',
          '--button-text-disabled-backgroundColor': 'var(--button-text-disabled-backgroundColor)',

          '--button-filled-color': 'var(--button-filled-color)',
          '--button-filled-disabled-color': 'var(--button-filled-disabled-color)',
          '--button-filled-backgroundColor': 'var(--button-filled-backgroundColor)',
          '--button-filled-hover-backgroundColor': 'var(--button-filled-hover-backgroundColor)',
          '--button-filled-focus-backgroundColor': 'var(--button-filled-focus-backgroundColor)',
          '--button-filled-pressed-backgroundColor': 'var(--button-filled-pressed-backgroundColor)',
          '--button-filled-disabled-backgroundColor': 'var(--button-filled-disabled-backgroundColor)',
        },
      }
    }
  }
)