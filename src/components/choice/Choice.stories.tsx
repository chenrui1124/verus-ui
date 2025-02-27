import type { FunctionalComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import type { ChoiceProps } from './index.ts'

import { directionOptions } from '@/ts'
import { VChoice } from './index.ts'

const VChoiceWithoutMultiple: FunctionalComponent<ChoiceProps<false>> = args => (
  <VChoice {...args} />
)

const VChoiceWithMultiple: FunctionalComponent<ChoiceProps<true>> = args => <VChoice {...args} />

const meta: Meta<typeof VChoiceWithoutMultiple> = {
  title: 'Components/Choice',
  component: VChoiceWithoutMultiple,
  argTypes: {
    modelValue: { control: false },
    disabled: { control: 'boolean' },
    direction: { control: 'select', options: directionOptions() },
    items: { control: 'object' },
    multiple: { control: 'boolean' },
    name: { control: 'text' }
  },
  render(args) {
    return () => <VChoice {...args} />
  }
}

export default meta

type StoryWithoutMultiple = StoryObj<typeof meta>

type StoryWithMultiple = StoryObj<Meta<typeof VChoiceWithMultiple>>

const mock = [
  { zh: '视窗', en: 'Windows Phone', icon: 'i-[lineicons--windows]', value: 'windows' },
  { zh: '安卓', en: 'Android', icon: 'i-[lineicons--android]', value: 'android' },
  { zh: '苹果', en: 'iOS', icon: 'i-[lineicons--apple-brand]', value: 'ios' }
]

export const Default: StoryWithoutMultiple = {
  args: { items: mock.map(({ zh, value }) => ({ text: zh, value })) }
}

export const Latin: StoryWithoutMultiple = {
  args: { items: mock.map(({ en, value, icon }) => ({ text: en, value, icon })) }
}

export const WithMultiple: StoryWithMultiple = {
  args: {
    items: mock.map(({ zh, value, icon }) => ({ text: zh, value, icon })),
    modelValue: [],
    multiple: true
  }
}
