import type { Meta, StoryObj } from '@storybook/vue3'
import type { DropdownSlots } from '.'

import { fn } from '@storybook/test'
import { VButton } from '@/components'
import { VDropdown } from '.'

const meta: Meta<typeof VDropdown> = {
  title: 'Components/Dropdown',
  component: VDropdown,
  argTypes: {
    items: { control: 'object' },
    width: { control: 'text' }
  }
}

export default meta

type Story = StoryObj<typeof meta>

const icon = 'i-[fluent--square-24-filled]'

export const Default: Story = {
  args: {
    items: [
      { text: '按钮 1', action: fn(), icon: 'i-[fluent--square-24-filled]' },
      { text: '按钮 2', action: fn() }
    ]
  },
  parameters: {
    layout: 'fullscreen'
  },
  render(args) {
    const slots: DropdownSlots = {
      trigger: ({ togglePopover }) => (
        <VButton icon={icon} variant='solid' onClick={togglePopover}>
          打开下拉框
        </VButton>
      )
    }

    return () => (
      <div class='box-border flex h-screen flex-col items-start p-3'>
        <VDropdown {...args} v-slots={slots} />
        <div class='flex-1'></div>
        <VDropdown {...args} v-slots={slots} />
      </div>
    )
  }
}

export const Example: Story = {
  argTypes: {
    items: { control: false }
  },
  parameters: {
    layout: 'centered'
  },
  render(args) {
    const items1 = [
      { text: '文档', action: fn(), icon: 'i-[fluent--textbox-24-filled]' },
      { text: '电子表格', action: fn(), icon: 'i-[fluent--table-24-filled]' },
      { text: '演示文稿', action: fn(), icon: 'i-[fluent--slide-play-24-filled]' }
    ]
    const slots1: DropdownSlots = {
      trigger: ({ togglePopover }) => (
        <VButton variant='solid' width='7rem' onClick={togglePopover}>
          新建文件
        </VButton>
      )
    }

    const items2 = [
      { ...items1[0], text: 'Document' },
      { ...items1[1], text: 'Table' },
      { ...items1[2], text: 'Slide' }
    ]
    const slots2: DropdownSlots = {
      trigger: ({ togglePopover }) => (
        <VButton textTransform='uppercase' variant='solid' width='7.5rem' onClick={togglePopover}>
          New file
        </VButton>
      )
    }

    return () => (
      <div class='mb-6 flex gap-3'>
        <VDropdown {...args} items={items1} v-slots={slots1} />
        <VDropdown {...args} items={items2} v-slots={slots2} />
      </div>
    )
  }
}
