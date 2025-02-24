import type { Meta, StoryObj } from '@storybook/vue3'

import { fn } from '@storybook/test'
import { Random } from 'mockjs'
import { VNavigation } from '.'

const meta: Meta<typeof VNavigation> = {
  title: 'Components/Navigation',
  component: VNavigation,
  argTypes: {
    modelValue: { control: 'text' },
    items: { control: 'object' }
  },
  args: {
    items: [
      { text: Random.ctitle(), icon: 'i-[fluent--circle-24-filled]', value: Random.guid() },
      { text: Random.ctitle(), value: Random.guid() },
      { text: Random.ctitle(), value: Random.guid() },
      { text: Random.ctitle(), value: Random.guid() }
    ],
    onPush: fn()
  },
  render(args) {
    return () => <VNavigation {...args}></VNavigation>
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
