import type { Meta, StoryObj } from '@storybook/vue3'

import { statusOptions } from '@/ts'
import { VIconButton } from '.'

const meta: Meta<typeof VIconButton> = {
  title: 'Components/IconButton',
  component: VIconButton,
  argTypes: {
    icon: { control: false },
    disabled: { control: 'boolean' },
    rounded: { control: 'boolean' },
    status: { control: 'select', options: statusOptions('primary', 'error') }
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
    status: 'error',
    icon: 'i-[fluent--delete-24-filled]'
  }
}
