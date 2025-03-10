import type { Meta, StoryObj } from '@storybook/vue3'
import type { VariantProp } from '@/ts'

import { ref } from 'vue'
import { Random } from 'mockjs'
import { VButton, VToggle, VToggleGroup } from '@/components'
import { sideOptions } from '@/ts'
import { VTooltip } from '.'

const meta: Meta<typeof VTooltip> = {
  title: 'Components/Tooltip',
  component: VTooltip,
  argTypes: {
    delay: { control: 'number' },
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

export const Example: Story = {
  render(args) {
    const { text, ...others } = args

    return () => (
      <VToggleGroup>
        <VTooltip text='Align Left' {...others}>
          <VToggle value='left' icon='i-[fluent--text-align-left-24-filled]' />
        </VTooltip>
        <VTooltip text='Align Center'>
          <VToggle value='center' icon='i-[fluent--text-align-center-24-filled]' />
        </VTooltip>
        <VTooltip text='Align Right'>
          <VToggle value='right' icon='i-[fluent--text-align-right-24-filled]' />
        </VTooltip>
      </VToggleGroup>
    )
  }
}
