import type { Meta, StoryObj } from '@storybook/vue3'

import { fn } from '@storybook/test'
import { textTransformOptions, variantOptions } from '@/ts'
import { VButton } from '.'

const meta = {
  title: 'Components/Button',
  component: VButton,
  argTypes: {
    appendIcon: { control: false },
    icon: { control: false },
    loading: { control: 'boolean' },
    uiBlock: { control: 'boolean' },
    uiDanger: { control: 'boolean' },
    uiRounded: { control: 'boolean' },
    uiTextTransform: { control: 'inline-radio', options: textTransformOptions() },
    uiVariant: { control: 'inline-radio', options: variantOptions() }
  },
  args: {
    text: 'New app',
    uiVariant: 'secondary',
    onClick: () => fn()
  },
  render(args) {
    return () => <VButton {...args} />
  }
} satisfies Meta<typeof VButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = { args: { icon: 'i-[fluent--apps-add-in-20-regular]' } }

export const WithAppendIcon: Story = { args: { appendIcon: 'i-[fluent--apps-add-in-20-regular]' } }
