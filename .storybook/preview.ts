import '../src/tailwind/tailwind.css'

import type { Preview } from '@storybook/vue3'

import { fontWeightOptions, textTransformOptions, variantOptions } from '@/ts'

const preview: Preview = {
  argTypes: {
    appendIcon: { control: false },
    disabled: { control: 'boolean' },
    icon: { control: false },
    loading: { control: 'boolean' },
    text: { control: 'text' },
    uiBlock: { control: 'boolean' },
    uiDanger: { control: 'boolean' },
    uiFontWeight: { control: 'inline-radio', options: fontWeightOptions() },
    uiHeight: { control: 'text' },
    uiRounded: { control: 'boolean' },
    uiTextTransform: { control: 'inline-radio', options: textTransformOptions() },
    uiVariant: { control: 'inline-radio', options: variantOptions() },
    uiWidth: { control: 'text' }
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
