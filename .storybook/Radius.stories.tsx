import type { FunctionalComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const Radius: FunctionalComponent = () => (
  <div class='grid grid-cols-[min-content_14rem_14rem_14rem] gap-6 p-6 **:box-border'>
    <span>Full</span>
    <div class='h-7 w-12 rounded-full border border-otl-var'></div>
    <div class='h-7 w-12 rounded-full border border-otl'></div>
    <div class='h-7 w-12 rounded-full bg-sur-var'></div>
    <span>Lv1</span>
    <div class='h-8 w-20 rounded-v1 border border-otl-var'></div>
    <div class='h-8 w-20 rounded-v1 border border-otl'></div>
    <div class='h-8 w-20 rounded-v1 bg-sur-var'></div>
    <span>Lv2</span>
    <div class='h-9 w-24 rounded-v2 border border-otl-var'></div>
    <div class='h-9 w-24 rounded-v2 border border-otl'></div>
    <div class='h-9 w-24 rounded-v2 bg-sur-var'></div>
    <span>Lv3</span>
    <div class='h-12 w-54 rounded-v3 border border-otl-var'></div>
    <div class='h-12 w-54 rounded-v3 border border-otl'></div>
    <div class='h-12 w-54 rounded-v3 bg-sur-var'></div>
    <span>Lv4</span>
    <div class='h-48 w-54 rounded-v4 border border-otl-var'></div>
    <div class='h-48 w-54 rounded-v4 border border-otl'></div>
    <div class='h-48 w-54 rounded-v4 bg-sur-var'></div>
  </div>
)

const meta: Meta = {
  title: 'Design/Radius',
  render() {
    return () => <Radius />
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
