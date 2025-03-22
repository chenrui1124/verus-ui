import '../src/tailwind.css'

import type { Preview } from '@storybook/vue3'

import { withThemeByDataAttribute } from '@storybook/addon-themes'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    withThemeByDataAttribute({
      attributeName: 'data-theme',
      themes: {
        light: 'light',
        auto: 'auto',
        dark: 'dark'
      },
      defaultTheme: 'auto'
    })
  ]
}

export default preview
