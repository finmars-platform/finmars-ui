/** @type { import('@storybook/vue3').Preview } */
import { setup } from "@storybook/vue3";
import '../src/assets/css/base-theme.css';
import '../src/assets/css/base.css';
import {createVuetify, useTheme} from 'vuetify';
import 'vuetify/styles';  // Импорт глобальных стилей Vuetify
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives,
});

setup(app => {
    app.use(vuetify);
})

const preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    globalTypes: {
        theme: {
            name: 'Theme',
            description: 'Global theme for components',
            defaultValue: 'light',
            toolbar: {
                // The label to show for this toolbar item
                title: 'Theme',
                icon: 'circlehollow',
                // Array of plain string values or MenuItem shape (see below)
                items: ['light', 'dark'],
                // Change title based on selected value
                dynamicTitle: true,
            },
        },
    },
    decorators: [
        (story, context) => {
            const theme = context.globals.theme || 'light';

            if (theme === 'dark') {
                document.body.classList.add('dark-mode');
                document.body.classList.remove('light-mode');
            } else {
                document.body.classList.add('light-mode');
                document.body.classList.remove('dark-mode');
            }

            return {
                setup() {
                    const themeStorybook = useTheme();

                    const backgroundColor = theme === 'dark' ? '#1A110F' : '#FFFEFC';

                    themeStorybook.global.name.value = theme;

                    return { story, backgroundColor };
                },
                template: `
                  <div :style="{ backgroundColor }" style="border-radius: 16px; padding: 20px">
                    <story/>
                  </div>
                `,
            };
        },
    ],
};

export default preview;


