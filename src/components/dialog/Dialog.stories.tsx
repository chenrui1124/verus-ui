import type { Meta, StoryObj } from '@storybook/vue3'
import type { DialogSlots } from '.'

import { VButton } from '@/components'
import { VDialog } from '.'

const meta: Meta<typeof VDialog> = {
  title: 'Components/Dialog',
  component: VDialog,
  argTypes: {},
  args: {},
  render(args) {
    const slots: DialogSlots = {
      trigger: ({ open }) => <VButton onClick={open}>Open</VButton>,
      default: ({ close }) => (
        <div>
          <h1 class='m-0'>Lorem.</h1>
          <p>Lorem ipsum dolor sit.</p>
          <VButton onClick={close}>Close</VButton>
        </div>
      )
    }

    return () => <VDialog {...args} v-slots={slots} />
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
