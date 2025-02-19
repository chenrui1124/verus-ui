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
  args: {
    icon: 'i-[fluent--apps-add-in-20-regular]'
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

export const Default: Story = {}
