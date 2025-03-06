import type { Meta, StoryObj } from '@storybook/vue3'

import { statusOptions } from '@/ts'
import { VSwitch } from '.'

const meta: Meta<typeof VSwitch> = {
  title: 'Components/Switch',
  component: VSwitch,
  argTypes: {
    modelValue: { control: 'boolean' },
    disabled: { control: 'boolean' },
    status: { control: 'select', options: statusOptions('primary', 'error') }
  },
  parameters: {
    layout: 'centered'
  },
  render(args) {
    return () => <VSwitch {...args} />
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Example: Story = {
  render(args) {
    return () => (
      <div class='flex w-60 flex-col rounded-v3 border border-otl-var p-6'>
        <label class='flex items-center gap-3'>
          <span class='flex-1 text-sm text-on-sur'>飞行模式</span>
          <VSwitch {...args} />
        </label>
      </div>
    )
  }
}
