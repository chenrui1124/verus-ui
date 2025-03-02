import type { Meta, StoryObj } from '@storybook/vue3'

import { fn } from '@storybook/test'
import { VNavigation } from '.'

const meta: Meta<typeof VNavigation> = {
  title: 'Components/Navigation',
  component: VNavigation,
  argTypes: {
    modelValue: { control: 'text' },
    items: { control: 'object' }
  },
  render(args) {
    return () => (
      <div class='w-60'>
        <VNavigation {...args}></VNavigation>
      </div>
    )
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { text: '链接 1', value: '1', icon: 'i-[fluent--square-24-filled]' },
      {
        text: '分组 1',
        group: [
          { text: '链接 2', value: '1-1', icon: 'i-[fluent--square-24-filled]' },
          { text: '链接 3', value: '1-2' }
        ],
        icon: 'i-[fluent--square-24-filled]'
      },
      {
        text: '分组 2',
        group: [
          { text: '链接 2', value: '2-1' },
          { text: '链接 3', value: '2-2' }
        ]
      },
      { text: '链接 2', value: '2' }
    ],
    onPush: fn()
  }
}

export const Example: Story = {
  args: {
    items: [
      { text: 'Bookmark', value: 'bookmark', icon: 'i-[fluent--bookmark-24-filled]' },
      { text: 'Introduction', value: 'introduction', icon: 'i-[fluent--slide-text-24-filled]' },
      {
        text: 'Contents',
        group: [
          { text: 'Section 1', value: 'section 1' },
          { text: 'Section 2', value: 'section 2' }
        ],
        icon: 'i-[fluent--text-column-wide-24-filled]'
      },
      { text: 'About', value: 'about' }
    ],
    onPush: fn()
  }
}
