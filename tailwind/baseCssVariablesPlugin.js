import plugin from "tailwindcss/plugin"

export default plugin(
  function () {
  },
  {
    theme: {
      extend: {
        colors: {
          '--primary-color': 'var(--primary-color)',
          '--error-color': 'var(--error-color)',
          '--baseText-color': 'var(--baseText-color)',

          '--base-backgroundColor': 'var(--base-backgroundColor)',

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

          '--icon-basic-color': 'var(--icon-basic-color)',
          '--icon-basic-backgroundColor': 'var(--icon-basic-backgroundColor)',
          '--icon-basic-hover-color': 'var(--icon-basic-hover-color)',
          '--icon-basic-hover-backgroundColor': 'var(--icon-basic-hover-backgroundColor)',
          '--icon-basic-focus-color': 'var(--icon-basic-focus-color)',
          '--icon-basic-focus-backgroundColor': 'var(--icon-basic-focus-backgroundColor)',
          '--icon-basic-active-color': 'var(--icon-basic-active-color)',
          '--icon-basic-active-backgroundColor': 'var(--icon-basic-active-backgroundColor)',
          '--icon-basic-disabled-color': 'var(--icon-basic-disabled-color)',
          '--icon-basic-disabled-backgroundColor': 'var(--icon-basic-disabled-backgroundColor)',
        },
        opacity: {
          '--button-disabled': 'var(--button-disabled-opacity)',
        }
      }
    }
  }
)