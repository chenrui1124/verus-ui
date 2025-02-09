import type { Meta, StoryObj } from '@storybook/vue3'

import { VHorizontalScrolling } from '.'

const meta: Meta<typeof VHorizontalScrolling> = {
  title: 'Components/HorizontalScrolling',
  component: VHorizontalScrolling,
  argTypes: {},
  args: {
    uiHeight: '300px'
  },
  render(args) {
    return () => (
      <VHorizontalScrolling {...args}>
        {new Array(7).fill(1).map((_, index) => (
          <img src={`https://picsum.photos/${300 + index * 50}/600`} alt='test_img' />
        ))}
      </VHorizontalScrolling>
    )
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
