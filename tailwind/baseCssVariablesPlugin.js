import plugin from "tailwindcss/plugin"

export default plugin(
  function () {
  },
  {
    theme: {
      extend: {
        padding: {
          '--icon-padding': 'var(--icon-padding)',
        },
        colors: {
          '--primary-color': 'var(--primary-color)',
          '--error-color': 'var(--error-color)',
          '--baseText-color': 'var(--baseText-color)',

          '--base-backgroundColor': 'var(--base-backgroundColor)',

          '--icon-button-color': 'var(--icon-button-color)',
          '--icon-button-backgroundColor': 'var(--icon-button-backgroundColor)',
          '--icon-button-hover-color': 'var(--icon-button-hover-color)',
          '--icon-button-hover-backgroundColor': 'var(--icon-button-hover-backgroundColor)',
          '--icon-button-focus-color': 'var(--icon-button-focus-color)',
          '--icon-button-focus-backgroundColor': 'var(--icon-button-focus-backgroundColor)',
          '--icon-button-active-color': 'var(--icon-button-active-color)',
          '--icon-button-active-backgroundColor': 'var(--icon-button-active-backgroundColor)',
          '--icon-button-disabled-color': 'var(--icon-button-disabled-color)',
          '--icon-button-disabled-backgroundColor': 'var(--icon-button-disabled-backgroundColor)',

          '--icon-filledButton-color': 'var(--icon-filledButton-color)',
          '--icon-filledButton-backgroundColor': 'var(--icon-filledButton-backgroundColor)',
          '--icon-filledButton-hover-color': 'var(--icon-filledButton-hover-color)',
          '--icon-filledButton-hover-backgroundColor': 'var(--icon-filledButton-hover-backgroundColor)',
          '--icon-filledButton-focus-color': 'var(--icon-filledButton-focus-color)',
          '--icon-filledButton-focus-backgroundColor': 'var(--icon-filledButton-focus-backgroundColor)',
          '--icon-filledButton-active-color': 'var(--icon-filledButton-active-color)',
          '--icon-filledButton-active-backgroundColor': 'var(--icon-filledButton-active-backgroundColor)',
          '--icon-filledButton-disabled-color': 'var(--icon-filledButton-disabled-color)',
          '--icon-filledButton-disabled-backgroundColor': 'var(--icon-filledButton-disabled-backgroundColor)',

          '--button-text-color': 'var(--button-text-color)',
          '--button-text-backgroundColor': 'var(--button-text-backgroundColor)',

          '--button-text-hover-color': 'var(--button-text-hover-color)',
          '--button-text-hover-backgroundColor': 'var(--button-text-hover-backgroundColor)',

          '--button-text-focus-color': 'var(--button-text-focus-color)',
          '--button-text-focus-backgroundColor': 'var(--button-text-focus-backgroundColor)',

          '--button-text-active-color': 'var(--button-text-active-color)',
          '--button-text-active-backgroundColor': 'var(--button-text-active-backgroundColor)',

          '--button-text-disabled-color': 'var(--button-text-disabled-color)',
          '--button-text-disabled-backgroundColor': 'var(--button-text-disabled-backgroundColor)',

          '--button-filled-color': 'var(--button-filled-color)',
          '--button-filled-backgroundColor': 'var(--button-filled-backgroundColor)',
          '--button-filled-hover-color': 'var(--button-filled-hover-color)',
          '--button-filled-hover-backgroundColor': 'var(--button-filled-hover-backgroundColor)',
          '--button-filled-focus-color': 'var(--button-filled-focus-color)',
          '--button-filled-focus-backgroundColor': 'var(--button-filled-focus-backgroundColor)',
          '--button-filled-active-color': 'var(--button-filled-active-color)',
          '--button-filled-active-backgroundColor': 'var(--button-filled-active-backgroundColor)',
          '--button-filled-disabled-color': 'var(--button-filled-disabled-color)',
          '--button-filled-disabled-backgroundColor': 'var(--button-filled-disabled-backgroundColor)',

        },
        opacity: {
          '--button-disabled': 'var(--button-disabled-opacity)',
          '--icon-disabled': 'var(--icon-disabled-opacity)',
        }
      }
    }
  }
)