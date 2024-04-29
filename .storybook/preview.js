/** @type { import('@storybook/vue3').Preview } */

import '../src/assets/css/base-theme.css';
import '../src/assets/css/base.css';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      // Array of theme items
      items: [
        { value: 'light', title: 'Light', left: '☀️', right: 'Light' },
        { value: 'dark', title: 'Dark', left: '🌙', right: 'Dark' }
      ],
    },
  },
};

export const decorators = [
  (Story, context) => {
    const theme = context.globals.theme;
    return {
      template: `<div class="${theme === 'dark' ? 'dark-mode' : ''}"><story /></div>`,
    };
  },
];