import type { FunctionalComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import type { ChoiceProps } from '.'

import { directionOptions, variantOptions } from '@/ts'
import { VChoice } from '.'

const VChoiceDefault: FunctionalComponent<ChoiceProps<false>> = args => <VChoice {...args} />

const VChoiceWithMultiple: FunctionalComponent<ChoiceProps<true>> = args => <VChoice {...args} />

const meta: Meta<typeof VChoiceDefault> = {
  title: 'Components/Choice',
  component: VChoiceDefault,
  argTypes: {
    modelValue: { control: false },
    disabled: { control: 'boolean' },
    direction: { control: 'select', options: directionOptions() },
    items: { control: 'object' },
    multiple: { control: 'boolean' },
    width: { control: 'text' },
    variant: { control: 'select', options: variantOptions('solid', 'outlined') }
  },
  render(args) {
    return () => <VChoice {...args} />
  }
}

export default meta

type StoryDefault = StoryObj<typeof meta>

type StoryWithMultiple = StoryObj<Meta<typeof VChoiceWithMultiple>>

export const Default: StoryDefault = {
  args: {
    items: [
      { text: '选项 1', value: '1', icon: 'i-[fluent--square-24-filled]' },
      { text: '选项 2', value: '2' },
      { text: '选项 3', value: '3' }
    ],
    width: '16rem'
  },
  parameters: {
    layout: 'centered'
  }
}

export const Multiple: StoryWithMultiple = {
  args: {
    modelValue: [],
    items: [
      { text: 'Option 1', value: '1', icon: 'i-[fluent--square-24-filled]' },
      { text: 'Option 2', value: '2' },
      { text: 'Option 3', value: '3' }
    ],
    multiple: true,
    width: '16rem'
  },
  parameters: {
    layout: 'centered'
  }
}

export const Example: StoryDefault = {
  args: {
    direction: 'row',
    items: [
      { text: 'Rabbit Pay', value: 'rabbit', icon: 'i-[fluent--animal-rabbit-24-filled]' },
      { text: 'Cat Pay', value: 'cat', icon: 'i-[fluent--animal-cat-24-filled]' },
      { text: 'Dog Pay', value: 'dog', icon: 'i-[fluent--animal-dog-24-filled]' }
    ],
    variant: 'outlined'
  }
}
