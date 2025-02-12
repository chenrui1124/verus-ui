import type { FunctionalComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import type { SelectProps } from '.'

import { directionOptions } from '@/ts'
import { VSelect } from '.'

const VSelectWithoutMultiple: FunctionalComponent<SelectProps<false>> = args => (
  <VSelect {...args} />
)

const VSelectWithMultiple: FunctionalComponent<SelectProps<true>> = args => <VSelect {...args} />

const meta: Meta<typeof VSelectWithoutMultiple> = {
  title: 'Components/Select',
  component: VSelectWithoutMultiple,
  argTypes: {
    modelValue: { control: false },
    items: { control: false },
    multiple: { control: 'boolean' },
    name: { control: 'text' },
    direction: { control: 'inline-radio', options: directionOptions() }
  },
  args: {
    items: [
      { text: '视窗', value: 'windows' },
      { text: '安卓', value: 'android' },
      { text: '苹果', value: 'ios' }
    ]
  },
  render(args) {
    return () => <VSelect {...args} />
  }
}

export default meta

type StoryWithoutMultiple = StoryObj<typeof meta>

type StoryWithMultiple = StoryObj<Meta<typeof VSelectWithMultiple>>

const items = [
  { text: 'Windows Phone', icon: 'i-[lineicons--windows]', value: 'windows' },
  { text: 'Android', icon: 'i-[lineicons--android]', value: 'android' },
  { text: 'iOS', icon: 'i-[lineicons--apple-brand]', value: 'ios' }
]

export const Default: StoryWithoutMultiple = {}

export const WithIcon: StoryWithoutMultiple = { args: { items } }

export const WithMultiple: StoryWithMultiple = { args: { items, modelValue: [], multiple: true } }
