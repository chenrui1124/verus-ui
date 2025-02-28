import type { Meta, StoryObj } from '@storybook/vue3'

import { VToggle } from '.'

const meta: Meta<typeof VToggle> = {
  title: 'Components/Toggle',
  component: VToggle,
  argTypes: {
    modelValue: { control: false },
    disabled: { control: 'boolean' },
    icon: { control: 'text' },
    rounded: { control: 'boolean' }
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

export const Default: Story = {
  args: {
    icon: 'i-[fluent--square-24-filled]'
  }
}

export const Example: Story = {
  argTypes: {
    icon: { control: 'object' }
  },
  args: {
    icon: ['i-[fluent--unlock-24-filled]', 'i-[fluent--lock-24-filled]']
  }
}
