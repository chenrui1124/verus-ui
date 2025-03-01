import type { Meta, StoryObj } from '@storybook/vue3'
import type { DialogLayoutSlots, DialogSlots } from '@/components'

import { Random } from 'mockjs'
import { VButton, VDialog } from '@/components'
import { VDialogLayout } from '.'

const rendered = (args: any, paragraph: string) => (
  <VDialog
    v-slots={
      {
        trigger: ({ show }) => <VButton onClick={show}>打开对话框</VButton>,
        default: ({ hide }) => (
          <VDialogLayout
            {...args}
            v-slots={
              {
                default: () => paragraph,
                actions: () => (
                  <>
                    <VButton onClick={hide} variant='solid'>
                      取消
                    </VButton>
                    <VButton onClick={hide} variant='clean'>
                      确认
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
    reverseActions: { control: 'boolean' },
    subtitle: { control: 'text' },
    title: { control: 'text' }
  },
  args: {
    reverseActions: true,
    subtitle: '副标题',
    title: '标题'
  },
  parameters: {
    layout: 'centered'
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
