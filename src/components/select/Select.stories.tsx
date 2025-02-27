import type { Meta, StoryObj } from '@storybook/vue3'

import { VSelect } from '.'

const meta: Meta<typeof VSelect> = {
  title: 'Components/Select',
  component: VSelect,
  argTypes: {
    modelValue: { control: false },
    block: { control: 'boolean' },
    disabled: { control: 'boolean' },
    items: { control: 'object' },
    placeholder: { control: 'text' },
    width: { control: 'text' }
  },
  args: {
    width: '10rem'
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: Array.from({ length: 20 }).map((_, index) => ({
      text: `选项 ${index + 1}`,
      value: `item-${index + 1}`
    })),
    placeholder: '请选择'
  },
  parameters: {
    layout: 'fullscreen'
  },
  render(args) {
    return () => (
      <div class='box-border flex h-screen flex-col p-6'>
        <VSelect {...args} class='mb-6' />
        <div class='flex-1'></div>
        <VSelect {...args} class='mb-6' />
      </div>
    )
  }
}

export const Example: Story = {
  args: {
    items: [
      { text: 'Windows', value: 'windows' },
      { text: 'MacOS', value: 'macos' },
      { text: 'Linux', value: 'linux' }
    ],
    placeholder: '选择系统'
  },
  parameters: {
    layout: 'centered'
  },
  render(args) {
    return () => <VSelect {...args} class='mb-6' />
  }
}
