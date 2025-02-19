import type { Meta, StoryObj } from '@storybook/vue3'

import { VToggleGroup } from '.'
import { directionOptions } from '@/ts'

const meta: Meta<typeof VToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: VToggleGroup,
  argTypes: {
    modelValue: { control: 'text' },
    direction: { control: 'select', options: directionOptions() },
    rounded: { control: 'boolean' },
    items: { control: 'object' }
  },
  args: {
    items: [
      { icon: 'i-[fluent--text-align-left-24-filled]', value: 'left' },
      { icon: 'i-[fluent--text-align-center-24-filled]', value: 'center' },
      { icon: 'i-[fluent--text-align-right-24-filled]', value: 'right' }
    ]
  },
  render(args) {
    return () => <VToggleGroup {...args} />
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
