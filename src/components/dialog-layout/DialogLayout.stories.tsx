import type { Meta, StoryObj } from '@storybook/vue3'
import type { DialogLayoutSlots, DialogSlots } from '@/components'
import { VButton, VDialog } from '@/components'
import { VDialogLayout } from '.'

const meta: Meta<typeof VDialogLayout> = {
  title: 'Components/DialogLayout',
  component: VDialogLayout,
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    reverseActions: { control: 'boolean' }
  },
  args: {
    title: 'Lorem.',
    subtitle: 'Lorem ipsum dolor sit.',
    reverseActions: true
  },
  render: args => {
    return () => (
      <VDialog
        v-slots={
          {
            trigger: ({ open }) => <VButton onClick={open}>Open</VButton>,
            default: ({ close }) => (
              <VDialogLayout
                {...args}
                v-slots={
                  {
                    default: () => 'Lorem ipsum dolor sit.'.repeat(40),
                    actions: () => (
                      <>
                        <VButton onClick={close} variant='solid'>
                          Cancel
                        </VButton>
                        <VButton onClick={close} variant='clean'>
                          Confirm
                        </VButton>
                      </>
                    )
                  } satisfies DialogLayoutSlots
                }
              />
            )
          } satisfies DialogSlots
        }
      />
    )
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
