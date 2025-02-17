import type { Meta, StoryObj } from '@storybook/vue3'
import type { VariantProp } from '@/ts'

import { ref } from 'vue'
import { Random } from 'mockjs'
import { VButton } from '@/components'
import { sideOptions } from '@/ts'
import { VTooltip } from '.'

const meta: Meta<typeof VTooltip> = {
  title: 'Components/Tooltip',
  component: VTooltip,
  argTypes: {
    disabled: { control: 'boolean' },
    side: { control: 'select', options: sideOptions() },
    text: { control: 'text' }
  },
  args: {
    side: 'top',
    text: Random.cword(7)
  },
  parameters: {
    layout: 'centered'
  },
  render(args) {
    const variant = ref<VariantProp>('solid')

    return () => (
      <VTooltip {...args}>
        <VButton
          variant={variant.value}
          onClick={() => (variant.value = variant.value === 'solid' ? 'tonal' : 'solid')}
        >
          {Random.cword(2)}
        </VButton>
      </VTooltip>
    )
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Latin: Story = { args: { text: Random.title() } }
