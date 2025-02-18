import type { Meta, StoryObj } from '@storybook/vue3'

import { VToggle } from '.'

const meta: Meta<typeof VToggle> = {
  title: 'Components/Toggle',
  component: VToggle,
  argTypes: {
    modelValue: { control: false },
    disabled: { control: 'boolean' },
    fallbackIcon: { control: 'text' },
    icon: { control: 'text' },
    rounded: { control: 'boolean' }
  },
  args: {
    icon: 'i-[fluent--lock-24-filled]'
  },
  parameters: {
    layout: 'centered'
  },
  render(args) {
    return () => <VToggle {...args} />
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithFallbackIcon: Story = { args: { fallbackIcon: 'i-[fluent--unlock-24-filled]' } }
