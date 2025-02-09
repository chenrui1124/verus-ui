import type { Meta, StoryObj } from '@storybook/vue3'

import { fn } from '@storybook/test'
import { VButton } from '.'

const meta: Meta<typeof VButton> = {
  title: 'Components/Button',
  component: VButton,
  argTypes: {},
  args: {
    text: 'New app',
    uiVariant: 'secondary',
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
