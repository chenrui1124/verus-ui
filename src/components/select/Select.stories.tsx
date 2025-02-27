import type { Meta, StoryObj } from '@storybook/vue3'

import { VSelect, type SelectProps } from './index.ts'
import { Random } from 'mockjs'

const meta: Meta<typeof VSelect> = {
  title: 'Components/Select',
  component: VSelect,
  argTypes: {
    modelValue: { control: false },
    disabled: { control: 'boolean' },
    items: { control: 'object' },
    placeholder: { control: 'text' },
    width: { control: 'text' }
  },
  args: {
    items: [
      { text: 'Windows Phone', value: 'windows-phone' },
      { text: 'Android', value: 'android' },
      { text: 'iOS', value: 'ios' }
    ],
    placeholder: 'Platform',
    width: '12rem'
  },
  render(args) {
    return () => <VSelect {...args} />
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MoreItems: Story = {
  args: {
    items: (() => {
      const items: SelectProps['items'] = []
      for (let i = 0; i < 20; i++) {
        items.push({ text: Random.cword(7), value: Random.word() })
      }
      return items
    })()
  },
  render(args) {
    return () => (
      <>
        <div class='h-dvh'></div>
        <VSelect {...args} />
        <div class='h-dvh'></div>
      </>
    )
  }
}
