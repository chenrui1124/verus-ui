import type { Meta, StoryObj } from '@storybook/vue3'

import { fn } from '@storybook/test'
import { fontWeightOptions, statusOptions, textTransformOptions, variantOptions } from '@/ts'
import { VButton } from '.'

const meta: Meta<typeof VButton> = {
  title: 'Components/Button',
  component: VButton,
  argTypes: {
    appendIcon: { control: false },
    block: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fontWeight: { control: 'select', options: fontWeightOptions() },
    icon: { control: false },
    loading: { control: 'boolean' },
    rounded: { control: 'boolean' },
    status: { control: 'select', options: statusOptions('primary', 'error') },
    text: { control: 'text' },
    textTransform: { control: 'select', options: textTransformOptions() },
    variant: { control: 'select', options: variantOptions() },
    width: { control: 'text' }
  },
  args: {
    onClick: fn()
  },
  parameters: {
    layout: 'centered'
  }
}

export default meta

type Story = StoryObj<typeof meta>

const icon = 'i-[fluent--square-24-filled]'

export const Default: Story = {
  args: {
    text: '按钮'
  },
  render(args) {
    return () => (
      <div class='flex flex-col items-start gap-3'>
        <VButton {...args} />
        <VButton {...args} icon={icon} />
        <VButton {...args} appendIcon={icon} />
        <VButton {...args} icon={icon} appendIcon={icon} />
      </div>
    )
  }
}

export const Example: Story = {
  argTypes: {
    text: { control: false }
  },
  args: {
    icon: 'i-[fluent--add-square-multiple-24-filled]',
    textTransform: 'uppercase',
    variant: 'solid'
  },
  render(args) {
    return () => (
      <div class='flex flex-col items-start gap-3'>
        <VButton {...args}>新建文件</VButton>
        <VButton {...args}>New file</VButton>
      </div>
    )
  }
}
