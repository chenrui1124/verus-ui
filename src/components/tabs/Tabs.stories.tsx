import type { Meta, StoryObj } from '@storybook/vue3'

import { VTabs } from '.'

const meta: Meta<typeof VTabs<any>> = {
  title: 'Components/Tabs',
  component: VTabs as any,
  argTypes: {
    modelValue: { control: 'text' },
    items: { control: 'object' },
    stretch: { control: 'boolean' },
    uniformWidth: { control: 'boolean' }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: 'windows',
    items: Array.from({ length: 3 }).map((_, i) => ({
      text: `标签 ${i + 1}`,
      value: `tab${i + 1}`
    }))
  },
  render: args => () => (
    <VTabs
      {...args}
      v-slots={{
        tab1: () => <div class='text-sm'>内容 1</div>,
        tab2: () => <div class='text-sm'>内容 2</div>,
        tab3: () => <div class='text-sm'>内容 3</div>
      }}
    />
  )
}
