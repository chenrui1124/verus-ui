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
    uiBlock: { control: 'boolean' },
    uiDanger: { control: 'boolean' },
    uiFontWeight: { control: 'inline-radio', options: fontWeightOptions() },
    uiRounded: { control: 'boolean' },
    uiTextTransform: { control: 'inline-radio', options: textTransformOptions() },
    uiVariant: { control: 'inline-radio', options: variantOptions() }
  },
  args: {
    text: 'New app',
    uiVariant: 'tonal',
    onClick: fn()
  },
  parameters: {
    layout: 'centered'
  },
  render(args) {
    return () => <VButton {...args} />
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = { args: { icon: 'i-[fluent--apps-add-in-20-regular]' } }

export const WithAppendIcon: Story = { args: { appendIcon: 'i-[fluent--apps-add-in-20-regular]' } }
