import type { Meta, StoryObj } from '@storybook/vue3'

import { statusOptions } from '@/ts'
import { VAlert } from '.'
import { faker } from '@faker-js/faker'

const meta: Meta<typeof VAlert> = {
  title: 'Components/Alert',
  component: VAlert,
  argTypes: {
    icon: { control: false },
    status: { control: 'select', options: statusOptions('primary', 'success', 'warning', 'error') },
    title: { control: 'text' }
  },
  render(args) {
    return () => <VAlert {...args}>{faker.lorem.paragraph()}</VAlert>
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Icon: Story = {
  args: { icon: 'i-[fluent--square-24-filled]' }
}

export const Title: Story = {
  args: { title: faker.lorem.sentence() }
}

export const IconAndTitle: Story = {
  args: {
    ...Icon.args,
    ...Title.args
  }
}
