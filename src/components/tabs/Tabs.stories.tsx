import type { Meta, StoryObj } from '@storybook/vue3'

import { VButton } from '@/components'
import { VTabs } from '.'

const meta: Meta<typeof VTabs> = {
  title: 'Components/Tabs',
  component: VTabs as any,
  argTypes: {
    modelValue: { control: 'text' },
    items: { control: 'object' },
    stretch: { control: 'boolean' },
    fixedWidth: { control: 'boolean' }
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

export const Example: Story = {
  args: {
    items: [
      { text: 'Windows', value: 'windows' },
      { text: 'Linux', value: 'linux' },
      { text: 'MacOS', value: 'macos' }
    ]
  },
  render: args => () => {
    const icon = 'i-[fluent--arrow-download-24-filled]'

    return (
      <VTabs
        {...args}
        v-slots={{
          windows: () => (
            <div class='flex h-40 gap-3 rounded-v3 bg-sur-var p-6'>
              {['X86', 'X64', 'Arm'].map(a => (
                <VButton icon={icon} variant='outlined'>
                  Windows {a}
                </VButton>
              ))}
            </div>
          ),
          linux: () => (
            <div class='flex h-40 gap-3 rounded-v3 bg-sur-var p-6'>
              {['X86', 'X64', 'Arm'].map(a => (
                <VButton icon={icon} variant='outlined'>
                  Linux {a}
                </VButton>
              ))}
            </div>
          ),
          macos: () => (
            <div class='flex h-40 rounded-v3 bg-sur-var p-6'>
              <VButton icon={icon} variant='outlined'>
                MacOS Arm
              </VButton>
            </div>
          )
        }}
      />
    )
  }
}
