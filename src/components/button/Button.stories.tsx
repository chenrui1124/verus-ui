import type { Meta, StoryObj } from '@storybook/vue3'

import { fn } from '@storybook/test'
import { fontWeightOptions, textTransformOptions, variantOptions } from '@/ts'
import { VButton } from '.'

const meta: Meta<typeof VButton> = {
  title: 'Components/Button',
  component: VButton,
  argTypes: {
    appendIcon: { control: false },
    disabled: { control: 'boolean' },
    icon: { control: false },
    loading: { control: 'boolean' },
    text: { control: 'text' },
    block: { control: 'boolean' },
    danger: { control: 'boolean' },
    fontWeight: { control: 'inline-radio', options: fontWeightOptions() },
    rounded: { control: 'boolean' },
    textTransform: { control: 'inline-radio', options: textTransformOptions() },
    variant: { control: 'inline-radio', options: variantOptions() }
  },
  args: {
    text: 'New app',
    variant: 'tonal',
    onClick: fn()
  },
  parameters: {
    layout: 'centered'
  },
  render(args) {
    return () => (
      <div class='flex flex-col gap-3'>
        {variantOptions().map(v => (
          <VButton {...args} variant={v} />
        ))}
      </div>
    )
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = { args: { icon: 'i-[fluent--apps-add-in-20-regular]' } }

export const WithAppendIcon: Story = { args: { appendIcon: 'i-[fluent--apps-add-in-20-regular]' } }
