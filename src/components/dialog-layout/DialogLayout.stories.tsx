import type { Meta, StoryObj } from '@storybook/vue3'
import type { DialogLayoutSlots, DialogSlots } from '@/components'

import { Random } from 'mockjs'
import { VButton, VDialog } from '@/components'
import { VDialogLayout } from '.'

const rendered = (args: any, paragraph: string) => (
  <VDialog
    v-slots={
      {
        trigger: ({ open }) => <VButton onClick={open}>Open</VButton>,
        default: ({ close }) => (
          <VDialogLayout
            {...args}
            v-slots={
              {
                default: () => paragraph,
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

const meta: Meta<typeof VDialogLayout> = {
  title: 'Components/DialogLayout',
  component: VDialogLayout,
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    reverseActions: { control: 'boolean' }
  },
  args: {
    title: Random.ctitle(),
    subtitle: Random.ctitle(),
    reverseActions: true
  },
  render: args => () => rendered(args, Random.cparagraph())
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Latin: Story = {
  args: {
    title: Random.title(),
    subtitle: Random.title()
  },
  render: args => () => rendered(args, Random.paragraph())
}
