import type { Meta, StoryObj } from '@storybook/vue3'

import { fn } from '@storybook/test'
import { VDropdownMenu } from '.'

const meta: Meta<typeof VDropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: VDropdownMenu,
  argTypes: {
    text: { control: 'text' }
  },
  args: {
    text: '新建',
    icon: 'i-[fluent--apps-add-in-16-regular]',
    items: [
      { text: '表格', icon: 'i-[fluent--table-16-regular]', action: fn() },
      { text: '文档', icon: 'i-[fluent--document-16-regular]', action: fn() },
      { text: '小记', icon: 'i-[fluent--note-16-regular]', action: fn() }
    ]
  },
  render(args) {
    return () => <VDropdownMenu {...args} />
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SideTop: Story = {
  render(args) {
    return () => (
      <>
        <div class='h-screen'></div>
        <VDropdownMenu {...args} />
      </>
    )
  }
}
