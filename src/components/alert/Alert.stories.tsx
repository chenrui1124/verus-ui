import type { Meta, StoryObj } from '@storybook/vue3'

import { Random } from 'mockjs'
import { statusOptions } from '@/ts'
import { VAlert } from '.'

const meta: Meta<typeof VAlert> = {
  title: 'Components/Alert',
  component: VAlert,
  argTypes: {
    icon: { control: false },
    status: { control: 'select', options: statusOptions('primary', 'success', 'warning', 'error') },
    title: { control: 'text' }
  },
  render(args) {
    return () => <VAlert {...args}>{Random.cparagraph()}</VAlert>
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Icon: Story = {
  args: { icon: 'i-[fluent--square-24-filled]' }
}

export const Title: Story = {
  args: { title: Random.ctitle() }
}

export const IconAndTitle: Story = {
  args: {
    ...Icon.args,
    ...Title.args
  }
}
