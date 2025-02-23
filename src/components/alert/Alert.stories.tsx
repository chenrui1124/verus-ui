import type { Meta, StoryObj } from '@storybook/vue3'

import { VAlert } from '.'
import { Random } from 'mockjs'

const meta: Meta<typeof VAlert> = {
  title: 'Components/Alert',
  component: VAlert,
  argTypes: {
    title: { control: 'text' },
    icon: { control: false }
  },
  args: {},
  render(args) {
    return () => <VAlert {...args}>{Random.cparagraph()}</VAlert>
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = {
  args: { icon: 'i-[fluent--circle-24-filled]' }
}

export const WithTitle: Story = {
  args: { title: Random.ctitle() }
}

export const WithIconAndTitle: Story = {
  args: {
    ...WithIcon.args,
    ...WithTitle.args
  }
}
