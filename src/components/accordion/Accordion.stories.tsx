import type { Meta, StoryObj } from '@storybook/vue3'

import { Random } from 'mockjs'
import { statusOptions, variantOptions } from '@/ts'
import { VAccordion } from '.'

const meta: Meta<typeof VAccordion> = {
  title: 'Components/Accordion',
  component: VAccordion,
  argTypes: {
    icon: { control: false },
    open: { control: 'boolean' },
    status: { control: 'select', options: statusOptions('primary', 'error') },
    title: { control: 'text' },
    variant: { control: 'select', options: variantOptions('solid', 'outlined') }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: '标题'
  },
  render(args) {
    return () => <VAccordion {...args}>{Random.cparagraph()}</VAccordion>
  }
}

export const Icon: Story = {
  args: {
    icon: 'i-[fluent--square-24-filled]',
    title: 'Title'
  },
  render(args) {
    return () => <VAccordion {...args}>{Random.paragraph()}</VAccordion>
  }
}
