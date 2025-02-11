import type { Meta, StoryObj } from '@storybook/vue3'

import { VAccordion } from '.'

const meta: Meta<typeof VAccordion> = {
  title: 'Components/Accordion',
  component: VAccordion,
  argTypes: {
    danger: { control: 'boolean' },
    icon: { control: false },
    title: { control: 'text' }
  },
  args: {
    title: 'Lorem.'
  },
  render(args) {
    return () => (
      <VAccordion {...args}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores sunt ea minima in maxime
        similique aliquid. Ex fugit magni sapiente.
      </VAccordion>
    )
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = { args: { icon: 'i-[fluent--error-circle-24-filled]' } }
