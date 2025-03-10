import type { Meta, StoryObj } from '@storybook/vue3'

import { directionOptions } from '@/ts'
import { VToggle } from '@/components'
import { VToggleGroup } from '.'

const meta: Meta<typeof VToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: VToggleGroup,
  argTypes: {
    modelValue: { control: 'text' },
    direction: { control: 'select', options: directionOptions() },
    disabled: { control: 'boolean' },
    rounded: { control: 'boolean' }
  },
  parameters: {
    layout: 'centered'
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render(args) {
    return () => (
      <VToggleGroup {...args}>
        {Array.from({ length: 5 }).map((_, i) => (
          <VToggle value={`${i}`} icon='i-[fluent--square-24-filled]' />
        ))}
      </VToggleGroup>
    )
  }
}

export const Example: Story = {
  render(args) {
    return () => (
      <VToggleGroup {...args}>
        <VToggle value='left' icon='i-[fluent--text-align-left-24-filled]' />
        <VToggle value='center' icon='i-[fluent--text-align-center-24-filled]' />
        <VToggle value='right' icon='i-[fluent--text-align-right-24-filled]' />
      </VToggleGroup>
    )
  }
}
