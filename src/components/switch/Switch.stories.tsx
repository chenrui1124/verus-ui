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
