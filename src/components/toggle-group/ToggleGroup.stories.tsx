import type { Meta, StoryObj } from '@storybook/vue3'

import { directionOptions } from '@/ts'
import { VToggleGroup } from '.'

const meta: Meta<typeof VToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: VToggleGroup,
  argTypes: {
    modelValue: { control: 'text' },
    direction: { control: 'select', options: directionOptions() },
    items: { control: 'object' },
    rounded: { control: 'boolean' }
  },
  parameters: {
    layout: 'centered'
  },
  render(args) {
    return () => <VToggleGroup {...args} />
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: Array.from({ length: 5 }).map((_, i) => ({
      value: `${i}`,
      icon: 'i-[fluent--square-24-filled]'
    }))
  }
}

export const Example: Story = {
  args: {
    items: [
      { value: 'left', icon: 'i-[fluent--text-align-left-24-filled]' },
      { value: 'center', icon: 'i-[fluent--text-align-center-24-filled]' },
      { value: 'right', icon: 'i-[fluent--text-align-right-24-filled]' }
    ]
  }
}
