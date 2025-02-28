import type { Meta, StoryObj } from '@storybook/vue3'

import { VIconButton } from '.'

const meta: Meta<typeof VIconButton> = {
  title: 'Components/IconButton',
  component: VIconButton,
  argTypes: {
    icon: { control: false },
    danger: { control: 'boolean' },
    disabled: { control: 'boolean' },
    rounded: { control: 'boolean' }
  },
  parameters: {
    layout: 'centered'
  },
  render(args) {
    return () => <VIconButton {...args}></VIconButton>
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
  args: {
    danger: true,
    icon: 'i-[fluent--delete-24-filled]'
  }
}
