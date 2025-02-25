import type { Meta, StoryObj } from '@storybook/vue3'

import { VTabs } from '.'

const meta: Meta<typeof VTabs<any>> = {
  title: 'Components/Tabs',
  component: VTabs as any,
  argTypes: {
    modelValue: { control: 'text' },
    items: { control: 'object' }
  },
  args: {
    modelValue: 'windows',
    items: [
      { text: 'Windows', value: 'windows' },
      { text: 'Linux', value: 'linux' },
      { text: 'MacOS', value: 'macos' }
    ] as const
  },
  render: args => () => (
    <VTabs
      {...args}
      v-slots={{
        windows: () => <div>Download for Windows</div>,
        linux: () => <div>Download for Linux</div>,
        macos: () => <div>Download for MacOS</div>
      }}
    />
  )
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
