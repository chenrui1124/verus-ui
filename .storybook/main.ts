import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['./*.stories.@(ts|tsx)', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-themes'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  }
}

export default config
