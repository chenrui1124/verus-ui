import type { Meta, StoryObj } from '@storybook/vue3'
import type { DialogSlots } from '.'

import { VButton } from '@/components'
import { VDialog } from '.'

const meta: Meta<typeof VDialog> = {
  title: 'Components/Dialog',
  component: VDialog,
  argTypes: {
    danger: { control: 'boolean' },
    width: { control: 'text' }
  },
  args: {},
  render(args) {
    return () => (
      <VDialog
        {...args}
        v-slots={
          {
            trigger: ({ open }) => (
              <VButton onClick={open} variant='solid'>
                打开对话框
              </VButton>
            ),
            default: () => <div class='h-60 w-full border border-dashed border-on-pri-var'></div>
          } satisfies DialogSlots
        }
      />
    )
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
