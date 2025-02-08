import '../src/tailwind/tailwind.css'

import type { Preview } from '@storybook/vue3'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
        boolean: /disabled/i
      }
    }
  }
}

export default preview
