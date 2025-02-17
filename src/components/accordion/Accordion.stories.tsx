import type { Meta, StoryObj } from '@storybook/vue3'

import { Random } from 'mockjs'
import { VAccordion } from '.'

const meta: Meta<typeof VAccordion> = {
  title: 'Components/Accordion',
  component: VAccordion,
  argTypes: {
    danger: { control: 'boolean' },
    icon: { control: false },
    open: { control: 'boolean' },
    title: { control: 'text' }
  },
  args: {
    title: Random.ctitle()
  },
  render(args) {
    return () => <VAccordion {...args}>{Random.cparagraph()}</VAccordion>
  }
}

export default meta

type Story = StoryObj<typeof meta>

const icon = 'i-[fluent--error-circle-24-filled]'

export const Default: Story = {}

export const Latin: Story = {
  args: {
    title: Random.title(2)
  },
  render(args) {
    return () => <VAccordion {...args}>{Random.paragraph()}</VAccordion>
  }
}

export const WithIcon: Story = { args: { icon } }
